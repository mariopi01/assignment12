
// // // import { useState, useRef, useEffect } from 'react';
// // // import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// // // import dayjs from 'dayjs';
// // // import relativeTime from 'dayjs/plugin/relativeTime';
// // // import { X } from 'lucide-react';
// // // import api from '../lib/axios';

// // // dayjs.extend(relativeTime);

// // // // --- Tipe Data ---
// // // interface Author {
// // //   id: number;
// // //   username: string;
// // //   avatarUrl: string | null;
// // //   name?: string;
// // // }

// // // interface Post {
// // //   id: number;
// // //   imageUrl: string;
// // //   caption: string;
// // //   createdAt: string;
// // //   likeCount: number;
// // //   commentCount: number;
// // //   likedByMe: boolean;
// // //   isSaved?: boolean;
// // //   author: Author;
// // // }

// // // interface Comment {
// // //   id: number;
// // //   text: string;
// // //   createdAt: string;
// // //   author: Author;
// // // }

// // // interface FeedPage {
// // //   data: {
// // //     items: Post[];
// // //   };
// // // }

// // // interface InfiniteFeedData {
// // //   pages: FeedPage[];
// // // }

// // // interface PostDetailModalProps {
// // //   post: Post;
// // //   onClose: () => void;
// // // }

// // // // Daftar 18 Emoji untuk Grid 6x3
// // // const EMOJI_LIST = [
// // //   "😀", "😃", "😄", "😁", "😆", "😅",
// // //   "😂", "🤣", "🥲", "☺️", "😊", "😇",
// // //   "🙂", "🙃", "😉", "😌", "😍", "🥰"
// // // ];

// // // export default function PostDetailModal({ post, onClose }: PostDetailModalProps) {
// // //   const queryClient = useQueryClient();
// // //   const [commentText, setCommentText] = useState('');
// // //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
// // //   const pickerRef = useRef<HTMLDivElement>(null);

// // //   // Tutup picker jika klik di luar area
// // //   useEffect(() => {
// // //     function handleClickOutside(event: MouseEvent) {
// // //       if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
// // //         setShowEmojiPicker(false);
// // //       }
// // //     }
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   // Fetch comments
// // //   const { data: commentsData } = useQuery({
// // //     queryKey: ['comments', post.id],
// // //     queryFn: async () => {
// // //       const res = await api.get(`/api/posts/${post.id}/comments?page=1&limit=10`);
// // //       return res.data.data.comments as Comment[];
// // //     },
// // //   });

// // //   // Add Comment Mutation
// // //   const addCommentMutation = useMutation({
// // //     mutationFn: async () => {
// // //       if (!commentText.trim()) return;
// // //       return api.post(`/api/posts/${post.id}/comments`, {
// // //         text: commentText
// // //       });
// // //     },
// // //     onSuccess: () => {
// // //       setCommentText('');
// // //       setShowEmojiPicker(false);
// // //       queryClient.invalidateQueries({ queryKey: ['comments', post.id] });
// // //       queryClient.invalidateQueries({ queryKey: ['feed'] });
// // //       queryClient.invalidateQueries({ queryKey: ['post', String(post.id)] });
// // //     },
// // //     onError: () => {
// // //       alert("Gagal mengirim komentar.");
// // //     }
// // //   });

// // //   // Like Mutation
// // //   const likeMutation = useMutation({
// // //     mutationFn: async () => {
// // //       if (post.likedByMe) {
// // //         return api.delete(`/api/posts/${post.id}/like`);
// // //       } else {
// // //         return api.post(`/api/posts/${post.id}/like`);
// // //       }
// // //     },
// // //     onMutate: async () => {
// // //       await queryClient.cancelQueries({ queryKey: ['feed'] });
// // //       await queryClient.cancelQueries({ queryKey: ['post', String(post.id)] });
// // //       const previousFeed = queryClient.getQueryData(['feed']);

// // //       queryClient.setQueriesData({ queryKey: ['feed'] }, (oldData: unknown) => {
// // //         if (!oldData) return oldData;
// // //         const feedData = oldData as InfiniteFeedData;
        
// // //         return {
// // //           ...feedData,
// // //           pages: feedData.pages.map((page) => ({
// // //             ...page,
// // //             data: {
// // //               ...page.data,
// // //               items: page.data.items.map((item) => {
// // //                 if (item.id === post.id) {
// // //                   return {
// // //                     ...item,
// // //                     likedByMe: !item.likedByMe,
// // //                     likeCount: item.likedByMe ? item.likeCount - 1 : item.likeCount + 1,
// // //                   };
// // //                 }
// // //                 return item;
// // //               }),
// // //             },
// // //           })),
// // //         };
// // //       });
// // //       return { previousFeed };
// // //     },
// // //     onError: (_err, _new, context) => {
// // //       if (context?.previousFeed) {
// // //         queryClient.setQueryData(['feed'], context.previousFeed);
// // //       }
// // //     },
// // //     onSettled: () => {
// // //       queryClient.invalidateQueries({ queryKey: ['feed'] });
// // //       queryClient.invalidateQueries({ queryKey: ['post', String(post.id)] });
// // //       queryClient.invalidateQueries({ queryKey: ['my-likes'] });
// // //     },
// // //   });

// // //   // Save Mutation
// // //   const saveMutation = useMutation({
// // //     mutationFn: async () => {
// // //       if (post.isSaved) {
// // //         return api.delete(`/api/posts/${post.id}/save`);
// // //       } else {
// // //         return api.post(`/api/posts/${post.id}/save`);
// // //       }
// // //     },
// // //     onMutate: async () => {
// // //       await queryClient.cancelQueries({ queryKey: ['feed'] });
// // //       const previousFeed = queryClient.getQueryData(['feed']);
      
// // //       queryClient.setQueriesData({ queryKey: ['feed'] }, (oldData: unknown) => {
// // //         if (!oldData) return oldData;
// // //         const feedData = oldData as InfiniteFeedData;

// // //         return {
// // //           ...feedData,
// // //           pages: feedData.pages.map((page) => ({
// // //             ...page,
// // //             data: {
// // //               ...page.data,
// // //               items: page.data.items.map((item) => {
// // //                 if (item.id === post.id) {
// // //                   return { ...item, isSaved: !item.isSaved };
// // //                 }
// // //                 return item;
// // //               }),
// // //             },
// // //           })),
// // //         };
// // //       });
// // //       return { previousFeed };
// // //     },
// // //     onError: (_err, _new, context) => {
// // //       if (context?.previousFeed) {
// // //         queryClient.setQueryData(['feed'], context.previousFeed);
// // //       }
// // //     },
// // //     onSettled: () => {
// // //       queryClient.invalidateQueries({ queryKey: ['feed'] });
// // //       queryClient.invalidateQueries({ queryKey: ['saved-posts'] });
// // //     },
// // //   });

