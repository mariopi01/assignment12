

// import { useInfiniteQuery } from '@tanstack/react-query';
// import { useInView } from 'react-intersection-observer';
// import { useEffect } from 'react';
// import api from '../lib/axios';
// import PostCard from '../components/PostCard';

// // Definisi tipe data sesuai API Response
// interface Author {
//   id: number;
//   username: string;
//   avatarUrl: string | null;
// }

// interface Post {
//   id: number;
//   imageUrl: string;
//   caption: string;
//   createdAt: string;
//   likeCount: number;
//   commentCount: number;
//   likedByMe: boolean;
//   isSaved?: boolean;
//   author: Author;
// }

// interface FeedResponse {
//   data: {
//     items: Post[];
//     pagination: {
//       page: number;
//       totalPages: number;
//     };
//   };
// }

// export default function Feed() {
//   const { ref, inView } = useInView();

//   // Fix: Hapus default param di sini, biarkan useInfiniteQuery yang mengatur
//   const fetchFeed = async ({ pageParam }: { pageParam: number }): Promise<FeedResponse> => {
//     const res = await api.get(`/api/feed?page=${pageParam}&limit=5`);
//     return res.data;
//   };

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isPending, // Gunakan isPending daripada status === 'pending'
//     isError,   // Gunakan isError daripada status === 'error'
//   } = useInfiniteQuery({
//     queryKey: ['feed'],
//     queryFn: fetchFeed,
//     initialPageParam: 1, // Ini memberitahu TS bahwa pageParam adalah number
//     getNextPageParam: (lastPage: FeedResponse) => {
//         const { page, totalPages } = lastPage.data.pagination;
//         return page < totalPages ? page + 1 : undefined;
//     },
//   });

//   useEffect(() => {
//     if (inView && hasNextPage) {
//       fetchNextPage();
//     }
//   }, [inView, hasNextPage, fetchNextPage]);

//   if (isPending) return <div className="p-4 text-center">Loading feed...</div>;
//   if (isError) return <div className="p-4 text-center text-red-500">Error loading feed.</div>;

//   return (
//     <div className="pb-10 md:pb-0">
//        <div className="md:hidden sticky top-0 bg-white p-4 border-b z-10 font-bold text-xl">Sociality</div>
      
//       {/* Karena kita menghapus generic eksplisit dan membiarkan inference bekerja,
//          TS sekarang tahu struktur 'data' dengan benar.
//       */}
//       {data?.pages.map((group, i) => (
//         <div key={i}>
//           {/* Fix: group.data.items memiliki tipe Post[], jadi parameter post terdefinisi */}
//           {group.data.items.map((post: Post) => (
//             <PostCard key={post.id} post={post} />
//           ))}
//         </div>
//       ))}

//       {/* Infinite Scroll Trigger */}
//       <div ref={ref} className="p-4 text-center text-gray-500">
//         {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Scroll for more' : 'No more posts'}
//       </div>
//     </div>
//   );
// }


import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import api from '../lib/axios';
import PostCard from '../components/PostCard';
import Header from '../components/Header'; // Import Header

// Definisi tipe data sesuai API Response
interface Author {
  id: number;
  username: string;
  avatarUrl: string | null;
}

interface Post {
  id: number;
  imageUrl: string;
  caption: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
  isSaved?: boolean;
  author: Author;
}

interface FeedResponse {
  data: {
    items: Post[];
    pagination: {
      page: number;
      totalPages: number;
    };
  };
}

export default function Feed() {
  const { ref, inView } = useInView();

  const fetchFeed = async ({ pageParam }: { pageParam: number }): Promise<FeedResponse> => {
    const res = await api.get(`/api/feed?page=${pageParam}&limit=5`);
    return res.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: fetchFeed,
    initialPageParam: 1,
    getNextPageParam: (lastPage: FeedResponse) => {
        const { page, totalPages } = lastPage.data.pagination;
        return page < totalPages ? page + 1 : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="pb-10 md:pb-0 bg-[#000000] min-h-screen"> {/* Background disesuaikan agar menyatu */}
       
       {/* Tambahkan Header di sini */}
       <Header />
      
      {/* Kontainer Feed */}
      <div className="max-w-xl mx-auto">
        {isPending && <div className="p-4 text-center text-white">Loading feed...</div>}
        {isError && <div className="p-4 text-center text-red-500">Error loading feed.</div>}

        {data?.pages.map((group, i) => (
          <div key={i}>
            {group.data.items.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ))}

        {/* Infinite Scroll Trigger */}
        <div ref={ref} className="p-4 text-center text-gray-500">
          {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Scroll for more' : 'No more posts'}
        </div>
      </div>
    </div>
  );
}