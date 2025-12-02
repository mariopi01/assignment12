// import { useQuery } from '@tanstack/react-query';
// import api from '../lib/axios';
// import PostCard from '../components/PostCard';

// export default function SavedPosts() {
//   const { data, isLoading } = useQuery({
//     queryKey: ['saved-posts'],
//     queryFn: async () => {
//       const res = await api.get('/api/me/saved?limit=20'); // [cite: 706]
//       return res.data.data.posts;
//     }
//   });

//   if (isLoading) return <div className="p-4 text-center">Loading Saved...</div>;

//   return (
//     <div className="pb-20">
//       <h1 className="p-4 text-xl font-bold border-b">Saved Posts</h1>
//       {data?.length === 0 ? (
//         <div className="p-10 text-center text-gray-500">Belum ada post yang disimpan.</div>
//       ) : (
//         data?.map((post: any) => <PostCard key={post.id} post={post} />)
//       )}
//     </div>
//   );
// }

import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import PostCard from '../components/PostCard';

// Definisi Interface untuk tipe data
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

export default function SavedPosts() {
  // Menggunakan Generic <Post[]> untuk memberi tahu TS tipe return data
  const { data, isLoading } = useQuery<Post[]>({
    queryKey: ['saved-posts'],
    queryFn: async () => {
      const res = await api.get('/api/me/saved?limit=20');
      return res.data.data.posts;
    }
  });

  if (isLoading) return <div className="p-4 text-center">Loading Saved...</div>;

  return (
    <div className="pb-20">
      <h1 className="p-4 text-xl font-bold border-b">Saved Posts</h1>
      {data?.length === 0 ? (
        <div className="p-10 text-center text-gray-500">Belum ada post yang disimpan.</div>
      ) : (
        // Hapus 'any', tipe post sekarang otomatis terdeteksi sebagai 'Post'
        data?.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}