// import { Heart, MessageCircle, Bookmark } from 'lucide-react';
// import api from '../lib/axios';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import dayjs from 'dayjs'; // [cite: 21]
// import relativeTime from 'dayjs/plugin/relativeTime';

// dayjs.extend(relativeTime);

// interface PostProps {
//   post: any; // Sebaiknya gunakan interface TypeScript yang lengkap sesuai response API
// }

// export default function PostCard({ post }: PostProps) {
//   const queryClient = useQueryClient();

//   // Optimistic UI untuk Like [cite: 20]
//   const likeMutation = useMutation({
//     mutationFn: async () => {
//       if (post.likedByMe) {
//         return api.delete(`/api/posts/${post.id}/like`); // [cite: 387]
//       } else {
//         return api.post(`/api/posts/${post.id}/like`); // [cite: 367]
//       }
//     },
//     onMutate: async () => {
//         // Implementasi Optimistic Update: Cancel refetch, snapshot value, set new value manual
//         // ... (Kode dipersingkat untuk kejelasan)
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ['feed'] });
//     }
//   });

//   return (
//     <div className="bg-white md:rounded-xl border-b md:border md:my-4 shadow-sm overflow-hidden">
//       {/* Header */}
//       <div className="p-4 flex items-center gap-3">
//         <img 
//           src={post.author.avatarUrl || "https://via.placeholder.com/40"} 
//           alt={post.author.username} 
//           className="w-10 h-10 rounded-full object-cover"
//         />
//         <div>
//           <p className="font-semibold text-sm">{post.author.username}</p>
//           <p className="text-xs text-gray-500">{dayjs(post.createdAt).fromNow()}</p>
//         </div>
//       </div>

//       {/* Image */}
//       <div className="w-full bg-gray-100 aspect-square">
//         <img 
//             src={post.imageUrl} 
//             alt="Post content" 
//             className="w-full h-full object-cover"
//             loading="lazy"
//         />
//       </div>

//       {/* Actions */}
//       <div className="p-4">
//         <div className="flex justify-between mb-3">
//           <div className="flex gap-4">
//             <button 
//                 onClick={() => likeMutation.mutate()}
//                 className={`transition-colors ${post.likedByMe ? 'text-red-500' : 'text-gray-600'}`}
//             >
//               <Heart className={post.likedByMe ? "fill-current" : ""} size={24} />
//             </button>
//             <button className="text-gray-600">
//               <MessageCircle size={24} />
//             </button>
//           </div>
//           <button className="text-gray-600">
//              <Bookmark size={24} />
//           </button>
//         </div>

//         <p className="font-semibold text-sm mb-1">{post.likeCount} likes</p>
//         <p className="text-sm">
//           <span className="font-semibold mr-2">{post.author.username}</span>
//           {post.caption}
//         </p>
//         <button className="text-gray-500 text-sm mt-2">
//             View all {post.commentCount} comments
//         </button>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import api from '../lib/axios';

// Konfigurasi dayjs untuk format "2 hours ago"
dayjs.extend(relativeTime);

