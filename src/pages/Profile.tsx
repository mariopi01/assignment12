
// import { useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { useSelector } from 'react-redux';
// import api from '../lib/axios';
// import EditProfileModal from '../components/EditProfileModal';
// import Header from '../components/Header';
// import type { RootState } from '../store';

// // --- Interfaces ---
// interface ProfileData {
//   id: number;
//   name: string;
//   username: string;
//   bio: string;
//   avatarUrl: string | null;
//   email: string;
//   phone: string;
//   counts: {
//     post: number;
//     followers: number;
//     following: number;
//     likes: number;
//   };
//   isFollowing: boolean;
//   isMe: boolean;
// }

// interface PostGridItem {
//   id: number;
//   imageUrl: string;
//   likeCount: number;
//   commentCount: number;
// }

// export default function Profile() {
//   const { username } = useParams();
//   const navigate = useNavigate();
  
//   // State untuk Tab & Modal
//   // activeTab bisa 'gallery' | 'saved' | 'liked'
//   const [activeTab, setActiveTab] = useState<'gallery' | 'saved' | 'liked'>('gallery');
//   const [isEditModalOpen, setEditModalOpen] = useState(false);

//   // Ambil user login dari Redux untuk fallback cek 'isMe'
//   const { user: authUser } = useSelector((state: RootState) => state.auth);

//   // 1. Fetch Profile Data
//   const { data: profile, isLoading: isLoadingProfile } = useQuery<ProfileData>({
//     queryKey: ['profile', username || 'me'],
//     queryFn: async () => {
//       const targetUsername = username || authUser?.username;
//       if (!targetUsername) throw new Error("No username found");

//       const res = await api.get(`/api/users/${targetUsername}`);
//       return res.data.data;
//     },
//     enabled: !!(username || authUser?.username),
//   });

//   // 2. Fetch Posts / Saved / Liked Data
//   const { data: postsData, isLoading: isLoadingPosts } = useQuery({
//     queryKey: ['profile-posts', profile?.username, activeTab],
//     queryFn: async () => {
//       if (!profile?.username) return [];
      
//       let endpoint = '';
//       if (activeTab === 'gallery') {
//         endpoint = `/api/users/${profile.username}/posts`;
//       } else if (activeTab === 'saved') {
//         endpoint = '/api/me/saved';
//       } else if (activeTab === 'liked') {
//         // Endpoint liked posts user lain
//         endpoint = `/api/users/${profile.username}/likes`;
//       }

