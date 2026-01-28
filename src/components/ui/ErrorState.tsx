interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = "Failed to load data", onRetry }: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="space-y-4 text-center">
        <p className="text-sm text-muted-foreground">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
