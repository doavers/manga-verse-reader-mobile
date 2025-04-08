
import { useEffect, useRef, useState } from 'react';

interface InfiniteScrollProps {
  loadMore: () => Promise<void>;
  hasMore: boolean;
  isLoading: boolean;
  children: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  loadMore,
  hasMore,
  isLoading,
  children
}) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !loadingMore) {
          setLoadingMore(true);
          loadMore().finally(() => setLoadingMore(false));
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, isLoading, loadMore, loadingMore]);

  return (
    <div className="relative">
      {children}
      
      {(hasMore || isLoading || loadingMore) && (
        <div ref={loadingRef} className="p-4 flex justify-center">
          <div className="animate-spin h-6 w-6 border-2 border-manga-primary border-t-transparent rounded-full"></div>
        </div>
      )}
      
      <div ref={observerRef} className="h-10" />
    </div>
  );
};

export default InfiniteScroll;
