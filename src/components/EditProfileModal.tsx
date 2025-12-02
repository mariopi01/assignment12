import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import api from '../lib/axios';

interface EditProfileProps {
  user: any;
  onClose: () => void;
}

export default function EditProfileModal({ user, onClose }: EditProfileProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user.name,
      username: user.username,
      bio: user.bio,
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('username', data.username);
      formData.append('bio', data.bio);
      
      // Handle avatar jika ada file baru (opsional, perlu logic input file tambahan)
      if (data.avatar && data.avatar[0]) {
        formData.append('avatar', data.avatar[0]);
      }

      return api.patch('/api/me', formData, {
        headers: { 'Content-Type': 'multipart/form-data' } // [cite: 137]
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
      onClose();
    }
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4"><X /></button>
        <h2 className="text-xl font-bold mb-4">Edit Profil</h2>
        
        <form onSubmit={handleSubmit((data) => updateMutation.mutate(data))} className="space-y-4">
          <div>
            <label className="text-sm font-semibold">Nama</label>
            <input {...register('name')} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="text-sm font-semibold">Bio</label>
            <textarea {...register('bio')} className="w-full border p-2 rounded" rows={3} />
          </div>
          {/* Input file avatar bisa ditambahkan di sini */}
          
          <button 
            type="submit" 
            disabled={updateMutation.isPending}
            className="w-full bg-black text-white py-2 rounded-lg font-bold"
          >
            {updateMutation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </div>
    </div>
  );
}