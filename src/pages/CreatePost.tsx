// // // // // import { useState } from 'react';
// // // // // import { useForm } from 'react-hook-form';
// // // // // import { useMutation, useQueryClient } from '@tanstack/react-query';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import { Image as ImageIcon, X } from 'lucide-react';
// // // // // import api from '../lib/axios';

// // // // // type CreatePostForm = {
// // // // //   caption: string;
// // // // //   image: FileList;
// // // // // };

// // // // // export default function CreatePost() {
// // // // //   const { register, handleSubmit, watch, formState: { errors } } = useForm<CreatePostForm>();
// // // // //   const [preview, setPreview] = useState<string | null>(null);
// // // // //   const navigate = useNavigate();
// // // // //   const queryClient = useQueryClient();

// // // // //   // Watch input file untuk preview image
// // // // //   const imageFile = watch('image');
// // // // //   if (imageFile && imageFile.length > 0 && !preview) {
// // // // //     const file = imageFile[0];
// // // // //     setPreview(URL.createObjectURL(file));
// // // // //   }

// // // // //   const createPostMutation = useMutation({
// // // // //     mutationFn: async (data: CreatePostForm) => {
// // // // //       const formData = new FormData();
// // // // //       formData.append('caption', data.caption);
// // // // //       formData.append('image', data.image[0]); // Ambil file pertama

// // // // //       // Kirim ke endpoint POST /api/posts
// // // // //       return api.post('/api/posts', formData, {
// // // // //         headers: { 'Content-Type': 'multipart/form-data' },
// // // // //       });
// // // // //     },
// // // // //     onSuccess: () => {
// // // // //       queryClient.invalidateQueries({ queryKey: ['feed'] }); // Refresh feed
// // // // //       queryClient.invalidateQueries({ queryKey: ['my-posts'] });
// // // // //       navigate('/'); // Redirect ke home
// // // // //     },
// // // // //     onError: (err) => {
// // // // //       console.error(err);
// // // // //       alert("Gagal upload post. Pastikan gambar < 5MB."); // [cite: 280]
// // // // //     }
// // // // //   });

// // // // //   return (
// // // // //     <div className="p-4 md:p-8 max-w-2xl mx-auto">
// // // // //       <h1 className="text-2xl font-bold mb-6">Buat Post Baru</h1>
      
// // // // //       <form onSubmit={handleSubmit((data) => createPostMutation.mutate(data))} className="space-y-6">
// // // // //         {/* Image Upload Area */}
// // // // //         <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center relative hover:bg-gray-50 transition">
// // // // //           {preview ? (
// // // // //             <div className="relative">
// // // // //               <img src={preview} alt="Preview" className="max-h-96 mx-auto rounded-lg" />
// // // // //               <button 
// // // // //                 type="button"
// // // // //                 onClick={() => { setPreview(null); }}
// // // // //                 className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
// // // // //               >
// // // // //                 <X size={20} />
// // // // //               </button>
// // // // //             </div>
// // // // //           ) : (
// // // // //             <>
// // // // //               <input 
// // // // //                 {...register('image', { required: "Gambar wajib diisi" })}
// // // // //                 type="file" 
// // // // //                 accept="image/*"
// // // // //                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
// // // // //               />
// // // // //               <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
// // // // //               <p className="mt-2 text-sm text-gray-600">Klik untuk upload foto (Max 5MB)</p>
// // // // //             </>
// // // // //           )}
// // // // //         </div>
// // // // //         {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

// // // // //         {/* Caption Area */}
// // // // //         <div>
// // // // //           <textarea 
// // // // //             {...register('caption')}
// // // // //             className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
// // // // //             rows={4}
// // // // //             placeholder="Tulis caption menarik..."
// // // // //           ></textarea>
// // // // //         </div>

// // // // //         <button 
// // // // //           type="submit"
// // // // //           disabled={createPostMutation.isPending}
// // // // //           className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-400"
// // // // //         >
// // // // //           {createPostMutation.isPending ? 'Mengirim...' : 'Posting'}
// // // // //         </button>
// // // // //       </form>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // import { useState, useEffect } from 'react';
// // // // import { useForm, useWatch } from 'react-hook-form';
// // // // import { useMutation, useQueryClient } from '@tanstack/react-query';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { Image as ImageIcon, X } from 'lucide-react';
// // // // import api from '../lib/axios';

