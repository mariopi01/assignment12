import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import api from '../lib/axios';
import PostCard from '../components/PostCard';

export default function Feed() {
  const { ref, inView } = useInView();

  const fetchFeed = async ({ pageParam = 1 }) => {
    const res = await api.get(`/api/feed?page=${pageParam}&limit=5`); // [cite: 247]
    return res.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: fetchFeed,
    getNextPageParam: (lastPage) => {
        // Logika pagination API sociality
        const { page, totalPages } = lastPage.data.pagination;
        return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  if (status === 'pending') return <div className="p-4 text-center">Loading feed...</div>;
  if (status === 'error') return <div className="p-4 text-center text-red-500">Error loading feed.</div>;

  return (
    <div className="pb-10 md:pb-0">
       <div className="md:hidden sticky top-0 bg-white p-4 border-b z-10 font-bold text-xl">Sociality</div>
      
      {data?.pages.map((group, i) => (
        <div key={i}>
          {group.data.items.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ))}

      {/* Infinite Scroll Trigger */}
      <div ref={ref} className="p-4 text-center text-gray-500">
        {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Scroll for more' : 'No more posts'}
      </div>
    </div>
  );
}