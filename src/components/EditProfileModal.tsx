// // // import { useForm } from 'react-hook-form';
// // // import { useMutation, useQueryClient } from '@tanstack/react-query';
// // // import { X, Camera } from 'lucide-react'; // Tambah icon Camera
// // // import api from '../lib/axios';
// // // import { useState } from 'react';

// // // interface EditProfileProps {
// // //   user: any;
// // //   onClose: () => void;
// // // }

// // // export default function EditProfileModal({ user, onClose }: EditProfileProps) {
// // //   const queryClient = useQueryClient();
// // //   const [preview, setPreview] = useState<string | null>(user.avatarUrl);
  
// // //   const { register, handleSubmit, watch } = useForm({
// // //     defaultValues: {
// // //       name: user.name || '',
// // //       username: user.username || '',
// // //       bio: user.bio || '',
// // //       avatar: null // Field untuk file
// // //     }
// // //   });

// // //   // Preview Image Logic
// // //   const avatarFile = watch('avatar');
// // //   if (avatarFile && (avatarFile as any).length > 0) {
// // //      const file = (avatarFile as any)[0];
// // //      const url = URL.createObjectURL(file);
// // //      if (url !== preview) setPreview(url);
// // //   }

// // //   const updateMutation = useMutation({
// // //     mutationFn: async (data: any) => {
// // //       const formData = new FormData();
// // //       formData.append('name', data.name);
// // //       formData.append('username', data.username);
// // //       formData.append('bio', data.bio);
      
// // //       [cite_start]// Handle avatar [cite: 142]
// // //       if (data.avatar && data.avatar[0]) {
// // //         formData.append('avatar', data.avatar[0]);
// // //       }

// // //       return api.patch('/api/me', formData, {
// // //         headers: { 'Content-Type': 'multipart/form-data' } 
// // //       });
// // //     },
// // //     onSuccess: () => {
// // //       queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
// // //       onClose();
// // //     },
// // //     onError: (error: any) => {
// // //       alert(error.response?.data?.message || "Gagal update profil");
// // //     }
// // //   });

// // //   return (
// // //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
// // //       <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
// // //         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black"><X /></button>
// // //         <h2 className="text-xl font-bold mb-6">Edit Profil</h2>
        
// // //         <form onSubmit={handleSubmit((data) => updateMutation.mutate(data))} className="space-y-4">
          
// // //           {/* Avatar Upload UI */}
// // //           <div className="flex flex-col items-center mb-6">
// // //             <div className="relative w-24 h-24">
// // //               <img 
// // //                 src={preview || `https://ui-avatars.com/api/?name=${user.username}`} 
// // //                 className="w-full h-full rounded-full object-cover border-2 border-gray-200"
// // //               />
// // //               <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white cursor-pointer hover:bg-blue-700">
// // //                 <Camera size={16} />
// // //                 <input 
// // //                   type="file" 
// // //                   accept="image/*" 
// // //                   className="hidden" 
// // //                   {...register('avatar')}
// // //                 />
// // //               </label>
// // //             </div>
// // //           </div>

// // //           <div>
// // //             <label className="text-sm font-semibold block mb-1">Nama</label>
// // //             <input {...register('name')} className="w-full border p-2 rounded-lg" />
// // //           </div>
// // //           <div>
// // //             <label className="text-sm font-semibold block mb-1">Username</label>
// // //             <input {...register('username')} className="w-full border p-2 rounded-lg" />
// // //           </div>
// // //           <div>
// // //             <label className="text-sm font-semibold block mb-1">Bio</label>
// // //             <textarea {...register('bio')} className="w-full border p-2 rounded-lg" rows={3} />
// // //           </div>
          
// // //           <button 
// // //             type="submit" 
// // //             disabled={updateMutation.isPending}
// // //             className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 disabled:bg-gray-400 mt-4"
// // //           >
// // //             {updateMutation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
// // //           </button>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import { useForm } from 'react-hook-form';
// // import { useMutation, useQueryClient } from '@tanstack/react-query';
// // import { X, Camera } from 'lucide-react';
// // import api from '../lib/axios';
// // import { useState, useEffect } from 'react';
// // import { User } from '../store/authSlice';

// // interface EditProfileProps {
// //   user: User;
// //   onClose: () => void;
// // }

// // export default function EditProfileModal({ user, onClose }: EditProfileProps) {
// //   const queryClient = useQueryClient();
// //   const [preview, setPreview] = useState<string | null>(user.avatarUrl);
  
