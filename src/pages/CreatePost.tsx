import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon, X } from 'lucide-react';
import api from '../lib/axios';

type CreatePostForm = {
  caption: string;
  image: FileList;
};

export default function CreatePost() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CreatePostForm>();
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Watch input file untuk preview image
  const imageFile = watch('image');
  if (imageFile && imageFile.length > 0 && !preview) {
    const file = imageFile[0];
    setPreview(URL.createObjectURL(file));
  }

  const createPostMutation = useMutation({
    mutationFn: async (data: CreatePostForm) => {
      const formData = new FormData();
      formData.append('caption', data.caption);
      formData.append('image', data.image[0]); // Ambil file pertama

      // Kirim ke endpoint POST /api/posts
      return api.post('/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] }); // Refresh feed
      queryClient.invalidateQueries({ queryKey: ['my-posts'] });
      navigate('/'); // Redirect ke home
    },
    onError: (err) => {
      console.error(err);
      alert("Gagal upload post. Pastikan gambar < 5MB."); // [cite: 280]
    }
  });

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Buat Post Baru</h1>
      
      <form onSubmit={handleSubmit((data) => createPostMutation.mutate(data))} className="space-y-6">
        {/* Image Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center relative hover:bg-gray-50 transition">
          {preview ? (
            <div className="relative">
              <img src={preview} alt="Preview" className="max-h-96 mx-auto rounded-lg" />
              <button 
                type="button"
                onClick={() => { setPreview(null); }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <>
              <input 
                {...register('image', { required: "Gambar wajib diisi" })}
                type="file" 
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Klik untuk upload foto (Max 5MB)</p>
            </>
          )}
        </div>
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

        {/* Caption Area */}
        <div>
          <textarea 
            {...register('caption')}
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            rows={4}
            placeholder="Tulis caption menarik..."
          ></textarea>
        </div>

        <button 
          type="submit"
          disabled={createPostMutation.isPending}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-400"
        >
          {createPostMutation.isPending ? 'Mengirim...' : 'Posting'}
        </button>
      </form>
    </div>
  );
}