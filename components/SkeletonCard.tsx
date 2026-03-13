export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="w-full aspect-video bg-gray-100" />
      <div className="p-4 space-y-2">
        <div className="h-5 bg-gray-100 rounded w-2/3" />
        <div className="h-4 bg-gray-100 rounded w-1/2" />
        <div className="h-3 bg-gray-100 rounded w-1/3" />
      </div>
    </div>
  );
}

export function SkeletonRestaurantCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse space-y-3">
      <div className="h-4 bg-gray-100 rounded w-1/4" />
      <div className="h-5 bg-gray-100 rounded w-2/3" />
      <div className="h-4 bg-gray-100 rounded w-1/3" />
      <div className="h-4 bg-gray-100 rounded w-full" />
      <div className="h-11 bg-gray-100 rounded-full mt-2" />
    </div>
  );
}
