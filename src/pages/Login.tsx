
import { useState } from 'react'; 
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../lib/axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Eye, EyeOff } from 'lucide-react'; 

// Schema Validasi
const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  State untuk visibility password
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post('/api/auth/login', data);
      const { user, token } = res.data.data;
      
      dispatch(setCredentials({ user, token }));
      navigate('/');
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      alert(err.response?.data?.message || "Login Failed: Cek email/password");
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

      {/* CARD LOGIN (Content) */}
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
            Welcome Back!
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            {/* Email Input */}
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

            {/* Password Input Section (UPDATED) */}
            <div className="flex flex-col gap-2">
                <label className="text-[#FDFDFD] font-bold text-sm leading-5">
                    Password
                </label>
                {/*  Wrapper Relative untuk menampung input dan icon */}
                <div className="relative">
                  <input 
                      // Tipe dinamis berdasarkan state showPassword
                      type={showPassword ? "text" : "password"}
                      {...register('password')} 
                      placeholder="Enter your password"
                      // Ubah padding-x (px-4) menjadi pl-4 dan pr-12 agar teks tidak menabrak icon
                      className="w-full h-12 bg-[#0A0D12] border border-[#181D27] rounded-xl pl-4 pr-12 py-2 text-[#FDFDFD] placeholder-[#535862] text-base focus:outline-none focus:border-[#6936F2] transition-colors"
                  />
                  
                  {/* Tombol Icon Toggle */}
                  <button
                    type="button" // Penting: prevent form submission
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#535862] hover:text-[#FDFDFD] transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            {/* Login Button */}
            <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-12 bg-[#6936F2] text-[#FDFDFD] font-bold text-base rounded-full hover:bg-[#5b2ed1] transition-colors disabled:opacity-50 flex items-center justify-center mt-2 cursor-pointer border-none"
            >
                {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-sm">
            <span className="text-[#FDFDFD]">Don't have an account? </span>
            <Link to="/register" className="text-[#7F51F9] font-semibold hover:underline">
                Register
            </Link>
        </div>
      </div>
    </div>
  );
}