//       try {
//         const res = await api.get(endpoint + '?limit=20');
//         return (res.data.data.items || res.data.data.posts || []) as PostGridItem[];
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       } catch (err) {
//         return [];
//       }
//     },
//     enabled: !!profile, 
//   });

//   if (isLoadingProfile) return <div className="min-h-screen bg-[#242424] flex items-center justify-center text-[#A4A7AE]">Loading Profile...</div>;
//   if (!profile) return <div className="min-h-screen bg-[#242424] flex items-center justify-center text-[#A4A7AE]">User not found.</div>;

//   const isMe = profile.isMe || (authUser?.username === profile.username);

//   return (
//     <div className="min-h-screen bg-[#000000] pb-32">
//       <Header />

//       {/* Container Utama Profile */}
//       <div 
//         className="relative flex flex-col mx-auto"
//         style={{
//             width: '100%',
//             maxWidth: '812px',
//             marginTop: '40px',
//             gap: '16px'
//         }}
//       >
//         {/* BARIS 1: Avatar + Info + Tombol Aksi */}
//         <div className="flex justify-between items-start px-4 md:px-0">
//             <div className="flex items-center gap-4">
//                 <img 
//                     src={profile.avatarUrl || `https://ui-avatars.com/api/?name=${profile.username}&background=random`} 
//                     alt={profile.username} 
//                     className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-[#181D27]"
//                 />
//                 <div className="flex flex-col">
//                     <h1 className="text-[#FDFDFD]  text-md md:text-xl tracking-tight ">
//                         {profile.name}
//                     </h1>
//                     <p className="text-[#A4A7AE] text-base">@{profile.username}</p>
//                 </div>
//             </div>

//             {isMe && (
//                 <div className="flex items-center gap-4">
//                     <button 
//                         onClick={() => setEditModalOpen(true)}
//                         className="w-[130px] h-12 rounded-full border border-[#181D27] text-white font-bold text-sm hover:bg-[#181D27] transition-colors"
//                     >
//                         Edit Profile
//                     </button>
//                     <button className="w-12 h-12 rounded-full border border-[#181D27] flex items-center justify-center hover:bg-[#181D27] transition-colors">
//                         <img 
//                             src="/Share_icon.png" 
//                             alt="Share" 
//                             className="w-6 h-6 object-contain" 
//                             onError={(e) => e.currentTarget.style.display = 'none'} 
//                         />
//                     </button>
//                 </div>
//             )}
//         </div>

//         {/* BARIS 2: Bio */}
//         <div className="px-4 md:px-0">
//             <p className="text-[#FDFDFD] text-md font-normal leading-6 tracking-tight whitespace-pre-wrap">
//                 {profile.bio || "No bio yet."}
//             </p>
//         </div>

//         {/* BARIS 3: Statistik (Merata 4 Kolom) */}
//         <div className="grid grid-cols-4 w-full px-4 md:px-0 text-[#FDFDFD] text-sm md:text-base divide-x divide-[#181D27]">
//             <div className="flex flex-col items-center justify-center gap-1">
//                 <span className="font-bold text-lg">{profile.counts?.post || 0}</span>
//                 <span className="text-[#A4A7AE]">post</span>
//             </div>
//             <Link to={`/users/${profile.username}/followers`} className="flex flex-col items-center justify-center gap-1 hover:underline">
//                 <span className="font-bold text-lg">{profile.counts?.followers || 0}</span>
//                 <span className="text-[#A4A7AE]">followers</span>
//             </Link>
//             <Link to={`/users/${profile.username}/following`} className="flex flex-col items-center justify-center gap-1 hover:underline">
//                 <span className="font-bold text-lg">{profile.counts?.following || 0}</span>
//                 <span className="text-[#A4A7AE]">following</span>
//             </Link>
//             <div className="flex flex-col items-center justify-center gap-1">
//                 <span className="font-bold text-lg">{profile.counts?.likes || 0}</span>
//                 <span className="text-[#A4A7AE]">likes</span>
//             </div>
//         </div>

//         {/* BARIS 4: Tabs (Gallery | Saved/Liked) - Merata 2 Kolom */}
//         <div className="flex w-full mt-4 border-b border-[#181D27]">
//             <button 
//                 onClick={() => setActiveTab('gallery')}
//                 className={`flex-1 flex items-center justify-center gap-2 pb-4 transition-colors ${
//                     activeTab === 'gallery' 
//                     ? 'border-b-2 border-[#FDFDFD] text-[#FDFDFD]' 
//                     : 'text-[#A4A7AE] hover:text-[#FDFDFD]'
//                 }`}
//             >
//                 <img 
//                     src="/Gallery_icon.png" 
//                     alt="Gallery" 
//                     className={`w-5 h-5 ${activeTab === 'gallery' ? 'opacity-100' : 'opacity-50'}`} 
//                 />
//                 <span className="font-bold text-md">Gallery</span>
//             </button>

//             {isMe ? (
//                 <button 
//                     onClick={() => setActiveTab('saved')}
//                     className={`flex-1 flex items-center justify-center gap-2 pb-4 transition-colors ${
//                         activeTab === 'saved' 
//                         ? 'border-b-2 border-[#FDFDFD] text-[#FDFDFD]' 
//                         : 'text-[#A4A7AE] hover:text-[#FDFDFD]'
//                     }`}
//                 >
//                     <img 
//                         src={activeTab === 'saved' ? "/Saved_white.png" : "/Save_icon.png"} 
//                         alt="Saved" 
//                         className={`w-5 h-5 ${activeTab === 'saved' ? 'opacity-100' : 'opacity-50'}`} 
//                     />
//                     <span className="font-bold text-md">Saved</span>
//                 </button>
//             ) : (
//                 <button 
//                     onClick={() => setActiveTab('liked')}
//                     className={`flex-1 flex items-center justify-center gap-2 pb-4 transition-colors ${
//                         activeTab === 'liked' 
//                         ? 'border-b-2 border-[#FDFDFD] text-[#FDFDFD]' 
//                         : 'text-[#A4A7AE] hover:text-[#FDFDFD]'
//                     }`}
//                 >
//                     <img 
//                         src={activeTab === 'liked' ? "/heart_white.png" : "/heart.png"} 
//                         alt="Liked" 
//                         className={`w-5 h-5 ${activeTab === 'liked' ? 'opacity-100' : 'opacity-50'}`} 
//                     />
//                     <span className="font-bold text-md">Liked</span>
//                 </button>
//             )}
//         </div>

//         {/* BARIS 5: Grid Content / Empty State */}
//         <div className="min-h-[300px] w-full px-4 md:px-0 pt-4">
//             {isLoadingPosts ? (
//                 <div className="text-center text-[#A4A7AE] py-10">Loading posts...</div>
//             ) : postsData && postsData.length > 0 ? (
//                 <div className="grid grid-cols-3 gap-1 md:gap-4">
//                     {postsData.map((post: PostGridItem) => (
//                         <div 
//                             key={post.id} 
//                             className="aspect-square bg-[#0A0D12] cursor-pointer overflow-hidden rounded-md relative group"
//                             onClick={() => navigate(`/posts/${post.id}`)}
//                         >
//                             <img 
//                                 src={post.imageUrl} 
//                                 alt="Post" 
//                                 className="w-full h-full object-cover transition-transform group-hover:scale-105" 
//                             />
//                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold gap-4">
//                                 <span>❤️ {post.likeCount}</span>
//                                 <span>💬 {post.commentCount}</span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
//                     <h3 className="text-[#FDFDFD] font-bold text-lg tracking-tight">
//                         {activeTab === 'gallery' ? 'No posts yet' : 'No saved items'}
//                     </h3>
//                     <p className="text-[#A4A7AE] text-md max-w-[400px] leading-6">
//                         {activeTab === 'gallery' 
//                             ? "Share your first post and let the world see your moments, passions, and memories." 
//                             : "Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved."}
//                     </p>
//                     {isMe && activeTab === 'gallery' && (
//                         <button 
//                             onClick={() => navigate('/create')}
//                             className="w-[259px] h-12 rounded-full bg-[#6936F2] text-white font-bold text-md hover:bg-[#5b2ed1] transition-colors mt-4"
//                         >
//                             Upload My First Post
//                         </button>
//                     )}
//                 </div>
//             )}
//         </div>

//       </div>

//       {isEditModalOpen && (
//         <EditProfileModal user={profile} onClose={() => setEditModalOpen(false)} />
//       )}
//     </div>
//   );
// }


import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import api from '../lib/axios';
import EditProfileModal from '../components/EditProfileModal';
import Header from '../components/Header';
import type { RootState } from '../store';

// --- Interfaces ---
interface ProfileData {
  id: number;
  name: string;
  username: string;
  bio: string;
  avatarUrl: string | null;
  email: string;
  phone: string;
  counts: {
    post: number;
    followers: number;
    following: number;
    likes: number;
  };
  isFollowing: boolean; // Field ini digunakan untuk cek status follow
  isMe: boolean;
}

interface PostGridItem {
  id: number;
  imageUrl: string;
  likeCount: number;
  commentCount: number;
}

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [activeTab, setActiveTab] = useState<'gallery' | 'saved' | 'liked'>('gallery');
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const { user: authUser } = useSelector((state: RootState) => state.auth);

  // 1. Fetch Profile Data
  const { data: profile, isLoading: isLoadingProfile } = useQuery<ProfileData>({
    queryKey: ['profile', username || 'me'],
    queryFn: async () => {
      const targetUsername = username || authUser?.username;
      if (!targetUsername) throw new Error("No username found");

      const res = await api.get(`/api/users/${targetUsername}`);
      return res.data.data;
    },
    enabled: !!(username || authUser?.username),
  });

  // 2. Follow Mutation
  const followMutation = useMutation({
    mutationFn: async () => {
      if (!profile) return;
      if (profile.isFollowing) {
        return api.delete(`/api/follow/${profile.username}`);
      } else {
        return api.post(`/api/follow/${profile.username}`);
      }
    },
    onSuccess: () => {
      // Invalidate profile query to refresh data (followers count, isFollowing status)
      queryClient.invalidateQueries({ queryKey: ['profile', username || 'me'] });
    }
  });

  // 3. Fetch Posts / Saved / Liked Data
  const { data: postsData, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['profile-posts', profile?.username, activeTab],
    queryFn: async () => {
      if (!profile?.username) return [];
      
      let endpoint = '';
      if (activeTab === 'gallery') {
        endpoint = `/api/users/${profile.username}/posts`;
      } else if (activeTab === 'saved') {
        endpoint = '/api/me/saved';
      } else if (activeTab === 'liked') {
        endpoint = `/api/users/${profile.username}/likes`;
      }

      try {
        const res = await api.get(endpoint + '?limit=20');
        return (res.data.data.items || res.data.data.posts || []) as PostGridItem[];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        return [];
      }
    },
    enabled: !!profile, 
  });

  if (isLoadingProfile) return <div className="min-h-screen bg-[#242424] flex items-center justify-center text-[#A4A7AE]">Loading Profile...</div>;
  if (!profile) return <div className="min-h-screen bg-[#242424] flex items-center justify-center text-[#A4A7AE]">User not found.</div>;

  const isMe = profile.isMe || (authUser?.username === profile.username);

  return (
    <div className="min-h-screen bg-[#000000] pb-32">
      <Header />

      <div 
        className="relative flex flex-col mx-auto"
        style={{
            width: '100%',
            maxWidth: '812px',
            marginTop: '40px',
            gap: '16px'
        }}
      >
        {/* BARIS 1: Avatar + Info + Tombol Aksi */}
        <div className="flex justify-between items-start px-4 md:px-0">
            <div className="flex items-center gap-4">
                <img 
                    src={profile.avatarUrl || `https://ui-avatars.com/api/?name=${profile.username}&background=random`} 
                    alt={profile.username} 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-[#181D27]"
                />
                <div className="flex flex-col">
                    <h1 className="text-[#FDFDFD] font-bold text-2xl md:text-3xl font-display">
                        {profile.name}
                    </h1>
                    <p className="text-[#A4A7AE] text-base">@{profile.username}</p>
                </div>
            </div>

            {/* BUTTONS SECTION: Edit Profile OR Follow */}
            <div className="flex items-center gap-4">
                {isMe ? (
                    <button 
                        onClick={() => setEditModalOpen(true)}
                        className="w-[130px] h-12 rounded-full border border-[#181D27] text-white font-bold text-sm hover:bg-[#181D27] transition-colors"
                    >
                        Edit Profile
                    </button>
                ) : (
                    <button 
                        onClick={() => followMutation.mutate()}
                        disabled={followMutation.isPending}
                        className={`w-[120px] h-12 rounded-full font-bold text-sm transition-colors flex items-center justify-center gap-2 ${
                            profile.isFollowing 
                            ? 'bg-[#000000] border border-[#181D27] text-white hover:bg-[#181D27]' // Style untuk Unfollow (Following)
                            : 'bg-[#6936F2] text-[#FDFDFD] hover:bg-[#5b2ed1]' // Style untuk Follow (Primary)
                        }`}
                    >
                        {followMutation.isPending ? '...' : (
                            profile.isFollowing ? (
                                <>
                                    <img 
                                        src="/check-circle.png" 
                                        alt="Following" 
                                        className="w-4 h-4 object-contain" 
                                        onError={(e) => e.currentTarget.style.display = 'none'} 
                                    />
                                    Following
                                </>
                            ) : 'Follow'
                        )}
                    </button>
                )}

                <button className="w-12 h-12 rounded-full border border-[#181D27] flex items-center justify-center hover:bg-[#181D27] transition-colors">
                    <img 
                        src="/Share_icon.png" 
                        alt="Share" 
                        className="w-6 h-6 object-contain" 
                        onError={(e) => e.currentTarget.style.display = 'none'} 
                    />
                </button>
            </div>
        </div>

        {/* BARIS 2: Bio */}
        <div className="px-4 md:px-0">
            <p className="text-[#FDFDFD] text-md font-normal leading-6 tracking-tight whitespace-pre-wrap">
                {profile.bio || "No bio yet."}
            </p>
        </div>

        {/* BARIS 3: Statistik */}
        <div className="grid grid-cols-4 w-full px-4 md:px-0 text-[#FDFDFD] text-sm md:text-base divide-x divide-[#181D27]">
            <div className="flex flex-col items-center justify-center gap-1">
                <span className="font-bold text-lg">{profile.counts?.post || 0}</span>
                <span className="text-[#A4A7AE]">post</span>
            </div>
            <Link to={`/users/${profile.username}/followers`} className="flex flex-col items-center justify-center gap-1 hover:underline">
                <span className="font-bold text-lg">{profile.counts?.followers || 0}</span>
                <span className="text-[#A4A7AE]">followers</span>
            </Link>
            <Link to={`/users/${profile.username}/following`} className="flex flex-col items-center justify-center gap-1 hover:underline">
                <span className="font-bold text-lg">{profile.counts?.following || 0}</span>
                <span className="text-[#A4A7AE]">following</span>
            </Link>
            <div className="flex flex-col items-center justify-center gap-1">
                <span className="font-bold text-lg">{profile.counts?.likes || 0}</span>
                <span className="text-[#A4A7AE]">likes</span>
            </div>
        </div>

        {/* BARIS 4: Tabs */}
        <div className="flex w-full mt-4 border-b border-[#181D27]">
            <button 
                onClick={() => setActiveTab('gallery')}
                className={`flex-1 flex items-center justify-center gap-2 pb-4 transition-colors ${
                    activeTab === 'gallery' 
                    ? 'border-b-2 border-[#FDFDFD] text-[#FDFDFD]' 
                    : 'text-[#A4A7AE] hover:text-[#FDFDFD]'
                }`}
            >
                <img 
                    src="/Gallery_icon.png" 
                    alt="Gallery" 
                    className={`w-5 h-5 ${activeTab === 'gallery' ? 'opacity-100' : 'opacity-50'}`} 
                />
                <span className="font-bold text-md">Gallery</span>
            </button>

            {isMe ? (
                <button 
                    onClick={() => setActiveTab('saved')}
                    className={`flex-1 flex items-center justify-center gap-2 pb-4 transition-colors ${
                        activeTab === 'saved' 
                        ? 'border-b-2 border-[#FDFDFD] text-[#FDFDFD]' 
                        : 'text-[#A4A7AE] hover:text-[#FDFDFD]'
                    }`}
                >
                    <img 
                        src={activeTab === 'saved' ? "/Saved_white.png" : "/Save_icon.png"} 
                        alt="Saved" 
                        className={`w-5 h-5 ${activeTab === 'saved' ? 'opacity-100' : 'opacity-50'}`} 
                    />
                    <span className="font-bold text-md">Saved</span>
                </button>
            ) : (
                <button 
                    onClick={() => setActiveTab('liked')}
                    className={`flex-1 flex items-center justify-center gap-2 pb-4 transition-colors ${
                        activeTab === 'liked' 
                        ? 'border-b-2 border-[#FDFDFD] text-[#FDFDFD]' 
                        : 'text-[#A4A7AE] hover:text-[#FDFDFD]'
                    }`}
                >
                    <img 
                        src={activeTab === 'liked' ? "/heart_white.png" : "/heart.png"} 
                        alt="Liked" 
                        className={`w-5 h-5 ${activeTab === 'liked' ? 'opacity-100' : 'opacity-50'}`} 
                    />
                    <span className="font-bold text-md">Liked</span>
                </button>
            )}
        </div>

        {/* BARIS 5: Grid Content */}
        <div className="min-h-[300px] w-full px-4 md:px-0 pt-4">
            {isLoadingPosts ? (
                <div className="text-center text-[#A4A7AE] py-10">Loading posts...</div>
            ) : postsData && postsData.length > 0 ? (
                <div className="grid grid-cols-3 gap-1 md:gap-4">
                    {postsData.map((post: PostGridItem) => (
                        <div 
                            key={post.id} 
                            className="aspect-square bg-[#0A0D12] cursor-pointer overflow-hidden rounded-md relative group"
                            onClick={() => navigate(`/posts/${post.id}`)}
                        >
                            <img 
                                src={post.imageUrl} 
                                alt="Post" 
                                className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold gap-4">
                                <span>❤️ {post.likeCount}</span>
                                <span>💬 {post.commentCount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                    <h3 className="text-[#FDFDFD] font-bold text-lg tracking-tight">
                        {activeTab === 'gallery' ? 'No posts yet' : 'No items found'}
                    </h3>
                    <p className="text-[#A4A7AE] text-md max-w-[400px] leading-6">
                        {activeTab === 'gallery' 
                            ? "Share your first post and let the world see your moments, passions, and memories." 
                            : "Nothing to show here yet."}
                    </p>
                    {isMe && activeTab === 'gallery' && (
                        <button 
                            onClick={() => navigate('/create')}
                            className="w-[259px] h-12 rounded-full bg-[#6936F2] text-white font-bold text-md hover:bg-[#5b2ed1] transition-colors mt-4"
                        >
                            Upload My First Post
                        </button>
                    )}
                </div>
            )}
        </div>

      </div>

      {isEditModalOpen && (
        <EditProfileModal user={profile} onClose={() => setEditModalOpen(false)} />
      )}
    </div>
  );
}