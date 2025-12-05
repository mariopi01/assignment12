// // // // // // import { useForm } from 'react-hook-form';
// // // // // // import { useMutation, useQueryClient } from '@tanstack/react-query';
// // // // // // import { X, Camera } from 'lucide-react'; // Tambah icon Camera
// // // // // // import api from '../lib/axios';
// // // // // // import { useState } from 'react';

// // // // // // interface EditProfileProps {
// // // // // //   user: any;
// // // // // //   onClose: () => void;
// // // // // // }

// // // // // // export default function EditProfileModal({ user, onClose }: EditProfileProps) {
// // // // // //   const queryClient = useQueryClient();
// // // // // //   const [preview, setPreview] = useState<string | null>(user.avatarUrl);
  
// // // // // //   const { register, handleSubmit, watch } = useForm({
// // // // // //     defaultValues: {
// // // // // //       name: user.name || '',
// // // // // //       username: user.username || '',
// // // // // //       bio: user.bio || '',
// // // // // //       avatar: null // Field untuk file
// // // // // //     }
// // // // // //   });

// // // // // //   // Preview Image Logic
// // // // // //   const avatarFile = watch('avatar');
// // // // // //   if (avatarFile && (avatarFile as any).length > 0) {
// // // // // //      const file = (avatarFile as any)[0];
// // // // // //      const url = URL.createObjectURL(file);
// // // // // //      if (url !== preview) setPreview(url);
// // // // // //   }

// // // // // //   const updateMutation = useMutation({
// // // // // //     mutationFn: async (data: any) => {
// // // // // //       const formData = new FormData();
// // // // // //       formData.append('name', data.name);
// // // // // //       formData.append('username', data.username);
// // // // // //       formData.append('bio', data.bio);
      
// // // // // //       [cite_start]// Handle avatar [cite: 142]
// // // // // //       if (data.avatar && data.avatar[0]) {
// // // // // //         formData.append('avatar', data.avatar[0]);
// // // // // //       }

// // // // // //       return api.patch('/api/me', formData, {
// // // // // //         headers: { 'Content-Type': 'multipart/form-data' } 
// // // // // //       });
// // // // // //     },
// // // // // //     onSuccess: () => {
// // // // // //       queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
// // // // // //       onClose();
// // // // // //     },
// // // // // //     onError: (error: any) => {
// // // // // //       alert(error.response?.data?.message || "Gagal update profil");
// // // // // //     }
// // // // // //   });

// // // // // //   return (
// // // // // //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
// // // // // //       <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
// // // // // //         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black"><X /></button>
// // // // // //         <h2 className="text-xl font-bold mb-6">Edit Profil</h2>
        
// // // // // //         <form onSubmit={handleSubmit((data) => updateMutation.mutate(data))} className="space-y-4">
          
// // // // // //           {/* Avatar Upload UI */}
// // // // // //           <div className="flex flex-col items-center mb-6">
// // // // // //             <div className="relative w-24 h-24">
// // // // // //               <img 
// // // // // //                 src={preview || `https://ui-avatars.com/api/?name=${user.username}`} 
// // // // // //                 className="w-full h-full rounded-full object-cover border-2 border-gray-200"
// // // // // //               />
// // // // // //               <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white cursor-pointer hover:bg-blue-700">
// // // // // //                 <Camera size={16} />
// // // // // //                 <input 
// // // // // //                   type="file" 
// // // // // //                   accept="image/*" 
// // // // // //                   className="hidden" 
// // // // // //                   {...register('avatar')}
// // // // // //                 />
// // // // // //               </label>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           <div>
// // // // // //             <label className="text-sm font-semibold block mb-1">Nama</label>
// // // // // //             <input {...register('name')} className="w-full border p-2 rounded-lg" />
// // // // // //           </div>
// // // // // //           <div>
// // // // // //             <label className="text-sm font-semibold block mb-1">Username</label>
// // // // // //             <input {...register('username')} className="w-full border p-2 rounded-lg" />
// // // // // //           </div>
// // // // // //           <div>
// // // // // //             <label className="text-sm font-semibold block mb-1">Bio</label>
// // // // // //             <textarea {...register('bio')} className="w-full border p-2 rounded-lg" rows={3} />
// // // // // //           </div>
          
// // // // // //           <button 
// // // // // //             type="submit" 
// // // // // //             disabled={updateMutation.isPending}
// // // // // //             className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 disabled:bg-gray-400 mt-4"
// // // // // //           >
// // // // // //             {updateMutation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
// // // // // //           </button>
// // // // // //         </form>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // import { useForm } from 'react-hook-form';
// // // // // import { useMutation, useQueryClient } from '@tanstack/react-query';
// // // // // import { X, Camera } from 'lucide-react';
// // // // // import api from '../lib/axios';
// // // // // import { useState, useEffect } from 'react';
// // // // // import { User } from '../store/authSlice';

