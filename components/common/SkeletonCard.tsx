import React from 'react';

interface SkeletonCardProps {
  count?: number;
  variant?: 'grid' | 'list';
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ count = 8, variant = 'grid' }) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (variant === 'list') {
    return (
      <div className="space-y-3 animate-pulse">
        {skeletons.map(i => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 bg-[#1c1e22] rounded-lg border border-gray-800"
          >
            <div className="w-16 h-24 bg-[#2a2f35] rounded shadow-md flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-[#2a2f35] rounded w-3/4"></div>
              <div className="h-3 bg-[#2a2f35] rounded w-1/2"></div>
              <div className="flex gap-2 mt-2">
                <div className="h-5 w-12 bg-[#2a2f35] rounded"></div>
                <div className="h-5 w-12 bg-[#2a2f35] rounded"></div>
              </div>
            </div>
            <div className="w-10 h-10 bg-[#2a2f35] rounded-lg flex-shrink-0"></div>
          </div>
        ))}
      </div>
    );
  }

  // Grid variant (default)
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
      {skeletons.map(i => (
        <div
          key={i}
          className="flex flex-col bg-[#1c1e22] rounded-xl overflow-hidden border border-white/5"
        >
          <div className="aspect-[3/4] bg-[#2a2f35]"></div>
          <div className="p-3 space-y-2">
            <div className="h-3 bg-[#2a2f35] rounded w-full"></div>
            <div className="h-2 bg-[#2a2f35] rounded w-3/4"></div>
            <div className="flex gap-1 mt-2">
              <div className="h-4 w-8 bg-[#2a2f35] rounded"></div>
              <div className="h-4 w-8 bg-[#2a2f35] rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