// //   const { register, handleSubmit, watch } = useForm({
// //     defaultValues: {
// //       name: user.name || '',
// //       username: user.username || '',
// //       bio: user.bio || '',
// //       avatar: null 
// //     }
// //   });

// //   const avatarFile = watch('avatar');

// //   useEffect(() => {
// //     if (avatarFile && (avatarFile as FileList).length > 0) {
// //       const file = (avatarFile as FileList)[0];
// //       const url = URL.createObjectURL(file);
// //       setPreview(url);
// //       return () => URL.revokeObjectURL(url);
// //     }
// //   }, [avatarFile]);

// //   const updateMutation = useMutation({
// //     mutationFn: async (data: { name: string; username: string; bio: string; avatar: FileList | null }) => {
// //       const formData = new FormData();
// //       formData.append('name', data.name);
// //       formData.append('username', data.username);
// //       formData.append('bio', data.bio);
      
// //       if (data.avatar && data.avatar[0]) {
// //         formData.append('avatar', data.avatar[0]);
// //       }

// //       return api.patch('/api/me', formData, {
// //         headers: { 'Content-Type': 'multipart/form-data' } 
// //       });
// //     },
// //     onSuccess: () => {
// //       queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
// //       onClose();
// //     },
// //     onError: (error: unknown) => {
// //       // Type assertion for simple error handling
// //       const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Gagal update profil";
// //       alert(message);
// //     }
// //   });

// //   return (
// //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
// //         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black"><X /></button>
// //         <h2 className="text-xl font-bold mb-6">Edit Profil</h2>
        
// //         <form onSubmit={handleSubmit((data) => updateMutation.mutate(data))} className="space-y-4">
// //           <div className="flex flex-col items-center mb-6">
// //             <div className="relative w-24 h-24">
// //               <img 
// //                 src={preview || `https://ui-avatars.com/api/?name=${user.username}`} 
// //                 alt="Profile Preview"
// //                 className="w-full h-full rounded-full object-cover border-2 border-gray-200"
// //               />
// //               <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white cursor-pointer hover:bg-blue-700">
// //                 <Camera size={16} />
// //                 <input 
// //                   type="file" 
// //                   accept="image/*" 
// //                   className="hidden" 
// //                   {...register('avatar')}
// //                 />
// //               </label>
// //             </div>
// //           </div>

// //           <div>
// //             <label className="text-sm font-semibold block mb-1">Nama</label>
// //             <input {...register('name')} className="w-full border p-2 rounded-lg" />
// //           </div>
// //           <div>
// //             <label className="text-sm font-semibold block mb-1">Username</label>
// //             <input {...register('username')} className="w-full border p-2 rounded-lg" />
// //           </div>
// //           <div>
// //             <label className="text-sm font-semibold block mb-1">Bio</label>
// //             <textarea {...register('bio')} className="w-full border p-2 rounded-lg" rows={3} />
// //           </div>
          
// //           <button 
// //             type="submit" 
// //             disabled={updateMutation.isPending}
// //             className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 disabled:bg-gray-400 mt-4"
// //           >
// //             {updateMutation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }


// import { useForm, useWatch } from 'react-hook-form';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { X, Camera } from 'lucide-react';
// import api from '../lib/axios';
// import { useState, useEffect } from 'react';
// // Fix 1: Menggunakan 'import type' untuk mengatasi error TypeScript
// import type { User } from '../store/authSlice';

// interface EditProfileProps {
//   user: User;
//   onClose: () => void;
// }

// export default function EditProfileModal({ user, onClose }: EditProfileProps) {
//   const queryClient = useQueryClient();
//   const [preview, setPreview] = useState<string | null>(user.avatarUrl);
  
//   // Fix 2: Destructure 'control' dan hapus 'watch'
//   const { register, handleSubmit, control } = useForm({
//     defaultValues: {
//       name: user.name || '',
//       username: user.username || '',
//       bio: user.bio || '',
//       avatar: null 
//     }
//   });

//   // Fix 2: Gunakan useWatch untuk memantau perubahan value (Compiler-friendly)
//   const avatarFile = useWatch({
//     control,
//     name: 'avatar',
//   });

//   useEffect(() => {
//     if (avatarFile && (avatarFile as FileList).length > 0) {
//       const file = (avatarFile as FileList)[0];
//       const url = URL.createObjectURL(file);
//       setPreview(url);
//       return () => URL.revokeObjectURL(url);
//     }
//   }, [avatarFile]);