// // // // // interface EditProfileProps {
// // // // //   user: User;
// // // // //   onClose: () => void;
// // // // // }

// // // // // export default function EditProfileModal({ user, onClose }: EditProfileProps) {
// // // // //   const queryClient = useQueryClient();
// // // // //   const [preview, setPreview] = useState<string | null>(user.avatarUrl);
  
// // // // //   const { register, handleSubmit, watch } = useForm({
// // // // //     defaultValues: {
// // // // //       name: user.name || '',
// // // // //       username: user.username || '',
// // // // //       bio: user.bio || '',
// // // // //       avatar: null 
// // // // //     }
// // // // //   });

// // // // //   const avatarFile = watch('avatar');

// // // // //   useEffect(() => {
// // // // //     if (avatarFile && (avatarFile as FileList).length > 0) {
// // // // //       const file = (avatarFile as FileList)[0];
// // // // //       const url = URL.createObjectURL(file);
// // // // //       setPreview(url);
// // // // //       return () => URL.revokeObjectURL(url);
// // // // //     }
// // // // //   }, [avatarFile]);

// // // // //   const updateMutation = useMutation({
// // // // //     mutationFn: async (data: { name: string; username: string; bio: string; avatar: FileList | null }) => {
// // // // //       const formData = new FormData();
// // // // //       formData.append('name', data.name);
// // // // //       formData.append('username', data.username);
// // // // //       formData.append('bio', data.bio);
      
// // // // //       if (data.avatar && data.avatar[0]) {
// // // // //         formData.append('avatar', data.avatar[0]);
// // // // //       }

// // // // //       return api.patch('/api/me', formData, {
// // // // //         headers: { 'Content-Type': 'multipart/form-data' } 
// // // // //       });
// // // // //     },
// // // // //     onSuccess: () => {
// // // // //       queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
// // // // //       onClose();
// // // // //     },
// // // // //     onError: (error: unknown) => {
// // // // //       // Type assertion for simple error handling
// // // // //       const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Gagal update profil";
// // // // //       alert(message);
// // // // //     }
// // // // //   });

// // // // //   return (
// // // // //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
// // // // //       <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
// // // // //         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black"><X /></button>
// // // // //         <h2 className="text-xl font-bold mb-6">Edit Profil</h2>
        
// // // // //         <form onSubmit={handleSubmit((data) => updateMutation.mutate(data))} className="space-y-4">
// // // // //           <div className="flex flex-col items-center mb-6">
// // // // //             <div className="relative w-24 h-24">
// // // // //               <img 
// // // // //                 src={preview || `https://ui-avatars.com/api/?name=${user.username}`} 
// // // // //                 alt="Profile Preview"
// // // // //                 className="w-full h-full rounded-full object-cover border-2 border-gray-200"
// // // // //               />
// // // // //               <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white cursor-pointer hover:bg-blue-700">
// // // // //                 <Camera size={16} />
// // // // //                 <input 
// // // // //                   type="file" 
// // // // //                   accept="image/*" 
// // // // //                   className="hidden" 
// // // // //                   {...register('avatar')}
// // // // //                 />
// // // // //               </label>
// // // // //             </div>
// // // // //           </div>

// // // // //           <div>
// // // // //             <label className="text-sm font-semibold block mb-1">Nama</label>
// // // // //             <input {...register('name')} className="w-full border p-2 rounded-lg" />
// // // // //           </div>
// // // // //           <div>
// // // // //             <label className="text-sm font-semibold block mb-1">Username</label>
// // // // //             <input {...register('username')} className="w-full border p-2 rounded-lg" />
// // // // //           </div>
// // // // //           <div>
// // // // //             <label className="text-sm font-semibold block mb-1">Bio</label>
// // // // //             <textarea {...register('bio')} className="w-full border p-2 rounded-lg" rows={3} />
// // // // //           </div>
          
// // // // //           <button 
// // // // //             type="submit" 
// // // // //             disabled={updateMutation.isPending}
// // // // //             className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 disabled:bg-gray-400 mt-4"
// // // // //           >
// // // // //             {updateMutation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
// // // // //           </button>
// // // // //         </form>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // import { useForm, useWatch } from 'react-hook-form';
// // // // import { useMutation, useQueryClient } from '@tanstack/react-query';
// // // // import { X, Camera } from 'lucide-react';
// // // // import api from '../lib/axios';
// // // // import { useState, useEffect } from 'react';
// // // // // Fix 1: Menggunakan 'import type' untuk mengatasi error TypeScript
// // // // import type { User } from '../store/authSlice';

