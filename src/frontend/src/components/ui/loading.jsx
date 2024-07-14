export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="animate-spin rounded-full border-4 border-primary border-t-transparent h-10 w-10" />
    </div>
  );
}