// // //   // Handle Emoji Click
// // //   const handleEmojiClick = (emoji: string) => {
// // //     setCommentText((prev) => prev + emoji);
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 z-50 flex justify-center bg-black/80 backdrop-blur-sm overflow-y-auto">
// // //       <div 
// // //         className="relative bg-[#000000] border border-[#181D27] rounded-xl overflow-hidden flex my-[30px] shrink-0"
// // //         style={{ width: '1200px', height: '768px', gap: '24px' }}
// // //       >
// // //         {/* Close Button */}
// // //         <button 
// // //           onClick={onClose}
// // //           className="absolute top-4 right-4 text-[#FDFDFD] z-10 p-1 bg-black/50 rounded-full hover:bg-black/80"
// // //         >
// // //           <X size={24} />
// // //         </button>

// // //         {/* A. KOLOM KIRI: Image */}
// // //         <div className="w-[720px] h-[720px] flex items-center justify-center bg-black">
// // //           <img 
// // //             src={post.imageUrl} 
// // //             alt="Post Detail" 
// // //             className="w-full h-full object-cover"
// // //           />
// // //         </div>

// // //         {/* B. KOLOM KANAN: Comments Section */}
// // //         <div className="flex-1 flex flex-col h-full p-6">
          
// // //           {/* Header Post Owner */}
// // //           <div className="flex items-center gap-3 mb-4 border-b border-[#181D27] pb-4">
// // //             <img 
// // //               src={post.author.avatarUrl || `https://ui-avatars.com/api/?name=${post.author.username}`} 
// // //               alt={post.author.username} 
// // //               className="w-10 h-10 rounded-full border border-[#181D27]"
// // //             />
// // //             <div>
// // //               <p className="text-[#FDFDFD] font-bold text-sm">{post.author.username}</p>
// // //               <p className="text-gray-500 text-xs">{dayjs(post.createdAt).fromNow()}</p>
// // //             </div>
// // //           </div>

// // //           {/* Comments List */}
// // //           <div className="flex-1 overflow-y-auto pr-2">
// // //             <h3 className="text-[#FDFDFD] font-bold text-md mb-4 border-b border-[#181D27] pb-2">
// // //               Comments
// // //             </h3>
            
// // //             {commentsData && commentsData.length > 0 ? (
// // //               commentsData.map((comment) => (
// // //                 <div key={comment.id} className="flex gap-3 mb-4">
// // //                   <img 
// // //                     src={comment.author.avatarUrl || `https://ui-avatars.com/api/?name=${comment.author.username}`} 
// // //                     alt={comment.author.username} 
// // //                     className="w-8 h-8 rounded-full border border-[#181D27]"
// // //                   />
// // //                   <div>
// // //                     <div className="flex items-center gap-2">
// // //                       <span className="text-[#FDFDFD] font-bold text-sm">
// // //                         {comment.author.username}
// // //                       </span>
// // //                       <span className="text-gray-500 text-xs">
// // //                         {dayjs(comment.createdAt).fromNow()}
// // //                       </span>
// // //                     </div>
// // //                     <p className="text-[#FDFDFD] font-normal text-sm mt-1">
// // //                       {comment.text}
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               ))
// // //             ) : (
// // //               <p className="text-gray-500 text-center mt-4">No comments yet.</p>
// // //             )}
// // //           </div>

// // //           {/* Footer Area */}
// // //           <div className="mt-auto">
            
// // //             {/* Actions Row */}
// // //             <div className="pt-4 border-t border-[#181D27] mb-4">
// // //               <div className="flex justify-between items-center">
// // //                 <div className="flex gap-6">
// // //                   <button 
// // //                       onClick={() => likeMutation.mutate()}
// // //                       className="flex items-center gap-2 focus:outline-none active:scale-110 transition-transform"
// // //                   >
// // //                     <img src="/love_icon.png" alt="Like" className="w-6 h-6 object-contain" />
// // //                     <span className="text-[#FDFDFD] font-semibold text-md">
// // //                       {post.likeCount}
// // //                     </span>
// // //                   </button>

// // //                   <button className="flex items-center gap-2 focus:outline-none">
// // //                     <img src="/Comment_icon.png" alt="Comment" className="w-6 h-6 object-contain" />
// // //                     <span className="text-[#FDFDFD] font-semibold text-md">
// // //                       {post.commentCount}
// // //                     </span>
// // //                   </button>

// // //                   <button className="flex items-center gap-2 focus:outline-none">
// // //                     <img src="/Share_icon.png" alt="Share" className="w-6 h-6 object-contain" />
// // //                     <span className="text-[#FDFDFD] font-semibold text-md">
// // //                       0
// // //                     </span>
// // //                   </button>
// // //                 </div>

// // //                 <button 
// // //                   onClick={() => saveMutation.mutate()}
// // //                   className="focus:outline-none"
// // //                 >
// // //                   <img src="/saved_icon.png" alt="Save" className="w-6 h-6 object-contain" />
// // //                 </button>
// // //               </div>
// // //             </div>

// // //             {/* ADD COMMENT SECTION */}
// // //             <div className="flex items-center gap-2 relative">
                
// // //                 {/* 1. Emoji Button & Picker Container */}
// // //                 <div className="relative" ref={pickerRef}>
                   
// // //                    {/* Emoji Picker Popup (Absolute Above) */}
// // //                    {showEmojiPicker && (
// // //                      <div 
// // //                        className="absolute bottom-full w-auto left-0 mb-2 bg-[#0A0D12] border border-[#181D27] rounded-xl p-4 shadow-lg z-50"
// // //                        style={{
                         
// // //                          height: '152px',
// // //                          display: 'grid',
// // //                          gridTemplateColumns: 'repeat(6, 1fr)',
// // //                          gridTemplateRows: 'repeat(3, 1fr)',
// // //                          gap: '10px'
// // //                        }}
// // //                      >
// // //                        {EMOJI_LIST.map((emoji) => (
// // //                          <button
// // //                            key={emoji}
// // //                            onClick={() => handleEmojiClick(emoji)}
// // //                            className="text-xl hover:scale-125 transition-transform flex items-center justify-center"
// // //                          >
// // //                            {emoji}
// // //                          </button>
// // //                        ))}
// // //                      </div>
// // //                    )}

// // //                    {/* Toggle Button */}
// // //                    <div 
// // //                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
// // //                      // Reduced padding from p-4 to p-2 to fit image
// // //                      className="w-12 h-12 rounded-xl border border-[#181D27] flex items-center justify-center p-2 shrink-0 cursor-pointer hover:bg-[#181D27] transition-colors"
// // //                    >
// // //                        <img 
// // //                            src="/Emoji.png" 
// // //                            alt="Emoji" 
// // //                            className="w-[210px] h-full object-fill" // Changed to object-contain to maintain aspect ratio
// // //                            onError={(e) => { e.currentTarget.style.display = 'none'; }} 
// // //                        />
// // //                    </div>
// // //                 </div>

