

// // import { useForm } from 'react-hook-form';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { z } from 'zod';
// // import api from '../lib/axios';
// // import { useNavigate, Link } from 'react-router-dom';
// // import { AxiosError } from 'axios';

// // // Schema Validasi
// // const registerSchema = z.object({
// //   name: z.string().min(3, "Nama minimal 3 karakter"),
// //   username: z.string().min(3, "Username minimal 3 karakter"),
// //   email: z.string().email("Email tidak valid"),
// //   password: z.string().min(6, "Password minimal 6 karakter"),
// //   phone: z.string().optional(),
// // });

// // type RegisterForm = z.infer<typeof registerSchema>;

// // export default function Register() {
// //   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
// //     resolver: zodResolver(registerSchema),
// //   });
// //   const navigate = useNavigate();

// //   const onSubmit = async (data: RegisterForm) => {
// //     try {
// //       await api.post('/api/auth/register', data);
// //       alert("Registrasi berhasil! Silakan login.");
// //       navigate('/login');
// //     } catch (error) {
// //       // Fix: Casting error ke AxiosError agar type-safe
// //       const err = error as AxiosError<{ message: string }>;
// //       alert(err.response?.data?.message || "Registrasi gagal.");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
// //       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
// //         <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Daftar Sociality</h2>
        
// //         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium">Nama Lengkap</label>
// //             <input {...register('name')} className="w-full p-2 border rounded-md" />
// //             {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium">Username</label>
// //             <input {...register('username')} className="w-full p-2 border rounded-md" />
// //             {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium">Email</label>
// //             <input type="email" {...register('email')} className="w-full p-2 border rounded-md" />
// //             {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium">Password</label>
// //             <input type="password" {...register('password')} className="w-full p-2 border rounded-md" />
// //             {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
// //           </div>

// //           <button 
// //             type="submit" 
// //             disabled={isSubmitting}
// //             className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 font-bold mt-4 disabled:bg-gray-400"
// //           >
// //             {isSubmitting ? 'Mendaftar...' : 'Daftar Sekarang'}
// //           </button>
// //         </form>
        
// //         <p className="mt-4 text-center text-sm">
// //           Sudah punya akun? <Link to="/login" className="text-blue-600 font-bold">Login</Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }


// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import api from '../lib/axios';
// import { useNavigate, Link } from 'react-router-dom';
// import { AxiosError } from 'axios';
// import { Eye, EyeOff } from 'lucide-react';

// // Schema Validasi
// const registerSchema = z.object({
//   name: z.string().min(3, "Nama minimal 3 karakter"),
//   username: z.string().min(3, "Username minimal 3 karakter"),
//   email: z.string().email("Email tidak valid"),
//   password: z.string().min(6, "Password minimal 6 karakter"),
//   phone: z.string().optional(),
// });

// type RegisterForm = z.infer<typeof registerSchema>;

// export default function Register() {
//   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
//     resolver: zodResolver(registerSchema),
//   });
//   const navigate = useNavigate();
  
//   // State untuk toggle password
//   const [showPassword, setShowPassword] = useState(false);

//   const onSubmit = async (data: RegisterForm) => {
//     try {
//       await api.post('/api/auth/register', data);
//       alert("Registrasi berhasil! Silakan login.");
//       navigate('/login');
//     } catch (error) {
//       const err = error as AxiosError<{ message: string }>;
//       alert(err.response?.data?.message || "Registrasi gagal.");
//     }
//   };

//   return (
//     // Main Container
//     <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
      
//       {/* BACKGROUND LAYERS */}
//       <div 
//         className="absolute bottom-0 left-0 right-0 h-[80%] w-full z-0 pointer-events-none"
//         style={{
//           background: 'linear-gradient(270deg, #5613A3 38.99%, #522BC8 77.96%)',
//           filter: 'blur(300px)',
//           transform: 'translateY(20%) scale(1.2)',
//           opacity: 0.8
//         }}
//       />
//       <div 
//         className="absolute top-0 left-0 right-0 h-full z-0 pointer-events-none"
//         style={{
//           background: 'linear-gradient(180deg, #000000 20%, transparent 100%)'
//         }}
//       />

//       {/* CARD REGISTER */}
//       <div 
//         className="w-full max-w-[446px] flex flex-col bg-[#00000033] border border-[#181D27] backdrop-blur-[40px] rounded-2xl relative z-10"
//         style={{
//             boxShadow: '0px 32px 40px -12px #00000040',
//             padding: '40px 24px',
//             gap: '24px'
//         }}
//       >
//         {/* Logo & Header */}
//         <div className="flex flex-col items-center gap-2">
//           <div className="flex items-center gap-2">
//             <img 
//                 src="/logo_sociality.png" 
//                 alt="Logo" 
//                 className="w-8 h-8 object-contain"
//                 onError={(e) => { e.currentTarget.style.display = 'none'; }}
//             />
//             <h1 className="text-[#FDFDFD] font-bold text-2xl tracking-tight">
//               Sociality
//             </h1>
//           </div>