// // // // type CreatePostForm = {
// // // //   caption: string;
// // // //   image: FileList;
// // // // };

// // // // export default function CreatePost() {
// // // //   // Fix: Gunakan 'control' untuk useWatch
// // // //   const { register, handleSubmit, control, formState: { errors } } = useForm<CreatePostForm>();
// // // //   const [preview, setPreview] = useState<string | null>(null);
// // // //   const navigate = useNavigate();
// // // //   const queryClient = useQueryClient();

// // // //   // Fix: Gunakan useWatch daripada watch()
// // // //   const imageFile = useWatch({
// // // //     control,
// // // //     name: 'image',
// // // //   });

// // // //   // Fix: Pindahkan logic preview ke useEffect
// // // //   useEffect(() => {
// // // //     if (imageFile && imageFile.length > 0) {
// // // //       const file = imageFile[0];
// // // //       const url = URL.createObjectURL(file);
// // // //       setPreview(url);

// // // //       // Cleanup function untuk mencegah memory leak
// // // //       return () => URL.revokeObjectURL(url);
// // // //     } else {
// // // //       setPreview(null);
// // // //     }
// // // //   }, [imageFile]);

// // // //   const createPostMutation = useMutation({
// // // //     mutationFn: async (data: CreatePostForm) => {
// // // //       const formData = new FormData();
// // // //       formData.append('caption', data.caption);
// // // //       formData.append('image', data.image[0]); // Ambil file pertama

// // // //       // Kirim ke endpoint POST /api/posts
// // // //       return api.post('/api/posts', formData, {
// // // //         headers: { 'Content-Type': 'multipart/form-data' },
// // // //       });
// // // //     },
// // // //     onSuccess: () => {
// // // //       queryClient.invalidateQueries({ queryKey: ['feed'] }); // Refresh feed
// // // //       queryClient.invalidateQueries({ queryKey: ['my-posts'] });
// // // //       navigate('/'); // Redirect ke home
// // // //     },
// // // //     onError: (err) => {
// // // //       console.error(err);
// // // //       alert("Gagal upload post. Pastikan gambar < 5MB.");
// // // //     }
// // // //   });

// // // //   return (
// // // //     <div className="p-4 md:p-8 max-w-2xl mx-auto">
// // // //       <h1 className="text-2xl font-bold mb-6">Buat Post Baru</h1>
      
// // // //       <form onSubmit={handleSubmit((data) => createPostMutation.mutate(data))} className="space-y-6">
// // // //         {/* Image Upload Area */}
// // // //         <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center relative hover:bg-gray-50 transition">
// // // //           {preview ? (
// // // //             <div className="relative">
// // // //               <img src={preview} alt="Preview" className="max-h-96 mx-auto rounded-lg" />
// // // //               <button 
// // // //                 type="button"
// // // //                 onClick={() => { setPreview(null); }}
// // // //                 className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
// // // //               >
// // // //                 <X size={20} />
// // // //               </button>
// // // //             </div>
// // // //           ) : (
// // // //             <>
// // // //               <input 
// // // //                 {...register('image', { required: "Gambar wajib diisi" })}
// // // //                 type="file" 
// // // //                 accept="image/*"
// // // //                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
// // // //               />
// // // //               <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
// // // //               <p className="mt-2 text-sm text-gray-600">Klik untuk upload foto (Max 5MB)</p>
// // // //             </>
// // // //           )}
// // // //         </div>
// // // //         {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

// // // //         {/* Caption Area */}
// // // //         <div>
// // // //           <textarea 
// // // //             {...register('caption')}
// // // //             className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
// // // //             rows={4}
// // // //             placeholder="Tulis caption menarik..."
// // // //           ></textarea>
// // // //         </div>

// // // //         <button 
// // // //           type="submit"
// // // //           disabled={createPostMutation.isPending}
// // // //           className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-400"
// // // //         >
// // // //           {createPostMutation.isPending ? 'Mengirim...' : 'Posting'}
// // // //         </button>
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // }

// // // import { useState, useEffect } from 'react';
// // // import { useForm } from 'react-hook-form';
// // // import { useMutation, useQueryClient } from '@tanstack/react-query';
// // // import { useNavigate } from 'react-router-dom';
// // // import { Image as ImageIcon, X } from 'lucide-react';
// // // import api from '../lib/axios';