// // //                 {/* 2. Input & Post Button */}
// // //                 <div 
// // //                   className="w-[384px] h-12 bg-[#0A0D12] border border-[#181D27] rounded-xl flex items-center justify-between px-4 py-2"
// // //                 >
// // //                     <input 
// // //                         type="text" 
// // //                         placeholder="Add Comment" 
// // //                         className="bg-transparent border-none outline-none text-[#535862] placeholder-[#535862] text-base font-medium w-full"
// // //                         value={commentText}
// // //                         onChange={(e) => setCommentText(e.target.value)}
// // //                         onKeyDown={(e) => {
// // //                           if (e.key === 'Enter') addCommentMutation.mutate();
// // //                         }}
// // //                     />
// // //                     <button 
// // //                       className={`text-[#535862] font-medium text-base ml-2 cursor-pointer transition-colors ${commentText.trim() ? 'text-[#FDFDFD] hover:text-white' : ''}`}
// // //                       onClick={() => addCommentMutation.mutate()}
// // //                       disabled={addCommentMutation.isPending || !commentText.trim()}
// // //                     >
// // //                         {addCommentMutation.isPending ? '...' : 'Post'}
// // //                     </button>
// // //                 </div>
// // //             </div>

// // //           </div>

// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import { useState, useRef, useEffect } from 'react';
// // import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// // import dayjs from 'dayjs';
// // import relativeTime from 'dayjs/plugin/relativeTime';
// // import { X } from 'lucide-react';
// // import api from '../lib/axios';

// // dayjs.extend(relativeTime);

// // // --- Tipe Data ---
// // interface Author {
// //   id: number;
// //   username: string;
// //   avatarUrl: string | null;
// //   name?: string;
// // }

// // interface Post {
// //   id: number;
// //   imageUrl: string;
// //   caption: string;
// //   createdAt: string;
// //   likeCount: number;
// //   commentCount: number;
// //   likedByMe: boolean;
// //   isSaved?: boolean;
// //   author: Author;
// // }

// // interface Comment {
// //   id: number;
// //   text: string;
// //   createdAt: string;
// //   author: Author;
// // }

// // interface FeedPage {
// //   data: {
// //     items: Post[];
// //   };
// // }

// // interface InfiniteFeedData {
// //   pages: FeedPage[];
// // }

// // interface PostDetailModalProps {
// //   post: Post;
// //   onClose: () => void;
// // }

// // // Daftar 18 Emoji untuk Grid 6x3
// // const EMOJI_LIST = [
// //   "😀", "😃", "😄", "😁", "😆", "😅",
// //   "😂", "🤣", "🥲", "☺️", "😊", "😇",
// //   "🙂", "🙃", "😉", "😌", "😍", "🥰"
// // ];

// // export default function PostDetailModal({ post, onClose }: PostDetailModalProps) {
// //   const queryClient = useQueryClient();
// //   const [commentText, setCommentText] = useState('');
// //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
// //   const pickerRef = useRef<HTMLDivElement>(null);

// //   // Tutup picker jika klik di luar area
// //   useEffect(() => {
// //     function handleClickOutside(event: MouseEvent) {
// //       if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
// //         setShowEmojiPicker(false);
// //       }
// //     }
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // Fetch comments
// //   const { data: commentsData } = useQuery({
// //     queryKey: ['comments', post.id],
// //     queryFn: async () => {
// //       const res = await api.get(`/api/posts/${post.id}/comments?page=1&limit=10`);
// //       return res.data.data.comments as Comment[];
// //     },
// //   });

// //   // Add Comment Mutation
// //   const addCommentMutation = useMutation({
// //     mutationFn: async () => {
// //       if (!commentText.trim()) return;
// //       return api.post(`/api/posts/${post.id}/comments`, {
// //         text: commentText
// //       });
// //     },
// //     onSuccess: () => {
// //       setCommentText('');
// //       setShowEmojiPicker(false);
// //       queryClient.invalidateQueries({ queryKey: ['comments', post.id] });
// //       queryClient.invalidateQueries({ queryKey: ['feed'] });
// //       queryClient.invalidateQueries({ queryKey: ['post', String(post.id)] });
// //     },
// //     onError: () => {
// //       alert("Gagal mengirim komentar.");
// //     }
// //   });

// //   // Like Mutation
// //   const likeMutation = useMutation({
// //     mutationFn: async () => {
// //       if (post.likedByMe) {
// //         return api.delete(`/api/posts/${post.id}/like`);
// //       } else {
// //         return api.post(`/api/posts/${post.id}/like`);
// //       }
// //     },
// //     onMutate: async () => {
// //       await queryClient.cancelQueries({ queryKey: ['feed'] });
// //       await queryClient.cancelQueries({ queryKey: ['post', String(post.id)] });
// //       const previousFeed = queryClient.getQueryData(['feed']);

// //       queryClient.setQueriesData({ queryKey: ['feed'] }, (oldData: unknown) => {
// //         if (!oldData) return oldData;
// //         const feedData = oldData as InfiniteFeedData;
        
// //         return {
// //           ...feedData,
// //           pages: feedData.pages.map((page) => ({
// //             ...page,
// //             data: {
// //               ...page.data,
// //               items: page.data.items.map((item) => {
// //                 if (item.id === post.id) {
// //                   return {
// //                     ...item,
// //                     likedByMe: !item.likedByMe,
// //                     likeCount: item.likedByMe ? item.likeCount - 1 : item.likeCount + 1,
// //                   };
// //                 }
// //                 return item;
// //               }),
// //             },
// //           })),
// //         };
// //       });
// //       return { previousFeed };
// //     },
// //     onError: (_err, _new, context) => {
// //       if (context?.previousFeed) {
// //         queryClient.setQueryData(['feed'], context.previousFeed);
// //       }
// //     },
// //     onSettled: () => {
// //       queryClient.invalidateQueries({ queryKey: ['feed'] });
// //       queryClient.invalidateQueries({ queryKey: ['post', String(post.id)] });
// //       queryClient.invalidateQueries({ queryKey: ['my-likes'] });
// //     },
// //   });

// //   // Save Mutation
// //   const saveMutation = useMutation({
// //     mutationFn: async () => {
// //       if (post.isSaved) {
// //         return api.delete(`/api/posts/${post.id}/save`);
// //       } else {
// //         return api.post(`/api/posts/${post.id}/save`);
// //       }
// //     },
// //     onMutate: async () => {
// //       await queryClient.cancelQueries({ queryKey: ['feed'] });
// //       const previousFeed = queryClient.getQueryData(['feed']);
      
// //       queryClient.setQueriesData({ queryKey: ['feed'] }, (oldData: unknown) => {
// //         if (!oldData) return oldData;
// //         const feedData = oldData as InfiniteFeedData;

// //         return {
// //           ...feedData,
// //           pages: feedData.pages.map((page) => ({
// //             ...page,
// //             data: {
// //               ...page.data,
// //               items: page.data.items.map((item) => {
// //                 if (item.id === post.id) {
// //                   return { ...item, isSaved: !item.isSaved };
// //                 }
// //                 return item;
// //               }),
// //             },
// //           })),
// //         };
// //       });
// //       return { previousFeed };
// //     },
// //     onError: (_err, _new, context) => {
// //       if (context?.previousFeed) {
// //         queryClient.setQueryData(['feed'], context.previousFeed);
// //       }
// //     },
// //     onSettled: () => {
// //       queryClient.invalidateQueries({ queryKey: ['feed'] });
// //       queryClient.invalidateQueries({ queryKey: ['saved-posts'] });
// //     },
// //   });