// // // // interface EditProfileProps {
// // // //   user: User;
// // // //   onClose: () => void;
// // // // }

// // // // export default function EditProfileModal({ user, onClose }: EditProfileProps) {
// // // //   const queryClient = useQueryClient();
// // // //   const [preview, setPreview] = useState<string | null>(user.avatarUrl);
  
// // // //   // Fix 2: Destructure 'control' dan hapus 'watch'
// // // //   const { register, handleSubmit, control } = useForm({
// // // //     defaultValues: {
// // // //       name: user.name || '',
// // // //       username: user.username || '',
// // // //       bio: user.bio || '',
// // // //       avatar: null 
// // // //     }
// // // //   });

// // // //   // Fix 2: Gunakan useWatch untuk memantau perubahan value (Compiler-friendly)
// // // //   const avatarFile = useWatch({
// // // //     control,
// // // //     name: 'avatar',
// // // //   });

// // // //   useEffect(() => {
// // // //     if (avatarFile && (avatarFile as FileList).length > 0) {
// // // //       const file = (avatarFile as FileList)[0];
// // // //       const url = URL.createObjectURL(file);
// // // //       setPreview(url);
// // // //       return () => URL.revokeObjectURL(url);
// // // //     }
// // // //   }, [avatarFile]);

// // // //   const updateMutation = useMutation({
// // // //     mutationFn: async (data: { name: string; username: string; bio: string; avatar: FileList | null }) => {
// // // //       const formData = new FormData();
// // // //       formData.append('name', data.name);
// // // //       formData.append('username', data.username);
// // // //       formData.append('bio', data.bio);
      
// // // //       if (data.avatar && data.avatar[0]) {
// // // //         formData.append('avatar', data.avatar[0]);
// // // //       }

// // // //       return api.patch('/api/me', formData, {
// // // //         headers: { 'Content-Type': 'multipart/form-data' } 
// // // //       });
// // // //     },
// // // //     onSuccess: () => {
// // // //       queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
// // // //       onClose();
// // // //     },
// // // //     onError: (error: unknown) => {
// // // //       const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Gagal update profil";
// // // //       alert(message);
// // // //     }
// // // //   });

// // // //   return (
// // // //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
// // // //       <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
// // // //         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black"><X /></button>
// // // //         <h2 className="text-xl font-bold mb-6">Edit Profil</h2>
        
// // // //         <form onSubmit={handleSubmit((data) => updateMutation.mutate(data))} className="space-y-4">
// // // //           <div className="flex flex-col items-center mb-6">
// // // //             <div className="relative w-24 h-24">
// // // //               <img 
// // // //                 src={preview || `https://ui-avatars.com/api/?name=${user.username}`} 
// // // //                 alt="Profile Preview"
// // // //                 className="w-full h-full rounded-full object-cover border-2 border-gray-200"
// // // //               />
// // // //               <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white cursor-pointer hover:bg-blue-700">
// // // //                 <Camera size={16} />
// // // //                 <input 
// // // //                   type="file" 
// // // //                   accept="image/*" 
// // // //                   className="hidden" 
// // // //                   {...register('avatar')}
// // // //                 />
// // // //               </label>
// // // //             </div>
// // // //           </div>

// // // //           <div>
// // // //             <label className="text-sm font-semibold block mb-1">Nama</label>
// // // //             <input {...register('name')} className="w-full border p-2 rounded-lg" />
// // // //           </div>
// // // //           <div>
// // // //             <label className="text-sm font-semibold block mb-1">Username</label>
// // // //             <input {...register('username')} className="w-full border p-2 rounded-lg" />
// // // //           </div>
// // // //           <div>
// // // //             <label className="text-sm font-semibold block mb-1">Bio</label>
// // // //             <textarea {...register('bio')} className="w-full border p-2 rounded-lg" rows={3} />
// // // //           </div>
          
// // // //           <button 
// // // //             type="submit" 
// // // //             disabled={updateMutation.isPending}
// // // //             className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 disabled:bg-gray-400 mt-4"
// // // //           >
// // // //             {updateMutation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
// // // //           </button>
// // // //         </form>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // import { useForm } from 'react-hook-form';
// // // import { useMutation, useQueryClient } from '@tanstack/react-query';
// // // import { X, Camera } from 'lucide-react';
// // // import api from '../lib/axios';
// // // import { useState, useEffect } from 'react';
// // // import type { User } from '../store/authSlice';

// // // interface EditProfileProps {
// // //   user: User;
// // //   onClose: () => void;
// // // }

