import { createContext, ReactNode, startTransition, useContext, useEffect, useState } from "react";
import { getMemorialContent } from "../services/strapi";
import { MemorialContent } from "../types/memorial";

type MemorialContextValue = {
  content: MemorialContent | null;
  isLoading: boolean;
  error: string | null;
};

const MemorialContext = createContext<MemorialContextValue | undefined>(undefined);

export function MemorialProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<MemorialContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadContent() {
      try {
        const response = await getMemorialContent();

        if (!active) {
          return;
        }

        startTransition(() => {
          setContent(response);
          setError(null);
          setIsLoading(false);
        });
      } catch (loadError) {
        if (!active) {
          return;
        }

        setError(loadError instanceof Error ? loadError.message : "An unexpected error occurred.");
        setIsLoading(false);
      }
    }

    loadContent();

    return () => {
      active = false;
    };
  }, []);

  return (
    <MemorialContext.Provider value={{ content, isLoading, error }}>
      {children}
    </MemorialContext.Provider>
  );
}

export function useMemorialContent() {
  const context = useContext(MemorialContext);

  if (!context) {
    throw new Error("useMemorialContent must be used within MemorialProvider.");
  }

  return context;
}