// //   // Handle Emoji Click
// //   const handleEmojiClick = (emoji: string) => {
// //     setCommentText((prev) => prev + emoji);
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 flex justify-center bg-black/80 backdrop-blur-sm overflow-y-auto">
// //       <div 
// //         className="relative bg-[#000000] border border-[#181D27] rounded-xl overflow-hidden flex my-[30px] shrink-0"
// //         style={{ width: '1200px', height: '768px', gap: '24px' }}
// //       >
// //         {/* Close Button */}
// //         <button 
// //           onClick={onClose}
// //           className="absolute top-4 right-4 text-[#FDFDFD] z-10 p-1 bg-black/50 rounded-full hover:bg-black/80"
// //         >
// //           <X size={24} />
// //         </button>

// //         {/* A. KOLOM KIRI: Image */}
// //         <div className="w-[720px] h-[720px] flex items-center justify-center bg-black">
// //           <img 
// //             src={post.imageUrl} 
// //             alt="Post Detail" 
// //             className="w-full h-full object-cover"
// //           />
// //         </div>

// //         {/* B. KOLOM KANAN: Comments Section */}
// //         <div className="flex-1 flex flex-col h-full p-6">
          
// //           {/* Header Post Owner */}
// //           <div className="flex items-center gap-3 mb-4 border-b border-[#181D27] pb-4">
// //             <img 
// //               src={post.author.avatarUrl || `https://ui-avatars.com/api/?name=${post.author.username}`} 
// //               alt={post.author.username} 
// //               className="w-10 h-10 rounded-full border border-[#181D27]"
// //             />
// //             <div>
// //               <p className="text-[#FDFDFD] font-bold text-sm">{post.author.username}</p>
// //               <p className="text-gray-500 text-xs">{dayjs(post.createdAt).fromNow()}</p>
// //             </div>
// //           </div>

// //           {/* Comments List */}
// //           <div className="flex-1 overflow-y-auto pr-2">
// //             <h3 className="text-[#FDFDFD] font-bold text-md mb-4 border-b border-[#181D27] pb-2">
// //               Comments
// //             </h3>
            
// //             {commentsData && commentsData.length > 0 ? (
// //               commentsData.map((comment) => (
// //                 <div key={comment.id} className="flex gap-3 mb-4">
// //                   <img 
// //                     src={comment.author.avatarUrl || `https://ui-avatars.com/api/?name=${comment.author.username}`} 
// //                     alt={comment.author.username} 
// //                     className="w-8 h-8 rounded-full border border-[#181D27]"
// //                   />
// //                   <div>
// //                     <div className="flex items-center gap-2">
// //                       <span className="text-[#FDFDFD] font-bold text-sm">
// //                         {comment.author.username}
// //                       </span>
// //                       <span className="text-gray-500 text-xs">
// //                         {dayjs(comment.createdAt).fromNow()}
// //                       </span>
// //                     </div>
// //                     <p className="text-[#FDFDFD] font-normal text-sm mt-1">
// //                       {comment.text}
// //                     </p>
// //                   </div>
// //                 </div>
// //               ))
// //             ) : (
// //               <p className="text-gray-500 text-center mt-4">No comments yet.</p>
// //             )}
// //           </div>

// //           {/* Footer Area */}
// //           <div className="mt-auto">
            
// //             {/* Actions Row */}
// //             <div className="pt-4 border-t border-[#181D27] mb-4">
// //               <div className="flex justify-between items-center">
// //                 <div className="flex gap-6">
// //                   <button 
// //                       onClick={() => likeMutation.mutate()}
// //                       className="flex items-center gap-2 focus:outline-none active:scale-110 transition-transform"
// //                   >
// //                     <img src="/love_icon.png" alt="Like" className="w-6 h-6 object-contain" />
// //                     <span className="text-[#FDFDFD] font-semibold text-md">
// //                       {post.likeCount}
// //                     </span>
// //                   </button>

// //                   <button className="flex items-center gap-2 focus:outline-none">
// //                     <img src="/Comment_icon.png" alt="Comment" className="w-6 h-6 object-contain" />
// //                     <span className="text-[#FDFDFD] font-semibold text-md">
// //                       {post.commentCount}
// //                     </span>
// //                   </button>

// //                   <button className="flex items-center gap-2 focus:outline-none">
// //                     <img src="/Share_icon.png" alt="Share" className="w-6 h-6 object-contain" />
// //                     <span className="text-[#FDFDFD] font-semibold text-md">
// //                       0
// //                     </span>
// //                   </button>
// //                 </div>

// //                 <button 
// //                   onClick={() => saveMutation.mutate()}
// //                   className="focus:outline-none"
// //                 >
// //                   <img src="/saved_icon.png" alt="Save" className="w-6 h-6 object-contain" />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* ADD COMMENT SECTION */}
// //             <div className="flex items-center gap-2 relative">
                
// //                 {/* 1. Emoji Button & Picker Container */}
// //                 <div className="relative" ref={pickerRef}>
                   
// //                    {/* Emoji Picker Popup (Absolute Above) */}
// //                    {showEmojiPicker && (
// //                      <div 
// //                        className="absolute bottom-full w-auto left-0 mb-2 bg-[#0A0D12] border border-[#181D27] rounded-xl p-4 shadow-lg z-50"
// //                        style={{
                         
// //                          height: '152px',
// //                          display: 'grid',
// //                          gridTemplateColumns: 'repeat(6, 1fr)',
// //                          gridTemplateRows: 'repeat(3, 1fr)',
// //                          gap: '10px'
// //                        }}
// //                      >
// //                        {EMOJI_LIST.map((emoji) => (
// //                          <button
// //                            key={emoji}
// //                            onClick={() => handleEmojiClick(emoji)}
// //                            className="text-xl hover:scale-125 transition-transform flex items-center justify-center"
// //                          >
// //                            {emoji}
// //                          </button>
// //                        ))}
// //                      </div>
// //                    )}

// //                    {/* Toggle Button */}
// //                    <div 
// //                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
// //                      // Reduced padding from p-4 to p-2 to fit image
// //                      className="w-12 h-12 rounded-xl border border-[#181D27] flex items-center justify-center p-2 shrink-0 cursor-pointer hover:bg-[#181D27] transition-colors"
// //                    >
// //                        <img 
// //                            src="/Emoji.png" 
// //                            alt="Emoji" 
// //                            className="w-full h-full object-contain" 
// //                            onError={(e) => { e.currentTarget.style.display = 'none'; }} 
// //                        />
// //                    </div>
// //                 </div>