// // // type CreatePostForm = {
// // //   caption: string;
// // //   image: FileList;
// // // };

// // // export default function CreatePost() {
// // //   const { register, handleSubmit, formState: { errors } } = useForm<CreatePostForm>();
// // //   const [preview, setPreview] = useState<string | null>(null);
// // //   const navigate = useNavigate();
// // //   const queryClient = useQueryClient();

// // //   // Fix: Effect hanya untuk Cleanup URL blob saat unmount atau preview diganti
// // //   useEffect(() => {
// // //     return () => {
// // //       if (preview) {
// // //         URL.revokeObjectURL(preview);
// // //       }
// // //     };
// // //   }, [preview]);

// // //   // Fix: Handler manual untuk trigger preview saat file dipilih
// // //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const files = e.target.files;
// // //     if (files && files.length > 0) {
// // //       const file = files[0];
// // //       const url = URL.createObjectURL(file);
// // //       setPreview(url);
// // //     }
// // //   };

// // //   const createPostMutation = useMutation({
// // //     mutationFn: async (data: CreatePostForm) => {
// // //       const formData = new FormData();
// // //       formData.append('caption', data.caption);
// // //       formData.append('image', data.image[0]); // Ambil file pertama

// // //       // Kirim ke endpoint POST /api/posts
// // //       return api.post('/api/posts', formData, {
// // //         headers: { 'Content-Type': 'multipart/form-data' },
// // //       });
// // //     },
// // //     onSuccess: () => {
// // //       queryClient.invalidateQueries({ queryKey: ['feed'] }); // Refresh feed
// // //       queryClient.invalidateQueries({ queryKey: ['my-posts'] });
// // //       navigate('/'); // Redirect ke home
// // //     },
// // //     onError: (err) => {
// // //       console.error(err);
// // //       alert("Gagal upload post. Pastikan gambar < 5MB.");
// // //     }
// // //   });

// // //   return (
// // //     <div className="p-4 md:p-8 max-w-2xl mx-auto">
// // //       <h1 className="text-2xl font-bold mb-6">Buat Post Baru</h1>
      
// // //       <form onSubmit={handleSubmit((data) => createPostMutation.mutate(data))} className="space-y-6">
// // //         {/* Image Upload Area */}
// // //         <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center relative hover:bg-gray-50 transition">
// // //           {preview ? (
// // //             <div className="relative">
// // //               <img src={preview} alt="Preview" className="max-h-96 mx-auto rounded-lg" />
// // //               <button 
// // //                 type="button"
// // //                 onClick={() => { setPreview(null); }}
// // //                 className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
// // //               >
// // //                 <X size={20} />
// // //               </button>
// // //             </div>
// // //           ) : (
// // //             <>
// // //               <input 
// // //                 type="file" 
// // //                 accept="image/*"
// // //                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
// // //                 {...register('image', { 
// // //                   required: "Gambar wajib diisi",
// // //                   onChange: handleFileChange // Trigger preview di sini
// // //                 })}
// // //               />
// // //               <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
// // //               <p className="mt-2 text-sm text-gray-600">Klik untuk upload foto (Max 5MB)</p>
// // //             </>
// // //           )}
// // //         </div>
// // //         {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

// // //         {/* Caption Area */}
// // //         <div>
// // //           <textarea 
// // //             {...register('caption')}
// // //             className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
// // //             rows={4}
// // //             placeholder="Tulis caption menarik..."
// // //           ></textarea>
// // //         </div>

// // //         <button 
// // //           type="submit"
// // //           disabled={createPostMutation.isPending}
// // //           className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-400"
// // //         >
// // //           {createPostMutation.isPending ? 'Mengirim...' : 'Posting'}
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }


// // import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// // export interface User {
// //   id: number;
// //   username: string;
// //   email: string;
// //   avatarUrl: string | null;
// //   name?: string;
// //   bio?: string | null;
// // }

// // interface AuthState {
// //   user: User | null;
// //   token: string | null;
// //   isAuthenticated: boolean;
// // }

// // const initialState: AuthState = {
// //   user: JSON.parse(localStorage.getItem('user') || 'null'),
// //   token: localStorage.getItem('token'),
// //   isAuthenticated: !!localStorage.getItem('token'),
// // };

