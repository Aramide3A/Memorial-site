import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { LoadingState } from "./components/shared/LoadingState";
import { MemorialProvider, useMemorialContent } from "./state/MemorialProvider";
import { GalleryPage } from "./pages/GalleryPage";
import { HomePage } from "./pages/HomePage";
import { LegacyPage } from "./pages/LegacyPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { StoryPage } from "./pages/StoryPage";
import { TributesPage } from "./pages/TributesPage";

function AppRoutes() {
  const { content, isLoading, error } = useMemorialContent();

  if (isLoading) {
    return <LoadingState message="Preparing the memorial experience..." />;
  }

  if (error || !content) {
    return (
      <LoadingState
        title="Content connection issue"
        message={error ?? "We could not load the memorial content."}
      />
    );
  }

  return (
    <AppShell site={content.site} person={content.person}>
      <Routes>
        <Route path="/" element={<HomePage content={content} />} />
        <Route path="/story" element={<StoryPage content={content} />} />
        <Route path="/legacy" element={<LegacyPage content={content} />} />
        <Route path="/gallery" element={<GalleryPage content={content} />} />
        <Route path="/tributes" element={<TributesPage content={content} />} />
        <Route path="/legacy/:slug" element={<ProjectDetailPage content={content} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
}

export function App() {
  return (
    <MemorialProvider>
      <AppRoutes />
    </MemorialProvider>
  );
}