// //                 {/* 2. Input & Post Button */}
// //                 <div 
// //                   className="w-[384px] h-12 bg-[#0A0D12] border border-[#181D27] rounded-xl flex items-center justify-between px-4 py-2"
// //                 >
// //                     <input 
// //                         type="text" 
// //                         placeholder="Add Comment" 
// //                         className="bg-transparent border-none outline-none text-[#FDFDFD] placeholder-[#535862] text-base font-medium w-full"
// //                         value={commentText}
// //                         onChange={(e) => setCommentText(e.target.value)}
// //                         onKeyDown={(e) => {
// //                           if (e.key === 'Enter') addCommentMutation.mutate();
// //                         }}
// //                     />
// //                     <button 
// //                       className={`font-medium text-base ml-2 cursor-pointer transition-colors ${commentText.trim() ? 'text-[#7F51F9] hover:text-[#5b2ed1]' : 'text-[#535862]'}`}
// //                       onClick={() => addCommentMutation.mutate()}
// //                       disabled={addCommentMutation.isPending || !commentText.trim()}
// //                     >
// //                         {addCommentMutation.isPending ? '...' : 'Post'}
// //                     </button>
// //                 </div>
// //             </div>

// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import { useState, useRef, useEffect } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import { X, MoreHorizontal, Trash2 } from 'lucide-react';
// import api from '../lib/axios';

// dayjs.extend(relativeTime);

// // --- Tipe Data ---
// interface Author {
//   id: number;
//   username: string;
//   avatarUrl: string | null;
//   name?: string;
// }

// interface Post {
//   id: number;
//   imageUrl: string;
//   caption: string;
//   createdAt: string;
//   likeCount: number;
//   commentCount: number;
//   likedByMe: boolean;
//   isSaved?: boolean;
//   author: Author;
// }

// interface Comment {
//   id: number;
//   text: string;
//   createdAt: string;
//   author: Author;
//   isMine: boolean; // Properti untuk mengecek kepemilikan komentar
// }

// interface FeedPage {
//   data: {
//     items: Post[];
//   };
// }

// interface InfiniteFeedData {
//   pages: FeedPage[];
// }

// interface PostDetailModalProps {
//   post: Post;
//   onClose: () => void;
// }

// // Daftar 18 Emoji untuk Grid 6x3
// const EMOJI_LIST = [
//   "😀", "😃", "😄", "😁", "😆", "😅",
//   "😂", "🤣", "🥲", "☺️", "😊", "😇",
//   "🙂", "🙃", "😉", "😌", "😍", "🥰"
// ];

// export default function PostDetailModal({ post, onClose }: PostDetailModalProps) {
//   const queryClient = useQueryClient();
//   const [commentText, setCommentText] = useState('');
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [activeCommentMenu, setActiveCommentMenu] = useState<number | null>(null); // State untuk menu komentar aktif
  
//   const pickerRef = useRef<HTMLDivElement>(null);
//   const commentMenuRef = useRef<HTMLDivElement>(null);

//   // Tutup picker & comment menu jika klik di luar area
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       // Tutup Emoji Picker
//       if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
//         setShowEmojiPicker(false);
//       }
//       // Tutup Comment Menu
//       if (commentMenuRef.current && !commentMenuRef.current.contains(event.target as Node)) {
//         setActiveCommentMenu(null);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Fetch comments
//   const { data: commentsData } = useQuery({
//     queryKey: ['comments', post.id],
//     queryFn: async () => {
//       const res = await api.get(`/api/posts/${post.id}/comments?page=1&limit=10`);
//       return res.data.data.comments as Comment[];
//     },
//   });

//   // Add Comment Mutation
//   const addCommentMutation = useMutation({
//     mutationFn: async () => {
//       if (!commentText.trim()) return;
//       return api.post(`/api/posts/${post.id}/comments`, {
//         text: commentText
//       });
//     },
//     onSuccess: () => {
//       setCommentText('');
//       setShowEmojiPicker(false);
//       queryClient.invalidateQueries({ queryKey: ['comments', post.id] });
//       queryClient.invalidateQueries({ queryKey: ['feed'] });
//       queryClient.invalidateQueries({ queryKey: ['post', String(post.id)] });
//     },
//     onError: () => {
//       alert("Gagal mengirim komentar.");
//     }
//   });

//   // Delete Comment Mutation
//   const deleteCommentMutation = useMutation({
//     mutationFn: async (commentId: number) => {
//       return api.delete(`/api/comments/${commentId}`);
//     },
//     onSuccess: () => {
//       setActiveCommentMenu(null);
//       queryClient.invalidateQueries({ queryKey: ['comments', post.id] });
//       queryClient.invalidateQueries({ queryKey: ['feed'] });
//       queryClient.invalidateQueries({ queryKey: ['post', String(post.id)] });
//     },
//     onError: () => {
//       alert("Gagal menghapus komentar.");
//     }
//   });

//   // Like Mutation
//   const likeMutation = useMutation({
//     mutationFn: async () => {
//       if (post.likedByMe) {
//         return api.delete(`/api/posts/${post.id}/like`);
//       } else {
//         return api.post(`/api/posts/${post.id}/like`);
//       }
//     },
//     onMutate: async () => {
//       await queryClient.cancelQueries({ queryKey: ['feed'] });
//       await queryClient.cancelQueries({ queryKey: ['post', String(post.id)] });
//       const previousFeed = queryClient.getQueryData(['feed']);

//       queryClient.setQueriesData({ queryKey: ['feed'] }, (oldData: unknown) => {
//         if (!oldData) return oldData;
//         const feedData = oldData as InfiniteFeedData;
        
//         return {
//           ...feedData,
//           pages: feedData.pages.map((page) => ({
//             ...page,
//             data: {
//               ...page.data,
//               items: page.data.items.map((item) => {
//                 if (item.id === post.id) {
//                   return {
//                     ...item,
//                     likedByMe: !item.likedByMe,
//                     likeCount: item.likedByMe ? item.likeCount - 1 : item.likeCount + 1,
//                   };
//                 }
//                 return item;
//               }),
//             },
//           })),
//         };
//       });
//       return { previousFeed };
//     },
//     onError: (_err, _new, context) => {
//       if (context?.previousFeed) {
//         queryClient.setQueryData(['feed'], context.previousFeed);
//       }
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ['feed'] });
//       queryClient.invalidateQueries({ queryKey: ['post', String(post.id)] });
//       queryClient.invalidateQueries({ queryKey: ['my-likes'] });
//     },
//   });

//   // Save Mutation
//   const saveMutation = useMutation({
//     mutationFn: async () => {
//       if (post.isSaved) {
//         return api.delete(`/api/posts/${post.id}/save`);
//       } else {
//         return api.post(`/api/posts/${post.id}/save`);
//       }
//     },
//     onMutate: async () => {
//       await queryClient.cancelQueries({ queryKey: ['feed'] });
//       const previousFeed = queryClient.getQueryData(['feed']);
      
//       queryClient.setQueriesData({ queryKey: ['feed'] }, (oldData: unknown) => {
//         if (!oldData) return oldData;
//         const feedData = oldData as InfiniteFeedData;