// // const authSlice = createSlice({
// //   name: 'auth',
// //   initialState,
// //   reducers: {
// //     setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
// //       state.user = action.payload.user;
// //       state.token = action.payload.token;
// //       state.isAuthenticated = true;
// //       localStorage.setItem('user', JSON.stringify(action.payload.user));
// //       localStorage.setItem('token', action.payload.token);
// //     },
// //     logout: (state) => {
// //       state.user = null;
// //       state.token = null;
// //       state.isAuthenticated = false;
// //       localStorage.removeItem('user');
// //       localStorage.removeItem('token');
// //     },
// //   },
// // });

// // export const { setCredentials, logout } = authSlice.actions;
// // export default authSlice.reducer;


// import { useState, useEffect } from 'react';
// import { useForm, useWatch } from 'react-hook-form';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
// import { Image as ImageIcon, X } from 'lucide-react';
// import api from '../lib/axios';

// type CreatePostForm = {
//   caption: string;
//   image: FileList;
// };

// export default function CreatePost() {
//   const { register, handleSubmit, control, formState: { errors } } = useForm<CreatePostForm>();
//   const [preview, setPreview] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   // Memantau perubahan input file
//   const imageFile = useWatch({
//     control,
//     name: 'image',
//   });

//   // Effect untuk preview gambar
//   useEffect(() => {
//     if (imageFile && imageFile.length > 0) {
//       const file = imageFile[0];
//       const url = URL.createObjectURL(file);
//       setPreview(url);

//       // Cleanup untuk mencegah memory leak
//       return () => URL.revokeObjectURL(url);
//     } else {
//       setPreview(null);
//     }
//   }, [imageFile]);

//   const createPostMutation = useMutation({
//     mutationFn: async (data: CreatePostForm) => {
//       const formData = new FormData();
//       formData.append('caption', data.caption);
//       formData.append('image', data.image[0]);

//       return api.post('/api/posts', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['feed'] });
//       queryClient.invalidateQueries({ queryKey: ['my-posts'] });
//       navigate('/'); 
//     },
//     onError: (err) => {
//       console.error(err);
//       alert("Gagal upload post. Pastikan gambar < 5MB.");
//     }
//   });

//   return (
//     <div className="p-4 md:p-8 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Buat Post Baru</h1>
      
//       <form onSubmit={handleSubmit((data) => createPostMutation.mutate(data))} className="space-y-6">
//         {/* Area Upload Gambar */}
//         <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center relative hover:bg-gray-50 transition">
//           {preview ? (
//             <div className="relative">
//               <img src={preview} alt="Preview" className="max-h-96 mx-auto rounded-lg" />
//               <button 
//                 type="button"
//                 onClick={() => { 
//                   // Reset preview (opsional, perlu reset form value juga idealnya)
//                   setPreview(null); 
//                 }}
//                 className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//           ) : (
//             <>
//               <input 
//                 {...register('image', { required: "Gambar wajib diisi" })}
//                 type="file" 
//                 accept="image/*"
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               />
//               <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
//               <p className="mt-2 text-sm text-gray-600">Klik untuk upload foto (Max 5MB)</p>
//             </>
//           )}
//         </div>
//         {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

//         {/* Caption */}
//         <div>
//           <textarea 
//             {...register('caption')}
//             className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
//             rows={4}
//             placeholder="Tulis caption menarik..."
//           ></textarea>
//         </div>

//         <button 
//           type="submit"
//           disabled={createPostMutation.isPending}
//           className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-400"
//         >
//           {createPostMutation.isPending ? 'Mengirim...' : 'Posting'}
//         </button>
//       </form>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
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
  const { register, handleSubmit, formState: { errors }, resetField } = useForm<CreatePostForm>();
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Effect hanya untuk Cleanup URL blob saat unmount atau preview berubah
  useEffect(() => {
    return () => {
      if (preview) {
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
      alert("Gagal upload post. Pastikan gambar < 5MB.");
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
                onClick={() => { 
                  setPreview(null);
                  resetField('image'); // Reset value di React Hook Form juga
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <>
              <input 
                type="file" 
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                {...register('image', { 
                  required: "Gambar wajib diisi",
                  onChange: handleFileChange // Panggil handler saat file dipilih
                })}
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