// // // export default function EditProfileModal({ user, onClose }: EditProfileProps) {
// // //   const queryClient = useQueryClient();
// // //   const [preview, setPreview] = useState<string | null>(user.avatarUrl);
  
// // //   const { register, handleSubmit } = useForm({
// // //     defaultValues: {
// // //       name: user.name || '',
// // //       username: user.username || '',
// // //       bio: user.bio || '',
// // //       avatar: null 
// // //     }
// // //   });

// // //   // Effect hanya untuk Cleanup URL blob saat unmount atau preview berubah
// // //   useEffect(() => {
// // //     return () => {
// // //       if (preview && preview.startsWith('blob:')) {
// // //         URL.revokeObjectURL(preview);
// // //       }
// // //     };
// // //   }, [preview]);

// // //   // Handler manual untuk trigger preview saat file dipilih
// // //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const files = e.target.files;
// // //     if (files && files.length > 0) {
// // //       const file = files[0];
// // //       const url = URL.createObjectURL(file);
// // //       setPreview(url);
// // //     }
// // //   };

// // //   const updateMutation = useMutation({
// // //     mutationFn: async (data: { name: string; username: string; bio: string; avatar: FileList | null }) => {
// // //       const formData = new FormData();
// // //       formData.append('name', data.name);
// // //       formData.append('username', data.username);
// // //       formData.append('bio', data.bio);
      
// // //       if (data.avatar && data.avatar.length > 0) {
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
// // //     onError: (error: unknown) => {
// // //       const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Gagal update profil";
// // //       alert(message);
// // //     }
// // //   });

// // //   return (
// // //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
// // //       <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
// // //         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black"><X /></button>
// // //         <h2 className="text-xl font-bold mb-6">Edit Profil</h2>
        
// // //         <form onSubmit={handleSubmit((data) => updateMutation.mutate(data))} className="space-y-4">
// // //           <div className="flex flex-col items-center mb-6">
// // //             <div className="relative w-24 h-24">
// // //               <img 
// // //                 src={preview || `https://ui-avatars.com/api/?name=${user.username}`} 
// // //                 alt="Profile Preview"
// // //                 className="w-full h-full rounded-full object-cover border-2 border-gray-200"
// // //               />
// // //               <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white cursor-pointer hover:bg-blue-700">
// // //                 <Camera size={16} />
// // //                 <input 
// // //                   type="file" 
// // //                   accept="image/*" 
// // //                   className="hidden" 
// // //                   {...register('avatar', {
// // //                     onChange: handleFileChange // Trigger preview di sini
// // //                   })}
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
// // import { ArrowLeft } from 'lucide-react';
// // import api from '../lib/axios';
// // import { useState, useEffect } from 'react';
// // import type { User } from '../store/authSlice';
// // import Header from './Header'; // Import Header

// // interface EditProfileProps {
// //   user: User;
// //   onClose: () => void;
// // }

// // export default function EditProfileModal({ user, onClose }: EditProfileProps) {
// //   const queryClient = useQueryClient();
// //   const [preview, setPreview] = useState<string | null>(user.avatarUrl);
  
// //   const { register, handleSubmit } = useForm({
// //     defaultValues: {
// //       name: user.name || '',
// //       username: user.username || '',
// //       email: user.email || '', // Asumsi user punya email di interface
// //       // phone: user.phone || '', // Uncomment jika User interface sudah punya phone
// //       bio: user.bio || '',
// //       avatar: null 
// //     }
// //   });

// //   // Effect hanya untuk Cleanup URL blob saat unmount atau preview berubah
// //   useEffect(() => {
// //     return () => {
// //       if (preview && preview.startsWith('blob:')) {
// //         URL.revokeObjectURL(preview);
// //       }
// //     };
// //   }, [preview]);

// //   // Handler manual untuk trigger preview saat file dipilih
// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const files = e.target.files;
// //     if (files && files.length > 0) {
// //       const file = files[0];
// //       const url = URL.createObjectURL(file);
// //       setPreview(url);
// //     }
// //   };

// //   const updateMutation = useMutation({
// //     mutationFn: async (data: any) => {
// //       const formData = new FormData();
// //       formData.append('name', data.name);
// //       formData.append('username', data.username);
// //       formData.append('bio', data.bio);
// //       // formData.append('phone', data.phone); // Uncomment jika backend support
      
// //       if (data.avatar && data.avatar.length > 0) {
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
// //     onError: (error: any) => {
// //       const message = error.response?.data?.message || "Gagal update profil";
// //       alert(message);
// //     }
// //   });

// //   return (
// //     <div className="fixed inset-0 z-50 bg-[#000000] overflow-y-auto">
// //       {/* 1. Header Global */}
// //       <Header />