//         return {
//           ...feedData,
//           pages: feedData.pages.map((page) => ({
//             ...page,
//             data: {
//               ...page.data,
//               items: page.data.items.map((item) => {
//                 if (item.id === post.id) {
//                   return { ...item, isSaved: !item.isSaved };
//                 }
//                 return item;
//               }),
//             },
//           })),
//         };
//       });
//       return { previousFeed };
//     },
//     onError: (_err, _new, context) => {
//       if (context?.previousFeed) {
//         queryClient.setQueryData(['feed'], context.previousFeed);
//       }
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ['feed'] });
//       queryClient.invalidateQueries({ queryKey: ['saved-posts'] });
//     },
//   });

//   // Handle Emoji Click
//   const handleEmojiClick = (emoji: string) => {
//     setCommentText((prev) => prev + emoji);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex justify-center bg-black/80 backdrop-blur-sm overflow-y-auto">
//       <div 
//         className="relative bg-[#000000] border border-[#181D27] rounded-xl overflow-hidden flex my-[30px] shrink-0"
//         style={{ width: '1200px', height: '768px', gap: '24px' }}
//       >
//         {/* Close Button */}
//         <button 
//           onClick={onClose}
//           className="absolute top-4 right-4 text-[#FDFDFD] z-10 p-1 bg-black/50 rounded-full hover:bg-black/80"
//         >
//           <X size={24} />
//         </button>

//         {/* A. KOLOM KIRI: Image */}
//         <div className="w-[720px] h-[720px] flex items-center justify-center bg-black">
//           <img 
//             src={post.imageUrl} 
//             alt="Post Detail" 
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* B. KOLOM KANAN: Comments Section */}
//         <div className="flex-1 flex flex-col h-full p-6">
          
//           {/* Header Post Owner */}
//           <div className="flex items-center gap-3 mb-4 border-b border-[#181D27] pb-4">
//             <img 
//               src={post.author.avatarUrl || `https://ui-avatars.com/api/?name=${post.author.username}`} 
//               alt={post.author.username} 
//               className="w-10 h-10 rounded-full border border-[#181D27]"
//             />
//             <div>
//               <p className="text-[#FDFDFD] font-bold text-sm">{post.author.username}</p>
//               <p className="text-gray-500 text-xs">{dayjs(post.createdAt).fromNow()}</p>
//             </div>
//           </div>

//           {/* Comments List */}
//           <div className="flex-1 overflow-y-auto pr-2" ref={commentMenuRef}>
//             <h3 className="text-[#FDFDFD] font-bold text-md mb-4 border-b border-[#181D27] pb-2">
//               Comments
//             </h3>
            
//             {commentsData && commentsData.length > 0 ? (
//               commentsData.map((comment) => (
//                 <div key={comment.id} className="flex justify-between items-start mb-4 group relative">
//                   <div className="flex gap-3 flex-1">
//                     <img 
//                       src={comment.author.avatarUrl || `https://ui-avatars.com/api/?name=${comment.author.username}`} 
//                       alt={comment.author.username} 
//                       className="w-8 h-8 rounded-full border border-[#181D27] shrink-0"
//                     />
//                     <div>
//                       <div className="flex items-center gap-2">
//                         <span className="text-[#FDFDFD] font-bold text-sm">
//                           {comment.author.username}
//                         </span>
//                         <span className="text-gray-500 text-xs">
//                           {dayjs(comment.createdAt).fromNow()}
//                         </span>
//                       </div>
//                       <p className="text-[#FDFDFD] font-normal text-sm mt-1 break-all">
//                         {comment.text}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Menu 3 Titik (Hanya jika komentar milik user) */}
//                   {comment.isMine && (
//                     <div className="relative">
//                       <button 
//                         onClick={() => setActiveCommentMenu(activeCommentMenu === comment.id ? null : comment.id)}
//                         className="text-gray-500 hover:text-[#FDFDFD] p-1 rounded-full hover:bg-[#181D27] transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
//                       >
//                         <MoreHorizontal size={16} />
//                       </button>

//                       {/* Dropdown Menu */}
//                       {activeCommentMenu === comment.id && (
//                         <div className="absolute right-0 top-6 z-10 w-32 bg-[#0A0D12] border border-[#181D27] rounded-lg shadow-xl overflow-hidden">
//                           <button
//                             onClick={() => deleteCommentMutation.mutate(comment.id)}
//                             className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-[#181D27] transition-colors text-left"
//                             disabled={deleteCommentMutation.isPending}
//                           >
//                             <Trash2 size={14} />
//                             {deleteCommentMutation.isPending ? 'Deleting...' : 'Delete'}
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center mt-4">No comments yet.</p>
//             )}
//           </div>

//           {/* Footer Area */}
//           <div className="mt-auto">
            
//             {/* Actions Row */}
//             <div className="pt-4 border-t border-[#181D27] mb-4">
//               <div className="flex justify-between items-center">
//                 <div className="flex gap-6">
//                   <button 
//                       onClick={() => likeMutation.mutate()}
//                       className="flex items-center gap-2 focus:outline-none active:scale-110 transition-transform"
//                   >
//                     <img src="/love_icon.png" alt="Like" className="w-6 h-6 object-contain" />
//                     <span className="text-[#FDFDFD] font-semibold text-md">
//                       {post.likeCount}
//                     </span>
//                   </button>

//                   <button className="flex items-center gap-2 focus:outline-none">
//                     <img src="/Comment_icon.png" alt="Comment" className="w-6 h-6 object-contain" />
//                     <span className="text-[#FDFDFD] font-semibold text-md">
//                       {post.commentCount}
//                     </span>
//                   </button>

//                   <button className="flex items-center gap-2 focus:outline-none">
//                     <img src="/Share_icon.png" alt="Share" className="w-6 h-6 object-contain" />
//                     <span className="text-[#FDFDFD] font-semibold text-md">
//                       0
//                     </span>
//                   </button>
//                 </div>

//                 <button 
//                   onClick={() => saveMutation.mutate()}
//                   className="focus:outline-none"
//                 >
//                   <img src="/saved_icon.png" alt="Save" className="w-6 h-6 object-contain" />
//                 </button>
//               </div>
//             </div>

//             {/* ADD COMMENT SECTION */}
//             <div className="flex items-center gap-2 relative">
                
//                 {/* 1. Emoji Button & Picker Container */}
//                 <div className="relative" ref={pickerRef}>
                   
//                    {/* Emoji Picker Popup (Absolute Above) */}
//                    {showEmojiPicker && (
//                      <div 
//                        className="absolute bottom-full left-0 mb-2 bg-[#0A0D12] border border-[#181D27] rounded-xl p-4 shadow-lg z-50"
//                        style={{
//                          width: '210px',
//                          height: '152px',
//                          display: 'grid',
//                          gridTemplateColumns: 'repeat(6, 1fr)',
//                          gridTemplateRows: 'repeat(3, 1fr)',
//                          gap: '10px'
//                        }}
//                      >
//                        {EMOJI_LIST.map((emoji) => (
//                          <button
//                            key={emoji}
//                            onClick={() => handleEmojiClick(emoji)}
//                            className="text-xl hover:scale-125 transition-transform flex items-center justify-center"
//                          >
//                            {emoji}
//                          </button>
//                        ))}
//                      </div>
//                    )}