//   const updateMutation = useMutation({
//     mutationFn: async (data: { name: string; username: string; bio: string; avatar: FileList | null }) => {
//       const formData = new FormData();
//       formData.append('name', data.name);
//       formData.append('username', data.username);
//       formData.append('bio', data.bio);
      
//       if (data.avatar && data.avatar[0]) {
//         formData.append('avatar', data.avatar[0]);
//       }

//       return api.patch('/api/me', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' } 
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
//       onClose();
//     },
//     onError: (error: unknown) => {
//       const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Gagal update profil";
//       alert(message);
//     }
//   });

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black"><X /></button>
//         <h2 className="text-xl font-bold mb-6">Edit Profil</h2>
        
//         <form onSubmit={handleSubmit((data) => updateMutation.mutate(data))} className="space-y-4">
//           <div className="flex flex-col items-center mb-6">
//             <div className="relative w-24 h-24">
//               <img 
//                 src={preview || `https://ui-avatars.com/api/?name=${user.username}`} 
//                 alt="Profile Preview"
//                 className="w-full h-full rounded-full object-cover border-2 border-gray-200"
//               />
//               <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white cursor-pointer hover:bg-blue-700">
//                 <Camera size={16} />
//                 <input 
//                   type="file" 
//                   accept="image/*" 
//                   className="hidden" 
//                   {...register('avatar')}
//                 />
//               </label>
//             </div>
//           </div>

//           <div>
//             <label className="text-sm font-semibold block mb-1">Nama</label>
//             <input {...register('name')} className="w-full border p-2 rounded-lg" />
//           </div>
//           <div>
//             <label className="text-sm font-semibold block mb-1">Username</label>
//             <input {...register('username')} className="w-full border p-2 rounded-lg" />
//           </div>
//           <div>
//             <label className="text-sm font-semibold block mb-1">Bio</label>
//             <textarea {...register('bio')} className="w-full border p-2 rounded-lg" rows={3} />
//           </div>
          
//           <button 
//             type="submit" 
//             disabled={updateMutation.isPending}
//             className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 disabled:bg-gray-400 mt-4"
//           >
//             {updateMutation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X, Camera } from 'lucide-react';
import api from '../lib/axios';
import { useState, useEffect } from 'react';
import type { User } from '../store/authSlice';

interface EditProfileProps {
  user: User;
  onClose: () => void;
}

export default function EditProfileModal({ user, onClose }: EditProfileProps) {
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState<string | null>(user.avatarUrl);
  
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user.name || '',
      username: user.username || '',
      bio: user.bio || '',
      avatar: null 
    }
  });

  // Effect hanya untuk Cleanup URL blob saat unmount atau preview berubah
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Handler manual untuk trigger preview saat file dipilih
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const updateMutation = useMutation({
    mutationFn: async (data: { name: string; username: string; bio: string; avatar: FileList | null }) => {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('username', data.username);
      formData.append('bio', data.bio);
      
      if (data.avatar && data.avatar.length > 0) {
        formData.append('avatar', data.avatar[0]);
      }

      return api.patch('/api/me', formData, {
        headers: { 'Content-Type': 'multipart/form-data' } 
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
      onClose();
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Gagal update profil";
      alert(message);
    }
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black"><X /></button>
        <h2 className="text-xl font-bold mb-6">Edit Profil</h2>
        
        <form onSubmit={handleSubmit((data) => updateMutation.mutate(data))} className="space-y-4">
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-24 h-24">
              <img 
                src={preview || `https://ui-avatars.com/api/?name=${user.username}`} 
                alt="Profile Preview"
                className="w-full h-full rounded-full object-cover border-2 border-gray-200"
              />
              <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white cursor-pointer hover:bg-blue-700">
                <Camera size={16} />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  {...register('avatar', {
                    onChange: handleFileChange // Trigger preview di sini
                  })}
                />
              </label>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold block mb-1">Nama</label>
            <input {...register('name')} className="w-full border p-2 rounded-lg" />
          </div>
          <div>
            <label className="text-sm font-semibold block mb-1">Username</label>
            <input {...register('username')} className="w-full border p-2 rounded-lg" />
          </div>
          <div>
            <label className="text-sm font-semibold block mb-1">Bio</label>
            <textarea {...register('bio')} className="w-full border p-2 rounded-lg" rows={3} />
          </div>
          
          <button 
            type="submit" 
            disabled={updateMutation.isPending}
            className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 disabled:bg-gray-400 mt-4"
          >
            {updateMutation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </div>
    </div>
  );
}