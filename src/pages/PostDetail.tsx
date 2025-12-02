import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ArrowLeft, Trash } from 'lucide-react';
import api from '../lib/axios';
import PostCard from '../components/PostCard';
import CommentSection from '../components/CommentSection';
import { useSelector } from 'react-redux';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: authUser } = useSelector((state: any) => state.auth);

  // Fetch Detail Post
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const res = await api.get(`/api/posts/${id}`); // 
      return res.data.data;
    }
  });

  // Delete Post (Only Owner)
  const deleteMutation = useMutation({
    mutationFn: async () => {
      return api.delete(`/api/posts/${id}`); // [cite: 338]
    },
    onSuccess: () => {
      navigate('/'); // Redirect ke home setelah hapus
    }
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (!post) return <div className="p-4">Post tidak ditemukan</div>;

  const isOwner = authUser?.id === post.author.id;

  return (
    <div className="pb-20 bg-white min-h-screen">
      {/* Header Navigasi */}
      <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2">
          <ArrowLeft size={24} /> <span className="font-bold">Post</span>
        </button>
        {isOwner && (
          <button 
            onClick={() => { if(confirm('Hapus post ini?')) deleteMutation.mutate() }}
            className="text-red-500"
          >
            <Trash size={20} />
          </button>
        )}
      </div>

      {/* Post Content */}
      <PostCard post={post} />

      {/* Comments Section */}
      <div className="p-4">
        <h3 className="font-bold mb-2">Komentar</h3>
        <CommentSection postId={post.id} />
      </div>
    </div>
  );
}