//                    {/* Toggle Button */}
//                    <div 
//                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//                      className="w-12 h-12 rounded-xl border border-[#181D27] flex items-center justify-center p-2 shrink-0 cursor-pointer hover:bg-[#181D27] transition-colors"
//                    >
//                        <img 
//                            src="/Emoji.png" 
//                            alt="Emoji" 
//                            className="w-full h-full object-contain" 
//                            onError={(e) => { e.currentTarget.style.display = 'none'; }} 
//                        />
//                    </div>
//                 </div>

//                 {/* 2. Input & Post Button */}
//                 <div 
//                   className="w-[384px] h-12 bg-[#0A0D12] border border-[#181D27] rounded-xl flex items-center justify-between px-4 py-2"
//                 >
//                     <input 
//                         type="text" 
//                         placeholder="Add Comment" 
//                         className="bg-transparent border-none outline-none text-[#FDFDFD] placeholder-[#535862] text-base font-medium w-full"
//                         value={commentText}
//                         onChange={(e) => setCommentText(e.target.value)}
//                         onKeyDown={(e) => {
//                           if (e.key === 'Enter') addCommentMutation.mutate();
//                         }}
//                     />
//                     <button 
//                       className={`font-medium text-base ml-2 cursor-pointer transition-colors ${commentText.trim() ? 'text-[#7F51F9] hover:text-[#5b2ed1]' : 'text-[#535862]'}`}
//                       onClick={() => addCommentMutation.mutate()}
//                       disabled={addCommentMutation.isPending || !commentText.trim()}
//                     >
//                         {addCommentMutation.isPending ? '...' : 'Post'}
//                     </button>
//                 </div>
//             </div>

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { X, MoreHorizontal, Trash2 } from 'lucide-react';
import api from '../lib/axios';

dayjs.extend(relativeTime);

// --- Tipe Data ---
interface Author {
  id: number;
  username: string;
  avatarUrl: string | null;
  name?: string;
}

interface Post {
  id: number;
  imageUrl: string;
  caption: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
  isSaved?: boolean;
  author: Author;
}

interface Comment {
  id: number;
  text: string;
  createdAt: string;
  author: Author;
  isMine: boolean; // Properti untuk mengecek kepemilikan komentar
}

interface FeedPage {
  data: {
    items: Post[];
  };
}

interface InfiniteFeedData {
  pages: FeedPage[];
}

interface PostDetailModalProps {
  post: Post;
  onClose: () => void;
}

// Daftar 18 Emoji untuk Grid 6x3
const EMOJI_LIST = [
  "😀", "😃", "😄", "😁", "😆", "😅",
  "😂", "🤣", "🥲", "☺️", "😊", "😇",
  "🙂", "🙃", "😉", "😌", "😍", "🥰"
];