// //       {/* 2. Container Utama */}
// //       <div 
// //         className="relative flex flex-col mx-auto bg-[#000000]"
// //         style={{
// //             width: '800px',
// //             marginTop: '40px', // Top 120px - Header 80px
// //             gap: '32px',
// //             marginBottom: '40px'
// //         }}
// //       >
// //         {/* Header Section: Arrow + Title */}
// //         <div className="flex items-center gap-4">
// //             <button onClick={onClose} className="hover:opacity-80 transition-opacity text-white">
// //                 <ArrowLeft size={32} />
// //             </button>
// //             <h1 className="text-[#FDFDFD] font-bold text-3xl font-display tracking-tight">
// //                 Edit Profile
// //             </h1>
// //         </div>

// //         <form onSubmit={handleSubmit((data) => updateMutation.mutate(data))} className="flex gap-12">
            
// //             {/* A. Left Column: Avatar & Change Photo Button */}
// //             <div className="flex flex-col items-center gap-6 shrink-0">
// //                 {/* A.1 User Avatar */}
// //                 <div className="w-[130px] h-[130px] rounded-full overflow-hidden border border-[#181D27]">
// //                     <img 
// //                         src={preview || `https://ui-avatars.com/api/?name=${user.username}`} 
// //                         alt="Profile Preview"
// //                         className="w-full h-full object-cover"
// //                     />
// //                 </div>

// //                 {/* A.2 Change Photo Button */}
// //                 <label className="w-[160px] h-[48px] flex items-center justify-center rounded-full border border-[#181D27] text-[#FDFDFD] font-bold text-md cursor-pointer hover:bg-[#181D27] transition-colors">
// //                     Change Photo
// //                     <input 
// //                         type="file" 
// //                         accept="image/*" 
// //                         className="hidden" 
// //                         {...register('avatar', {
// //                             onChange: handleFileChange 
// //                         })}
// //                     />
// //                 </label>
// //             </div>

// //             {/* B. Right Column: Form Inputs */}
// //             <div className="flex flex-col gap-6 flex-1 w-[592px]">
                
// //                 {/* B.1 & B.2 Name */}
// //                 <div className="flex flex-col gap-2">
// //                     <label className="text-[#FFFFFF] font-bold text-sm leading-5">
// //                         Name
// //                     </label>
// //                     <input 
// //                         {...register('name')} 
// //                         className="w-full h-[48px] bg-[#0A0D12] border border-[#181D27] rounded-xl px-4 text-[#FDFDFD] focus:outline-none focus:border-[#6936F2] transition-colors"
// //                     />
// //                 </div>

// //                 {/* B.3 & B.4 Username */}
// //                 <div className="flex flex-col gap-2">
// //                     <label className="text-[#FFFFFF] font-bold text-sm leading-5">
// //                         Username
// //                     </label>
// //                     <input 
// //                         {...register('username')} 
// //                         className="w-full h-[48px] bg-[#0A0D12] border border-[#181D27] rounded-xl px-4 text-[#FDFDFD] focus:outline-none focus:border-[#6936F2] transition-colors"
// //                     />
// //                 </div>

// //                 {/* B.5 & B.6 Email */}
// //                 <div className="flex flex-col gap-2">
// //                     <label className="text-[#FFFFFF] font-bold text-sm leading-5">
// //                         Email
// //                     </label>
// //                     <input 
// //                         {...register('email')} 
// //                         type="email"
// //                         className="w-full h-[48px] bg-[#0A0D12] border border-[#181D27] rounded-xl px-4 text-[#FDFDFD] focus:outline-none focus:border-[#6936F2] transition-colors"
// //                     />
// //                 </div>

// //                 {/* B.7 & B.8 Phone Number (Optional placeholder, need implementation in schema if used) */}
// //                 <div className="flex flex-col gap-2">
// //                     <label className="text-[#FFFFFF] font-bold text-sm leading-5">
// //                         Phone Number
// //                     </label>
// //                     <input 
// //                         // {...register('phone')} 
// //                         type="tel"
// //                         className="w-full h-[48px] bg-[#0A0D12] border border-[#181D27] rounded-xl px-4 text-[#FDFDFD] focus:outline-none focus:border-[#6936F2] transition-colors"
// //                         placeholder="Enter phone number" 
// //                     />
// //                 </div>

// //                 {/* B.8 Bio (Using textarea for consistency but styled as input box if single line requested, or textarea if multiline) */}
// //                 <div className="flex flex-col gap-2">
// //                     <label className="text-[#FFFFFF] font-bold text-sm leading-5">
// //                         Bio
// //                     </label>
// //                     <textarea 
// //                         {...register('bio')} 
// //                         rows={4}
// //                         className="w-full bg-[#0A0D12] border border-[#181D27] rounded-xl p-4 text-[#FDFDFD] resize-none focus:outline-none focus:border-[#6936F2] transition-colors"
// //                     />
// //                 </div>

