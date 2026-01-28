export function LoadingState() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="space-y-4 text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-muted-foreground">Loading data</p>
      </div>
    </div>
  );
}