//           <h2 className="text-[#FDFDFD] font-bold text-3xl text-center mt-2">
//             Register
//           </h2>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            

//             {/* Email Input */}
//             <div className="flex flex-col gap-2">
//                 <label className="text-[#FDFDFD] font-bold text-sm leading-5">
//                     Email
//                 </label>
//                 <input 
//                     {...register('email')} 
//                     type="email"
//                     placeholder="Enter your email"
//                     className="w-full h-[48px] bg-[#0A0D12] border border-[#181D27] rounded-xl px-4 py-2 text-[#FDFDFD] placeholder-[#535862] text-base focus:outline-none focus:border-[#6936F2] transition-colors"
//                 />
//                 {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
//             </div>



//             {/* Name Input */}
//             <div className="flex flex-col gap-2">
//                 <label className="text-[#FDFDFD] font-bold text-sm leading-5">
//                     Name
//                 </label>
//                 <input 
//                     {...register('name')} 
//                     type="text"
//                     placeholder="Enter your name"
//                     className="w-full h-[48px] bg-[#0A0D12] border border-[#181D27] rounded-xl px-4 py-2 text-[#FDFDFD] placeholder-[#535862] text-base focus:outline-none focus:border-[#6936F2] transition-colors"
//                 />
//                 {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
//             </div>

//             {/* Username Input */}
//             <div className="flex flex-col gap-2">
//                 <label className="text-[#FDFDFD] font-bold text-sm leading-5">
//                     Username
//                 </label>
//                 <input 
//                     {...register('username')} 
//                     type="text"
//                     placeholder="Choose a username"
//                     className="w-full h-[48px] bg-[#0A0D12] border border-[#181D27] rounded-xl px-4 py-2 text-[#FDFDFD] placeholder-[#535862] text-base focus:outline-none focus:border-[#6936F2] transition-colors"
//                 />
//                 {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
//             </div>

            

//             {/* Password Input */}
//             <div className="flex flex-col gap-2">
//                 <label className="text-[#FDFDFD] font-bold text-sm leading-5">
//                     Password
//                 </label>
//                 <div className="relative">
//                   <input 
//                       type={showPassword ? "text" : "password"}
//                       {...register('password')} 
//                       placeholder="Create a password"
//                       className="w-full h-[48px] bg-[#0A0D12] border border-[#181D27] rounded-xl pl-4 pr-12 py-2 text-[#FDFDFD] placeholder-[#535862] text-base focus:outline-none focus:border-[#6936F2] transition-colors"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#535862] hover:text-[#FDFDFD] transition-colors cursor-pointer"
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//                 {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
//             </div>

//             {/* Register Button */}
//             <button 
//                 type="submit" 
//                 disabled={isSubmitting}
//                 className="w-full h-[48px] bg-[#6936F2] text-[#FDFDFD] font-bold text-base rounded-full hover:bg-[#5b2ed1] transition-colors disabled:opacity-50 flex items-center justify-center mt-2 cursor-pointer border-none"
//             >
//                 {isSubmitting ? 'Creating account...' : 'Register'}
//             </button>
//         </form>

//         {/* Footer Link */}
//         <div className="text-center text-sm">
//             <span className="text-[#FDFDFD]">Already have an account? </span>
//             <Link to="/login" className="text-[#7F51F9] font-semibold hover:underline">
//                 Login
//             </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../lib/axios';
import { useNavigate, Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Eye, EyeOff } from 'lucide-react';