// //                 {/* B.9 Save Changes Button */}
// //                 <button 
// //                     type="submit" 
// //                     disabled={updateMutation.isPending}
// //                     className="w-full h-[48px] bg-[#6936F2] text-[#FDFDFD] font-bold text-md rounded-full hover:bg-[#5b2ed1] transition-colors disabled:opacity-50 mt-2"
// //                 >
// //                     {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
// //                 </button>

// //             </div>

// //         </form>
// //       </div>
// //     </div>
// //   );
// // }


// import { useForm } from 'react-hook-form';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { ArrowLeft } from 'lucide-react';
// import api from '../lib/axios';
// import { useState, useEffect } from 'react';
// import type { User } from '../store/authSlice';
// import Header from './Header';
// import { AxiosError } from 'axios';

// interface EditProfileProps {
//   user: User;
//   onClose: () => void;
// }

// // Definisi tipe data form
// interface EditProfileFormData {
//   name: string;
//   username: string;
//   email: string;
//   bio: string;
//   avatar: FileList | null;
// }

// export default function EditProfileModal({ user, onClose }: EditProfileProps) {
//   const queryClient = useQueryClient();
//   const [preview, setPreview] = useState<string | null>(user.avatarUrl);
  
//   const { register, handleSubmit } = useForm<EditProfileFormData>({
//     defaultValues: {
//       name: user.name || '',
//       username: user.username || '',
//       email: user.email || '',
//       bio: user.bio || '',
//       avatar: null 
//     }
//   });

//   // Effect hanya untuk Cleanup URL blob saat unmount atau preview berubah
//   useEffect(() => {
//     return () => {
//       if (preview && preview.startsWith('blob:')) {
//         URL.revokeObjectURL(preview);
//       }
//     };
//   }, [preview]);

//   // Handler manual untuk trigger preview saat file dipilih
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       const file = files[0];
//       const url = URL.createObjectURL(file);
//       setPreview(url);
//     }
//   };

//   const updateMutation = useMutation({
//     mutationFn: async (data: EditProfileFormData) => {
//       const formData = new FormData();
//       formData.append('name', data.name);
//       formData.append('username', data.username);
//       formData.append('bio', data.bio);
      
//       if (data.avatar && data.avatar.length > 0) {
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
//       const err = error as AxiosError<{ message: string }>;
//       const message = err.response?.data?.message || "Gagal update profil";
//       alert(message);
//     }
//   });

//   return (
//     <div className="fixed inset-0 z-50 bg-[#000000] overflow-y-auto">
//       {/* 1. Header Global */}
//       <Header />

//       {/* 2. Container Utama */}
//       <div 
//         className="relative flex flex-col mx-auto bg-[#000000]"
//         style={{
//             width: '800px',
//             marginTop: '40px', // Top 120px - Header 80px
//             gap: '32px',
//             marginBottom: '40px'
//         }}
//       >
//         {/* Header Section: Arrow + Title */}
//         <div className="flex items-center gap-4">
//             <button onClick={onClose} className="hover:opacity-80 transition-opacity text-white">
//                 <ArrowLeft size={32} />
//             </button>
//             <h1 className="text-[#FDFDFD] font-bold text-3xl font-display tracking-tight">
//                 Edit Profile
//             </h1>
//         </div>

//         <form onSubmit={handleSubmit((data) => updateMutation.mutate(data))} className="flex gap-12">
            
//             {/* A. Left Column: Avatar & Change Photo Button */}
//             <div className="flex flex-col items-center gap-6 shrink-0">
//                 {/* A.1 User Avatar */}
//                 <div className="w-[130px] h-[130px] rounded-full overflow-hidden border border-[#181D27]">
//                     <img 
//                         src={preview || `https://ui-avatars.com/api/?name=${user.username}`} 
//                         alt="Profile Preview"
//                         className="w-full h-full object-cover"
//                     />
//                 </div>

//                 {/* A.2 Change Photo Button */}
//                 <label className="w-40 h-12 flex items-center justify-center rounded-full border border-[#181D27] text-[#FDFDFD] font-bold text-md cursor-pointer hover:bg-[#181D27] transition-colors">
//                     Change Photo
//                     <input 
//                         type="file" 
//                         accept="image/*" 
//                         className="hidden" 
//                         {...register('avatar', {
//                             onChange: handleFileChange 
//                         })}
//                     />
//                 </label>
//             </div>

//             {/* B. Right Column: Form Inputs */}
//             <div className="flex flex-col gap-6 flex-1 w-[592px]">
                
