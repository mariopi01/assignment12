// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import api from '../lib/axios';
// import { useNavigate, Link } from 'react-router-dom';

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

//   const onSubmit = async (data: RegisterForm) => {
//     try {
//       await api.post('/api/auth/register', data); // 
//       alert("Registrasi berhasil! Silakan login.");
//       navigate('/login');
//     } catch (error: any) {
//       alert(error.response?.data?.message || "Registrasi gagal.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Daftar Sociality</h2>
        
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium">Nama Lengkap</label>
//             <input {...register('name')} className="w-full p-2 border rounded-md" />
//             {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Username</label>
//             <input {...register('username')} className="w-full p-2 border rounded-md" />
//             {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Email</label>
//             <input type="email" {...register('email')} className="w-full p-2 border rounded-md" />
//             {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Password</label>
//             <input type="password" {...register('password')} className="w-full p-2 border rounded-md" />
//             {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
//           </div>

//           <button 
//             type="submit" 
//             disabled={isSubmitting}
//             className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 font-bold mt-4 disabled:bg-gray-400"
//           >
//             {isSubmitting ? 'Mendaftar...' : 'Daftar Sekarang'}
//           </button>
//         </form>
        
//         <p className="mt-4 text-center text-sm">
//           Sudah punya akun? <Link to="/login" className="text-blue-600 font-bold">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// }



import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../lib/axios';
import { useNavigate, Link } from 'react-router-dom';
import { AxiosError } from 'axios';

// Schema Validasi
const registerSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  phone: z.string().optional(),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await api.post('/api/auth/register', data);
      alert("Registrasi berhasil! Silakan login.");
      navigate('/login');
    } catch (error) {
      // Fix: Casting error ke AxiosError agar type-safe
      const err = error as AxiosError<{ message: string }>;
      alert(err.response?.data?.message || "Registrasi gagal.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Daftar Sociality</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nama Lengkap</label>
            <input {...register('name')} className="w-full p-2 border rounded-md" />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Username</label>
            <input {...register('username')} className="w-full p-2 border rounded-md" />
            {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" {...register('email')} className="w-full p-2 border rounded-md" />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input type="password" {...register('password')} className="w-full p-2 border rounded-md" />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 font-bold mt-4 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Mendaftar...' : 'Daftar Sekarang'}
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm">
          Sudah punya akun? <Link to="/login" className="text-blue-600 font-bold">Login</Link>
        </p>
      </div>
    </div>
  );
}