// Schema Validasi
const registerSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"), // Masih perlu 'name' karena API membutuhkannya
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(10, "Nomor telepon minimal 10 digit").optional().or(z.literal('')),
  password: z.string().min(6, "Password minimal 6 karakter"),
  confirmPassword: z.string().min(6, "Konfirmasi password minimal 6 karakter"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();
  
  // State untuk toggle password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: RegisterForm) => {
    // Hapus confirmPassword sebelum kirim ke API karena API tidak membutuhkannya
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...apiData } = data;
    
    try {
      await api.post('/api/auth/register', apiData);
      alert("Registrasi berhasil! Silakan login.");
      navigate('/login');
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      alert(err.response?.data?.message || "Registrasi gagal.");
    }
  };

  return (
    // Main Container
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
      
      {/* BACKGROUND LAYERS */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[80%] w-full z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(270deg, #5613A3 38.99%, #522BC8 77.96%)',
          filter: 'blur(300px)',
          transform: 'translateY(20%) scale(1.2)',
          opacity: 0.8
        }}
      />
      <div 
        className="absolute top-0 left-0 right-0 h-full z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #000000 20%, transparent 100%)'
        }}
      />

      {/* CARD REGISTER */}
      <div 
        className="w-full max-w-[446px] flex flex-col bg-[#00000033] border border-[#181D27] backdrop-blur-2xl rounded-2xl relative z-10"
        style={{
            boxShadow: '0px 32px 40px -12px #00000040',
            padding: '40px 24px',
            gap: '24px'
        }}
      >
        {/* Logo & Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <img 
                src="/logo_sociality.png" 
                alt="Logo" 
                className="w-8 h-8 object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <h1 className="text-[#FDFDFD] font-bold text-2xl tracking-tight">
              Sociality
            </h1>
          </div>

          <h2 className="text-[#FDFDFD] font-bold text-3xl text-center mt-2">
            Register
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            
            {/* Perlu input Name (hidden atau visible) karena API wajib kirim 'name' */}
            {/* Jika desain tidak menampilkan input name, kita bisa gabung atau minta user isi.
                Asumsi: tetap ditampilkan agar validasi API terpenuhi */}
            <div className="flex flex-col gap-2">
                <label className="text-[#FDFDFD] font-bold text-sm leading-5">
                    Full Name
                </label>
                <input 
                    {...register('name')} 
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full h-12 bg-[#0A0D12] border border-[#181D27] rounded-xl px-4 py-2 text-[#FDFDFD] placeholder-[#535862] text-base focus:outline-none focus:border-[#6936F2] transition-colors"
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            {/* 1. Email Input */}
            <div className="flex flex-col gap-2">
                <label className="text-[#FDFDFD] font-bold text-sm leading-5">
                    Email
                </label>
                <input 
                    {...register('email')} 
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-12 bg-[#0A0D12] border border-[#181D27] rounded-xl px-4 py-2 text-[#FDFDFD] placeholder-[#535862] text-base focus:outline-none focus:border-[#6936F2] transition-colors"
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            {/* 2. Username Input */}
            <div className="flex flex-col gap-2">
                <label className="text-[#FDFDFD] font-bold text-sm leading-5">
                    Username
                </label>
                <input 
                    {...register('username')} 
                    type="text"
                    placeholder="Enter your username"
                    className="w-full h-12 bg-[#0A0D12] border border-[#181D27] rounded-xl px-4 py-2 text-[#FDFDFD] placeholder-[#535862] text-base focus:outline-none focus:border-[#6936F2] transition-colors"
                />
                {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
            </div>

            {/* 3. Phone Number Input */}
            <div className="flex flex-col gap-2">
                <label className="text-[#FDFDFD] font-bold text-sm leading-5">
                    Phone Number
                </label>
                <input 
                    {...register('phone')} 
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full h-12 bg-[#0A0D12] border border-[#181D27] rounded-xl px-4 py-2 text-[#FDFDFD] placeholder-[#535862] text-base focus:outline-none focus:border-[#6936F2] transition-colors"
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
            </div>

            {/* 4. Password Input */}
            <div className="flex flex-col gap-2">
                <label className="text-[#FDFDFD] font-bold text-sm leading-5">
                    Password
                </label>
                <div className="relative">
                  <input 
                      type={showPassword ? "text" : "password"}
                      {...register('password')} 
                      placeholder="Enter your password"
                      className="w-full h-12 bg-[#0A0D12] border border-[#181D27] rounded-xl pl-4 pr-12 py-2 text-[#FDFDFD] placeholder-[#535862] text-base focus:outline-none focus:border-[#6936F2] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#535862] hover:text-[#FDFDFD] transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            {/* 5. Confirm Password Input */}
            <div className="flex flex-col gap-2">
                <label className="text-[#FDFDFD] font-bold text-sm leading-5">
                    Confirm Password
                </label>
                <div className="relative">
                  <input 
                      type={showConfirmPassword ? "text" : "password"}
                      {...register('confirmPassword')} 
                      placeholder="Enter your confirmed password"
                      className="w-full h-12 bg-[#0A0D12] border border-[#181D27] rounded-xl pl-4 pr-12 py-2 text-[#FDFDFD] placeholder-[#535862] text-base focus:outline-none focus:border-[#6936F2] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#535862] hover:text-[#FDFDFD] transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
            </div>

            {/* Register Button */}
            <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-12 bg-[#6936F2] text-[#FDFDFD] font-bold text-base rounded-full hover:bg-[#5b2ed1] transition-colors disabled:opacity-50 flex items-center justify-center mt-4 cursor-pointer border-none"
            >
                {isSubmitting ? 'Creating account...' : 'Register'}
            </button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-sm">
            <span className="text-[#FDFDFD]">Already have an account? </span>
            <Link to="/login" className="text-[#7F51F9] font-semibold hover:underline">
                Login
            </Link>
        </div>
      </div>
    </div>
  );
}