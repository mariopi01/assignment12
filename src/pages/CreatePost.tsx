
// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
// import { Image as ImageIcon, X } from 'lucide-react';
// import api from '../lib/axios';

// type CreatePostForm = {
//   caption: string;
//   image: FileList;
// };

// export default function CreatePost() {
//   const { register, handleSubmit, formState: { errors }, resetField } = useForm<CreatePostForm>();
//   const [preview, setPreview] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   // Effect hanya untuk Cleanup URL blob saat unmount atau preview berubah
//   useEffect(() => {
//     return () => {
//       if (preview) {
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

//   const createPostMutation = useMutation({
//     mutationFn: async (data: CreatePostForm) => {
//       const formData = new FormData();
//       formData.append('caption', data.caption);
//       formData.append('image', data.image[0]); // Ambil file pertama

//       // Kirim ke endpoint POST /api/posts
//       return api.post('/api/posts', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['feed'] }); // Refresh feed
//       queryClient.invalidateQueries({ queryKey: ['my-posts'] });
//       navigate('/'); // Redirect ke home
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
//         {/* Image Upload Area */}
//         <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center relative hover:bg-gray-50 transition">
//           {preview ? (
//             <div className="relative">
//               <img src={preview} alt="Preview" className="max-h-96 mx-auto rounded-lg" />
//               <button 
//                 type="button"
//                 onClick={() => { 
//                   setPreview(null);
//                   resetField('image'); // Reset value di React Hook Form juga
//                 }}
//                 className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//           ) : (
//             <>
//               <input 
//                 type="file" 
//                 accept="image/*"
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                 {...register('image', { 
//                   required: "Gambar wajib diisi",
//                   onChange: handleFileChange // Panggil handler saat file dipilih
//                 })}
//               />
//               <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
//               <p className="mt-2 text-sm text-gray-600">Klik untuk upload foto (Max 5MB)</p>
//             </>
//           )}
//         </div>
//         {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

//         {/* Caption Area */}
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
import { X } from 'lucide-react';
import api from '../lib/axios';
import Header from '../components/Header';

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
      formData.append('image', data.image[0]); 

      // Kirim ke endpoint POST /api/posts
      return api.post('/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] }); 
      queryClient.invalidateQueries({ queryKey: ['my-posts'] });
      navigate('/'); 
    },
    onError: (err) => {
      console.error(err);
      alert("Gagal upload post. Pastikan gambar < 5MB.");
    }
  });

  return (
    <div className="min-h-screen bg-[#242424]">
      <Header />

      {/* CONTAINER UTAMA */}
      <div 
        className="flex flex-col mx-auto"
        style={{
            width: '452px',
            marginTop: '40px', // top 120px - header 80px
            gap: '24px'
        }}
      >
        {/* BARIS 1: Arrow Left + Title */}
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="hover:opacity-80 transition-opacity">
                <img src="/Arrow_left.png" alt="Back" className="w-8 h-8 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
            </button>
            <h1 className="text-[#FDFDFD] font-bold text-2xl font-display tracking-tight">
                Add Post
            </h1>
        </div>

        <form onSubmit={handleSubmit((data) => createPostMutation.mutate(data))} className="flex flex-col gap-6">
            
            {/* BARIS 2: Label Photo */}
            <div className="flex flex-col gap-2">
                <label className="text-[#FDFDFD] font-bold text-sm leading-5">
                    Photo
                </label>
                
                {/* BARIS 3: Upload Container */}
                <div 
                    className="relative w-full h-36 bg-[#0A0D12] border border-[#181D27] border-dashed rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#11141A] transition-colors overflow-hidden"
                >
                    {preview ? (
                        <div className="relative w-full h-full">
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            <button 
                                type="button"
                                onClick={() => { 
                                    setPreview(null);
                                    resetField('image'); 
                                }}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <input 
                                type="file" 
                                accept="image/png, image/jpeg"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                {...register('image', { 
                                    required: "Gambar wajib diisi",
                                    onChange: handleFileChange 
                                })}
                            />
                            <img src="/Upload_icon.png" alt="Upload" className="w-10 h-10 object-contain mb-1" onError={(e) => e.currentTarget.style.display = 'none'} />
                            
                            <div className="text-center text-sm font-semibold">
                                <span className="text-[#7F51F9]">Click to upload</span>
                                <span className="text-[#535862]"> or drag and drop</span>
                            </div>
                            
                            <p className="text-[#535862] text-xs font-semibold text-center">
                                PNG or JPG (max. 5mb)
                            </p>
                        </>
                    )}
                </div>
                {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
            </div>

            {/* BARIS 4 & 5: Caption */}
            <div className="flex flex-col gap-2">
                <label className="text-[#FDFDFD] font-bold text-sm leading-5">
                    Caption
                </label>
                <textarea 
                    {...register('caption')}
                    className="w-full h-[101px] bg-[#0A0D12] border border-[#181D27] rounded-xl px-4 py-2 text-[#FDFDFD] placeholder-[#535862] text-base font-normal resize-none focus:outline-none focus:border-[#6936F2] transition-colors"
                    placeholder="Create your caption"
                ></textarea>
            </div>

            {/* BARIS 6: Share Button */}
            <button 
                type="submit"
                disabled={createPostMutation.isPending}
                className="w-full h-12 bg-[#6936F2] text-[#FDFDFD] font-bold text-base rounded-full hover:bg-[#5b2ed1] transition-colors disabled:opacity-50 flex items-center justify-center"
            >
                {createPostMutation.isPending ? 'Sharing...' : 'Share'}
            </button>

        </form>
      </div>
    </div>
  );
}