// Definisi Tipe Data Post sesuai API Response + State UI
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
  isSaved?: boolean; // Field ini diasumsikan ada/ditambahkan di response feed
  author: Author;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // -------------------------------------------------------------------------
  // 1. LIKE LOGIC (Optimistic Update)
  // -------------------------------------------------------------------------
  const likeMutation = useMutation({
    mutationFn: async () => {
      // Toggle Endpoint berdasarkan state saat ini [cite: 367, 387]
      if (post.likedByMe) {
        return api.delete(`/api/posts/${post.id}/like`);
      } else {
        return api.post(`/api/posts/${post.id}/like`);
      }
    },
    onMutate: async () => {
      // Batalkan fetch yang sedang berjalan agar tidak menimpa update kita
      await queryClient.cancelQueries({ queryKey: ['feed'] });
      await queryClient.cancelQueries({ queryKey: ['post', String(post.id)] });

      // Simpan state sebelumnya untuk rollback jika error
      const previousFeed = queryClient.getQueryData(['feed']);

      // Optimistic Update: Update cache secara manual
      queryClient.setQueriesData({ queryKey: ['feed'] }, (oldData: any) => {
        if (!oldData) return oldData;
        // Cari dan update post spesifik di dalam struktur infinite query
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              items: page.data.items.map((item: Post) => {
                if (item.id === post.id) {
                  return {
                    ...item,
                    likedByMe: !item.likedByMe,
                    likeCount: item.likedByMe ? item.likeCount - 1 : item.likeCount + 1,
                  };
                }
                return item;
              }),
            },
          })),
        };
      });

      return { previousFeed };
    },
    onError: (_err, _newTodo, context) => {
      // Rollback jika server error
      if (context?.previousFeed) {
        queryClient.setQueryData(['feed'], context.previousFeed);
      }
    },
    onSettled: () => {
      // Refresh data untuk memastikan sinkronisasi akhir [cite: 12]
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['post', String(post.id)] });
      queryClient.invalidateQueries({ queryKey: ['my-likes'] }); // Update halaman My Likes
    },
  });

  // -------------------------------------------------------------------------
  // 2. SAVE / BOOKMARK LOGIC (Optimistic Update)
  // -------------------------------------------------------------------------
  const saveMutation = useMutation({
    mutationFn: async () => {
      // Toggle Endpoint Save/Unsave [cite: 669, 688]
      if (post.isSaved) {
        return api.delete(`/api/posts/${post.id}/save`);
      } else {
        return api.post(`/api/posts/${post.id}/save`);
      }
    },
    onMutate: async () => {
      // Stop queries
      await queryClient.cancelQueries({ queryKey: ['feed'] });
      
      const previousFeed = queryClient.getQueryData(['feed']);

      // Optimistic Update Cache
      queryClient.setQueriesData({ queryKey: ['feed'] }, (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              items: page.data.items.map((item: Post) => {
                if (item.id === post.id) {
                  return { ...item, isSaved: !item.isSaved };
                }
                return item;
              }),
            },
          })),
        };
      });

      return { previousFeed };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousFeed) {
        queryClient.setQueryData(['feed'], context.previousFeed);
      }
    },
    onSettled: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['saved-posts'] }); // Update halaman Saved
    },
  });

  return (
    <div className="bg-white md:rounded-xl border-b md:border md:my-4 shadow-sm overflow-hidden">
      {/* 1. Header Post (User Info) */}
      <div className="p-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate(`/users/${post.author.username}`)}
        >
          <img 
            src={post.author.avatarUrl || "https://ui-avatars.com/api/?name=" + post.author.username} 
            alt={post.author.username} 
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
          <div>
            <p className="font-semibold text-sm hover:underline">{post.author.username}</p>
            <p className="text-xs text-gray-500">{dayjs(post.createdAt).fromNow()}</p>
          </div>
        </div>
      </div>

      {/* 2. Post Image */}
      <div 
        className="w-full bg-gray-100 aspect-square cursor-pointer"
        onClick={() => navigate(`/posts/${post.id}`)}
      >
        <img 
            src={post.imageUrl} 
            alt={post.caption} 
            className="w-full h-full object-cover"
            loading="lazy"
        />
      </div>

      {/* 3. Action Buttons */}
      <div className="p-4">
        <div className="flex justify-between mb-3">
          <div className="flex gap-4">
            {/* LIKE BUTTON */}
            <button 
                onClick={() => likeMutation.mutate()}
                className={`transition-transform active:scale-110 focus:outline-none ${
                    post.likedByMe ? 'text-red-500' : 'text-gray-600 hover:text-gray-900'
                }`}
                title={post.likedByMe ? "Unlike" : "Like"}
            >
              <Heart 
                className={post.likedByMe ? "fill-current" : ""} 
                size={26} 
                strokeWidth={post.likedByMe ? 0 : 2}
              />
            </button>

            {/* COMMENT BUTTON */}
            <button 
                onClick={() => navigate(`/posts/${post.id}`)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <MessageCircle size={26} />
            </button>

            {/* SHARE BUTTON (Dummy) */}
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              <Share2 size={26} />
            </button>
          </div>

          {/* SAVE BUTTON */}
          <button 
            onClick={() => saveMutation.mutate()}
            className={`transition-colors focus:outline-none ${
                post.isSaved ? 'text-black' : 'text-gray-600 hover:text-gray-900'
            }`}
            title={post.isSaved ? "Unsave" : "Save"}
          >
             <Bookmark 
                className={post.isSaved ? "fill-current" : ""} 
                size={26} 
            />
          </button>
        </div>

        {/* 4. Likes Count */}
        <p className="font-bold text-sm mb-1">
            {post.likeCount > 0 ? `${post.likeCount} likes` : 'Be the first to like'}
        </p>

        {/* 5. Caption */}
        <div className="text-sm mb-2">
          <span 
            className="font-bold mr-2 cursor-pointer hover:underline"
            onClick={() => navigate(`/users/${post.author.username}`)}
          >
            {post.author.username}
          </span>
          <span className="text-gray-800">{post.caption}</span>
        </div>

        {/* 6. View Comments Link */}
        {post.commentCount > 0 && (
            <button 
                onClick={() => navigate(`/posts/${post.id}`)}
                className="text-gray-500 text-sm mt-1 hover:text-gray-700"
            >
                View all {post.commentCount} comments
            </button>
        )}
      </div>
    </div>
  );
}