//                 {/* B.1 & B.2 Name */}
//                 <div className="flex flex-col gap-2">
//                     <label className="text-[#FFFFFF] font-bold text-sm leading-5">
//                         Name
//                     </label>
//                     <input 
//                         {...register('name')} 
//                         className="w-full h-12 bg-[#0A0D12] border border-[#181D27] rounded-xl px-4 text-[#FDFDFD] focus:outline-none focus:border-[#6936F2] transition-colors"
//                     />
//                 </div>

//                 {/* B.3 & B.4 Username */}
//                 <div className="flex flex-col gap-2">
//                     <label className="text-[#FFFFFF] font-bold text-sm leading-5">
//                         Username
//                     </label>
//                     <input 
//                         {...register('username')} 
//                         className="w-full h-12 bg-[#0A0D12] border border-[#181D27] rounded-xl px-4 text-[#FDFDFD] focus:outline-none focus:border-[#6936F2] transition-colors"
//                     />
//                 </div>

//                 {/* B.5 & B.6 Email */}
//                 <div className="flex flex-col gap-2">
//                     <label className="text-[#FFFFFF] font-bold text-sm leading-5">
//                         Email
//                     </label>
//                     <input 
//                         {...register('email')} 
//                         type="email"
//                         className="w-full h-12 bg-[#0A0D12] border border-[#181D27] rounded-xl px-4 text-[#FDFDFD] focus:outline-none focus:border-[#6936F2] transition-colors"
//                     />
//                 </div>

//                 {/* B.7 & B.8 Phone Number */}
//                 <div className="flex flex-col gap-2">
//                     <label className="text-[#FFFFFF] font-bold text-sm leading-5">
//                         Phone Number
//                     </label>
//                     <input 
//                         type="tel"
//                         className="w-full h-12 bg-[#0A0D12] border border-[#181D27] rounded-xl px-4 text-[#FDFDFD] focus:outline-none focus:border-[#6936F2] transition-colors"
//                         placeholder="Enter phone number" 
//                     />
//                 </div>

//                 {/* B.8 Bio */}
//                 <div className="flex flex-col gap-2">
//                     <label className="text-[#FFFFFF] font-bold text-sm leading-5">
//                         Bio
//                     </label>
//                     <textarea 
//                         {...register('bio')} 
//                         rows={4}
//                         className="w-full bg-[#0A0D12] border border-[#181D27] rounded-xl p-4 text-[#FDFDFD] resize-none focus:outline-none focus:border-[#6936F2] transition-colors"
//                     />
//                 </div>

//                 {/* B.9 Save Changes Button */}
//                 <button 
//                     type="submit" 
//                     disabled={updateMutation.isPending}
//                     className="w-full h-12 bg-[#6936F2] text-[#FDFDFD] font-bold text-md rounded-full hover:bg-[#5b2ed1] transition-colors disabled:opacity-50 mt-2"
//                 >
//                     {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
//                 </button>

//             </div>

//         </form>
//       </div>
//     </div>
//   );
// }


import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import api from '../lib/axios';
import { useState, useEffect } from 'react';
import Header from './Header';
import { AxiosError } from 'axios';

// Definisi tipe user yang mendukung field phone & avatarUrl
interface UserProfile {
  name?: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  bio?: string | null;
  phone?: string;
}

interface EditProfileProps {
  user: UserProfile;
  onClose: () => void;
}

// Definisi tipe data form
interface EditProfileFormData {
  name: string;
  username: string;
  email: string;
  phone: string;
  bio: string;
  avatar: FileList | null;
}

