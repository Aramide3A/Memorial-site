export function LoadingState({
  title = "Loading memorial",
  message,
}: {
  title?: string;
  message: string;
}) {
  return (
    <div className="loading-state">
      <div className="loading-card">
        <p className="eyebrow">Memorial experience</p>
        <h1>{title}</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}