export default function PostDetailModal({ post, onClose }: PostDetailModalProps) {
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [activeCommentMenu, setActiveCommentMenu] = useState<number | null>(null); // State untuk menu komentar aktif
  
  const pickerRef = useRef<HTMLDivElement>(null);
  const commentMenuRef = useRef<HTMLDivElement>(null);

  // Tutup picker & comment menu jika klik di luar area
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Tutup Emoji Picker
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
      // Tutup Comment Menu
      if (commentMenuRef.current && !commentMenuRef.current.contains(event.target as Node)) {
        setActiveCommentMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch comments
  const { data: commentsData } = useQuery({
    queryKey: ['comments', post.id],
    queryFn: async () => {
      const res = await api.get(`/api/posts/${post.id}/comments?page=1&limit=10`);
      return res.data.data.comments as Comment[];
    },
  });

  // Add Comment Mutation
  const addCommentMutation = useMutation({
    mutationFn: async () => {
      if (!commentText.trim()) return;
      return api.post(`/api/posts/${post.id}/comments`, {
        text: commentText
      });
    },
    onSuccess: () => {
      setCommentText('');
      setShowEmojiPicker(false);
      queryClient.invalidateQueries({ queryKey: ['comments', post.id] });
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['post', String(post.id)] });
    },
    onError: () => {
      alert("Gagal mengirim komentar.");
    }
  });

  // Delete Comment Mutation
  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: number) => {
      return api.delete(`/api/comments/${commentId}`);
    },
    onSuccess: () => {
      setActiveCommentMenu(null);
      queryClient.invalidateQueries({ queryKey: ['comments', post.id] });
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['post', String(post.id)] });
    },
    onError: () => {
      alert("Gagal menghapus komentar.");
    }
  });

  // Like Mutation
  const likeMutation = useMutation({
    mutationFn: async () => {
      if (post.likedByMe) {
        return api.delete(`/api/posts/${post.id}/like`);
      } else {
        return api.post(`/api/posts/${post.id}/like`);
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['feed'] });
      await queryClient.cancelQueries({ queryKey: ['post', String(post.id)] });
      const previousFeed = queryClient.getQueryData(['feed']);

      queryClient.setQueriesData({ queryKey: ['feed'] }, (oldData: unknown) => {
        if (!oldData) return oldData;
        const feedData = oldData as InfiniteFeedData;
        
        return {
          ...feedData,
          pages: feedData.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              items: page.data.items.map((item) => {
                if (item.id === post.id) {
                  return {
                    ...item,
                    likedByMe: !item.likedByMe,
                    likeCount: item.likedByMe ? item.likeCount - 1 : item.likeCount + 1,
                  };
                }
                return item;
              }),
            },
          })),
        };
      });
      return { previousFeed };
    },
    onError: (_err, _new, context) => {
      if (context?.previousFeed) {
        queryClient.setQueryData(['feed'], context.previousFeed);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['post', String(post.id)] });
      queryClient.invalidateQueries({ queryKey: ['my-likes'] });
    },
  });

  // Save Mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (post.isSaved) {
        return api.delete(`/api/posts/${post.id}/save`);
      } else {
        return api.post(`/api/posts/${post.id}/save`);
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['feed'] });
      const previousFeed = queryClient.getQueryData(['feed']);
      
      queryClient.setQueriesData({ queryKey: ['feed'] }, (oldData: unknown) => {
        if (!oldData) return oldData;
        const feedData = oldData as InfiniteFeedData;

        return {
          ...feedData,
          pages: feedData.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              items: page.data.items.map((item) => {
                if (item.id === post.id) {
                  return { ...item, isSaved: !item.isSaved };
                }
                return item;
              }),
            },
          })),
        };
      });
      return { previousFeed };
    },
    onError: (_err, _new, context) => {
      if (context?.previousFeed) {
        queryClient.setQueryData(['feed'], context.previousFeed);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['saved-posts'] });
    },
  });

  // Handle Emoji Click
  const handleEmojiClick = (emoji: string) => {
    setCommentText((prev) => prev + emoji);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative bg-[#000000] border border-[#181D27]  overflow-hidden flex my-[30px] shrink-0"
        style={{ width: '1200px', height: '768px', gap: '24px' }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#FDFDFD] z-10 p-1 bg-black/50 rounded-full hover:bg-black/80"
        >
          <X size={24} />
        </button>

        {/* A. KOLOM KIRI: Image */}
        <div className="w-[720px] h-[720px] flex items-center justify-center bg-black">
          <img 
            src={post.imageUrl} 
            alt="Post Detail" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* B. KOLOM KANAN: Comments Section */}
        <div className="flex-1 flex flex-col h-full p-6">
          
          {/* Header Post Owner */}
          <div className="flex items-center gap-3 mb-4 border-b border-[#181D27] pb-4">
            <img 
              src={post.author.avatarUrl || `https://ui-avatars.com/api/?name=${post.author.username}`} 
              alt={post.author.username} 
              className="w-10 h-10 rounded-full border border-[#181D27]"
            />
            <div>
              <p className="text-[#FDFDFD] font-bold text-sm">{post.author.username}</p>
              <p className="text-gray-500 text-xs">{dayjs(post.createdAt).fromNow()}</p>
            </div>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto pr-2" ref={commentMenuRef}>
            <h3 className="text-[#FDFDFD] font-bold text-md mb-4 border-b border-[#181D27] pb-2">
              Comments
            </h3>
            
            {commentsData && commentsData.length > 0 ? (
              commentsData.map((comment) => (
                <div key={comment.id} className="flex justify-between items-start mb-4 group relative">
                  <div className="flex gap-3 flex-1">
                    <img 
                      src={comment.author.avatarUrl || `https://ui-avatars.com/api/?name=${comment.author.username}`} 
                      alt={comment.author.username} 
                      className="w-8 h-8 rounded-full border border-[#181D27] shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#FDFDFD] font-bold text-sm">
                          {comment.author.username}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {dayjs(comment.createdAt).fromNow()}
                        </span>
                      </div>
                      <p className="text-[#FDFDFD] font-normal text-sm mt-1 break-all">
                        {comment.text}
                      </p>
                    </div>
                  </div>

                  {/* Menu 3 Titik (Hanya jika komentar milik user) */}
                  {comment.isMine && (
                    <div className="relative">
                      <button 
                        onClick={() => setActiveCommentMenu(activeCommentMenu === comment.id ? null : comment.id)}
                        className="text-gray-500 hover:text-[#FDFDFD] p-1 rounded-full hover:bg-[#181D27] transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                      >
                        <MoreHorizontal size={16} />
                      </button>

                      {/* Dropdown Menu */}
                      {activeCommentMenu === comment.id && (
                        <div className="absolute right-0 top-6 z-10 w-32 bg-[#0A0D12] border border-[#181D27] rounded-lg shadow-xl overflow-hidden">
                          <button
                            onClick={() => deleteCommentMutation.mutate(comment.id)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-[#181D27] transition-colors text-left"
                            disabled={deleteCommentMutation.isPending}
                          >
                            <Trash2 size={14} />
                            {deleteCommentMutation.isPending ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-4">No comments yet.</p>
            )}
          </div>

          {/* Footer Area */}
          <div className="mt-auto">
            
            {/* Actions Row */}
            <div className="pt-4 border-t border-[#181D27] mb-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-6">
                  <button 
                      onClick={() => likeMutation.mutate()}
                      className="flex items-center gap-2 focus:outline-none active:scale-110 transition-transform"
                  >
                    <img src="/love_icon.png" alt="Like" className="w-6 h-6 object-contain" />
                    <span className="text-[#FDFDFD] font-semibold text-md">
                      {post.likeCount}
                    </span>
                  </button>

                  <button className="flex items-center gap-2 focus:outline-none">
                    <img src="/Comment_icon.png" alt="Comment" className="w-6 h-6 object-contain" />
                    <span className="text-[#FDFDFD] font-semibold text-md">
                      {post.commentCount}
                    </span>
                  </button>

                  <button className="flex items-center gap-2 focus:outline-none">
                    <img src="/Share_icon.png" alt="Share" className="w-6 h-6 object-contain" />
                    <span className="text-[#FDFDFD] font-semibold text-md">
                      0
                    </span>
                  </button>
                </div>

                <button 
                  onClick={() => saveMutation.mutate()}
                  className="focus:outline-none"
                >
                  <img src="/saved_icon.png" alt="Save" className="w-6 h-6 object-contain" />
                </button>
              </div>
            </div>

            {/* ADD COMMENT SECTION */}
            <div className="flex items-center gap-2 relative">
                
                {/* 1. Emoji Button & Picker Container */}
                <div className="relative" ref={pickerRef}>
                   
                   {/* Emoji Picker Popup (Absolute Above) */}
                   {showEmojiPicker && (
                     <div 
                       className="absolute bottom-full w-auto left-0 mb-2 bg-[#0A0D12] border border-[#181D27] rounded-xl p-4 shadow-lg z-50"
                       style={{
                         
                         height: '152px',
                         display: 'grid',
                         gridTemplateColumns: 'repeat(6, 1fr)',
                         gridTemplateRows: 'repeat(3, 1fr)',
                         gap: '10px'
                       }}
                     >
                       {EMOJI_LIST.map((emoji) => (
                         <button
                           key={emoji}
                           onClick={() => handleEmojiClick(emoji)}
                           className="text-xl hover:scale-125 transition-transform flex items-center justify-center"
                         >
                           {emoji}
                         </button>
                       ))}
                     </div>
                   )}

                   {/* Toggle Button */}
                   <div 
                     onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                     className="w-12 h-12 rounded-xl border border-[#181D27] flex items-center justify-center p-2 shrink-0 cursor-pointer hover:bg-[#181D27] transition-colors"
                   >
                       <img 
                           src="/Emoji.png" 
                           alt="Emoji" 
                           className="w-full h-full object-contain" 
                           onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                       />
                   </div>
                </div>

                {/* 2. Input & Post Button */}
                <div 
                  className="w-[384px] h-12 bg-[#0A0D12] border border-[#181D27] rounded-xl flex items-center justify-between px-4 py-2"
                >
                    <input 
                        type="text" 
                        placeholder="Add Comment" 
                        className="bg-transparent border-none outline-none text-[#FDFDFD] placeholder-[#535862] text-base font-medium w-full"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') addCommentMutation.mutate();
                        }}
                    />
                    <button 
                      className={`font-medium text-base ml-2 cursor-pointer transition-colors ${commentText.trim() ? 'text-[#7F51F9] hover:text-[#5b2ed1]' : 'text-[#535862]'}`}
                      onClick={() => addCommentMutation.mutate()}
                      disabled={addCommentMutation.isPending || !commentText.trim()}
                    >
                        {addCommentMutation.isPending ? '...' : 'Post'}
                    </button>
                </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}