export default function EditProfileModal({ user, onClose }: EditProfileProps) {
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState<string | null>(user.avatarUrl);
  
  const { register, handleSubmit } = useForm<EditProfileFormData>({
    defaultValues: {
      name: user.name || '',
      username: user.username || '',
      email: user.email || '',
      phone: user.phone || '',
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
    mutationFn: async (data: EditProfileFormData) => {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('username', data.username);
      formData.append('phone', data.phone);
      formData.append('bio', data.bio);
      // Kirim avatarUrl string (existing) jika diminta API
      formData.append('avatarUrl', user.avatarUrl || "");
      
      // Avatar file (binary) hanya jika ada file baru
      if (data.avatar && data.avatar.length > 0) {
        formData.append('avatar', data.avatar[0]);
      }

      return api.patch('/api/me', formData, {
        headers: { 'Content-Type': 'multipart/form-data' } 
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
      // Invalidate user specific query as well
      if (user.username) {
        queryClient.invalidateQueries({ queryKey: ['profile', user.username] });
      }
      onClose();
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data?.message || "Gagal update profil";
      alert(message);
    }
  });

  return (
    <div className="fixed inset-0 z-100 bg-[#000000] overflow-y-auto">
      {/* 1. Header Global */}
      <Header />

      {/* 2. Container Utama */}
      <div 
        className="relative flex flex-col mx-auto bg-[#000000]"
        style={{
            width: '800px',
            marginTop: '40px', // Top 120px - Header 80px
            gap: '32px',
            marginBottom: '40px'
        }}
      >
        {/* Header Section: Arrow + Title */}
        <div className="flex items-center gap-4">
            <button onClick={onClose} className="hover:opacity-80 transition-opacity text-white">
                <ArrowLeft size={32} />
            </button>
            <h1 className="text-[#FDFDFD] font-bold text-3xl font-display tracking-tight">
                Edit Profile
            </h1>
        </div>

        <form onSubmit={handleSubmit((data) => updateMutation.mutate(data))} className="flex gap-12">
            
            {/* A. Left Column: Avatar & Change Photo Button */}
            <div className="flex flex-col items-center gap-6 shrink-0">
                {/* A.1 User Avatar */}
                <div className="w-[130px] h-[130px] rounded-full overflow-hidden border border-[#181D27]">
                    <img 
                        src={preview || `https://ui-avatars.com/api/?name=${user.username}`} 
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* A.2 Change Photo Button */}
                <label className="w-40 h-12 flex items-center justify-center rounded-full border border-[#181D27] text-[#FDFDFD] font-bold text-md cursor-pointer hover:bg-[#181D27] transition-colors">
                    Change Photo
                    <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        {...register('avatar', {
                            onChange: handleFileChange 
                        })}
                    />
                </label>
            </div>

            {/* B. Right Column: Form Inputs */}
            <div className="flex flex-col gap-6 flex-1 w-[592px]">
                
                {/* B.1 & B.2 Name */}
                <div className="flex flex-col gap-2">
                    <label className="text-[#FFFFFF] font-bold text-sm leading-5">
                        Name
                    </label>
                    <input 
                        {...register('name')} 
                        className="w-full h-12 bg-[#0A0D12] border border-[#181D27] rounded-xl px-4 text-[#FDFDFD] focus:outline-none focus:border-[#6936F2] transition-colors"
                    />
                </div>

                {/* B.3 & B.4 Username */}
                <div className="flex flex-col gap-2">
                    <label className="text-[#FFFFFF] font-bold text-sm leading-5">
                        Username
                    </label>
                    <input 
                        {...register('username')} 
                        className="w-full h-12 bg-[#0A0D12] border border-[#181D27] rounded-xl px-4 text-[#FDFDFD] focus:outline-none focus:border-[#6936F2] transition-colors"
                    />
                </div>

                {/* B.5 & B.6 Email */}
                <div className="flex flex-col gap-2">
                    <label className="text-[#FFFFFF] font-bold text-sm leading-5">
                        Email
                    </label>
                    <input 
                        {...register('email')} 
                        type="email"
                        readOnly // Email biasanya tidak diubah lewat basic profile update
                        className="w-full h-12 bg-[#0A0D12] border border-[#181D27] rounded-xl px-4 text-[#A4A7AE] focus:outline-none cursor-not-allowed"
                    />
                </div>

                {/* B.7 & B.8 Phone Number */}
                <div className="flex flex-col gap-2">
                    <label className="text-[#FFFFFF] font-bold text-sm leading-5">
                        Phone Number
                    </label>
                    <input 
                        {...register('phone')} 
                        type="tel"
                        className="w-full h-12 bg-[#0A0D12] border border-[#181D27] rounded-xl px-4 text-[#FDFDFD] focus:outline-none focus:border-[#6936F2] transition-colors"
                        placeholder="Enter phone number" 
                    />
                </div>

                {/* B.8 Bio */}
                <div className="flex flex-col gap-2">
                    <label className="text-[#FFFFFF] font-bold text-sm leading-5">
                        Bio
                    </label>
                    <textarea 
                        {...register('bio')} 
                        rows={4}
                        className="w-full bg-[#0A0D12] border border-[#181D27] rounded-xl p-4 text-[#FDFDFD] resize-none focus:outline-none focus:border-[#6936F2] transition-colors"
                    />
                </div>

                {/* B.9 Save Changes Button */}
                <button 
                    type="submit" 
                    disabled={updateMutation.isPending}
                    className="w-full h-12 bg-[#6936F2] text-[#FDFDFD] font-bold text-md rounded-full hover:bg-[#5b2ed1] transition-colors disabled:opacity-50 mt-2"
                >
                    {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                </button>

            </div>

        </form>
      </div>
    </div>
  );
}