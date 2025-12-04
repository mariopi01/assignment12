
// // // // // // import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';
// // // // // // import { useMutation, useQueryClient } from '@tanstack/react-query';
// // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // import dayjs from 'dayjs';
// // // // // // import relativeTime from 'dayjs/plugin/relativeTime';
// // // // // // import api from '../lib/axios';

// // // // // // dayjs.extend(relativeTime);

// // // // // // interface Author {
// // // // // //   id: number;
// // // // // //   username: string;
// // // // // //   avatarUrl: string | null;
// // // // // // }

// // // // // // interface Post {
// // // // // //   id: number;
// // // // // //   imageUrl: string;
// // // // // //   caption: string;
// // // // // //   createdAt: string;
// // // // // //   likeCount: number;
// // // // // //   commentCount: number;
// // // // // //   likedByMe: boolean;
// // // // // //   isSaved?: boolean;
// // // // // //   author: Author;
// // // // // // }

// // // // // // interface PostCardProps {
// // // // // //   post: Post;
// // // // // // }

// // // // // // // Tipe sederhana untuk Feed Page Structure
// // // // // // interface FeedPage {
// // // // // //   data: {
// // // // // //     items: Post[];
// // // // // //   };
// // // // // // }

// // // // // // interface InfiniteFeedData {
// // // // // //   pages: FeedPage[];
// // // // // // }

// // // // // // export default function PostCard({ post }: PostCardProps) {
// // // // // //   const queryClient = useQueryClient();
// // // // // //   const navigate = useNavigate();

// // // // // //   const likeMutation = useMutation({
// // // // // //     mutationFn: async () => {
// // // // // //       if (post.likedByMe) {
// // // // // //         return api.delete(`/api/posts/${post.id}/like`);
// // // // // //       } else {
// // // // // //         return api.post(`/api/posts/${post.id}/like`);
// // // // // //       }
// // // // // //     },
// // // // // //     onMutate: async () => {
// // // // // //       await queryClient.cancelQueries({ queryKey: ['feed'] });
// // // // // //       await queryClient.cancelQueries({ queryKey: ['post', String(post.id)] });

// // // // // //       const previousFeed = queryClient.getQueryData(['feed']);

// // // // // //       queryClient.setQueriesData({ queryKey: ['feed'] }, (oldData: unknown) => {
// // // // // //         if (!oldData) return oldData;
// // // // // //         const data = oldData as InfiniteFeedData;
        
// // // // // //         return {
// // // // // //           ...data,
// // // // // //           pages: data.pages.map((page) => ({
// // // // // //             ...page,
// // // // // //             data: {
// // // // // //               ...page.data,
// // // // // //               items: page.data.items.map((item) => {
// // // // // //                 if (item.id === post.id) {
// // // // // //                   return {
// // // // // //                     ...item,
// // // // // //                     likedByMe: !item.likedByMe,
// // // // // //                     likeCount: item.likedByMe ? item.likeCount - 1 : item.likeCount + 1,
// // // // // //                   };
// // // // // //                 }
// // // // // //                 return item;
// // // // // //               }),
// // // // // //             },
// // // // // //           })),
// // // // // //         };
// // // // // //       });

// // // // // //       return { previousFeed };
// // // // // //     },
// // // // // //     onError: (_err, _newTodo, context) => {
// // // // // //       if (context?.previousFeed) {
// // // // // //         queryClient.setQueryData(['feed'], context.previousFeed);
// // // // // //       }
// // // // // //     },
// // // // // //     onSettled: () => {
// // // // // //       queryClient.invalidateQueries({ queryKey: ['feed'] });
// // // // // //       queryClient.invalidateQueries({ queryKey: ['post', String(post.id)] });
// // // // // //       queryClient.invalidateQueries({ queryKey: ['my-likes'] });
// // // // // //     },
// // // // // //   });

// // // // // //   const saveMutation = useMutation({
// // // // // //     mutationFn: async () => {
// // // // // //       if (post.isSaved) {
// // // // // //         return api.delete(`/api/posts/${post.id}/save`);
// // // // // //       } else {
// // // // // //         return api.post(`/api/posts/${post.id}/save`);
// // // // // //       }
// // // // // //     },
// // // // // //     onMutate: async () => {
// // // // // //       await queryClient.cancelQueries({ queryKey: ['feed'] });
// // // // // //       const previousFeed = queryClient.getQueryData(['feed']);

// // // // // //       queryClient.setQueriesData({ queryKey: ['feed'] }, (oldData: unknown) => {
// // // // // //         if (!oldData) return oldData;
// // // // // //         const data = oldData as InfiniteFeedData;

// // // // // //         return {
// // // // // //           ...data,
// // // // // //           pages: data.pages.map((page) => ({
// // // // // //             ...page,
// // // // // //             data: {
// // // // // //               ...page.data,
// // // // // //               items: page.data.items.map((item) => {
// // // // // //                 if (item.id === post.id) {
// // // // // //                   return { ...item, isSaved: !item.isSaved };
// // // // // //                 }
// // // // // //                 return item;
// // // // // //               }),
// // // // // //             },
// // // // // //           })),
// // // // // //         };
// // // // // //       });

// // // // // //       return { previousFeed };
// // // // // //     },
// // // // // //     onError: (_err, _variables, context) => {
// // // // // //       if (context?.previousFeed) {
// // // // // //         queryClient.setQueryData(['feed'], context.previousFeed);
// // // // // //       }
// // // // // //     },
// // // // // //     onSettled: () => {
// // // // // //       queryClient.invalidateQueries({ queryKey: ['feed'] });
// // // // // //       queryClient.invalidateQueries({ queryKey: ['saved-posts'] });
// // // // // //     },
// // // // // //   });

// // // // // //   return (
// // // // // //     <div className="bg-[#000000]  border-b md:border-b md:my-4 shadow-sm overflow-hidden">
// // // // // //       <div className="p-4 flex items-center justify-between">
// // // // // //         <div 
// // // // // //           className="flex items-center gap-3 text-[#FDFDFD] cursor-pointer"
// // // // // //           onClick={() => navigate(`/users/${post.author.username}`)}
// // // // // //         >
// // // // // //           <img 
// // // // // //             src={post.author.avatarUrl || "https://ui-avatars.com/api/?name=" + post.author.username} 
// // // // // //             alt={post.author.username} 
// // // // // //             className="w-10 h-10 rounded-full object-cover border border-gray-200"
// // // // // //           />
// // // // // //           <div>
// // // // // //             <p className="font-semibold text-sm hover:underline">{post.author.username}</p>
// // // // // //             <p className="text-xs text-gray-500">{dayjs(post.createdAt).fromNow()}</p>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <div 
// // // // // //         className="w-full bg-[#000000] aspect-square cursor-pointer"
// // // // // //         onClick={() => navigate(`/posts/${post.id}`)}
// // // // // //       >
// // // // // //         <img 
// // // // // //             src={post.imageUrl} 
// // // // // //             alt={post.caption} 
// // // // // //             className="w-[600px] rounded-md bg-[#000000] h-[600px] object-fill"
// // // // // //             loading="lazy"
// // // // // //         />
// // // // // //       </div>

// // // // // //       <div className="p-4">
// // // // // //         <div className="flex justify-between mb-3">
// // // // // //           <div className="flex gap-4">
// // // // // //             <button 
// // // // // //                 onClick={() => likeMutation.mutate()}
// // // // // //                 className={`transition-transform active:scale-110 focus:outline-none ${
// // // // // //                     post.likedByMe ? 'text-red-500' : 'text-gray-600 hover:text-gray-900'
// // // // // //                 }`}
// // // // // //                 title={post.likedByMe ? "Unlike" : "Like"}
// // // // // //             >
// // // // // //               <Heart 
// // // // // //                 className={post.likedByMe ? "fill-current" : ""} 
// // // // // //                 size={26} 
// // // // // //                 strokeWidth={post.likedByMe ? 0 : 2}
// // // // // //               />
// // // // // //             </button>

// // // // // //             <button 
// // // // // //                 onClick={() => navigate(`/posts/${post.id}`)}
// // // // // //                 className="text-gray-600 hover:text-gray-900 transition-colors"
// // // // // //             >
// // // // // //               <MessageCircle size={26} />
// // // // // //             </button>

// // // // // //             <button className="text-gray-600 hover:text-gray-900 transition-colors">
// // // // // //               <Share2 size={26} />
// // // // // //             </button>
// // // // // //           </div>

// // // // // //           <button 
// // // // // //             onClick={() => saveMutation.mutate()}
// // // // // //             className={`transition-colors focus:outline-none ${
// // // // // //                 post.isSaved ? 'text-black' : 'text-gray-600 hover:text-gray-900'
// // // // // //             }`}
// // // // // //             title={post.isSaved ? "Unsave" : "Save"}
// // // // // //           >
// // // // // //              <Bookmark 
// // // // // //                 className={post.isSaved ? "fill-current" : ""} 
// // // // // //                 size={26} 
// // // // // //             />
// // // // // //           </button>
// // // // // //         </div>

// // // // // //         <p className="font-bold text-sm mb-1">
// // // // // //             {post.likeCount > 0 ? `${post.likeCount} likes` : 'Be the first to like'}
// // // // // //         </p>

// // // // // //         <div className=" flex flex-col text-sm mb-2">
// // // // // //           <span 
// // // // // //             className="font-bold mr-2 text-[#FDFDFD] cursor-pointer hover:underline"
// // // // // //             onClick={() => navigate(`/users/${post.author.username}`)}
// // // // // //           >
// // // // // //             {post.author.username}
// // // // // //           </span>
// // // // // //           <span className="text-[#FDFDFD] ">{post.caption}</span>
// // // // // //         </div>

// // // // // //         {post.commentCount > 0 && (
// // // // // //             <button 
// // // // // //                 onClick={() => navigate(`/posts/${post.id}`)}
// // // // // //                 className="text-gray-500 text-sm mt-1 hover:text-gray-700"
// // // // // //             >
// // // // // //                 View all {post.commentCount} comments
// // // // // //             </button>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // import { useMutation, useQueryClient } from '@tanstack/react-query';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import dayjs from 'dayjs';
// // // // // import relativeTime from 'dayjs/plugin/relativeTime';
// // // // // import api from '../lib/axios';

// // // // // dayjs.extend(relativeTime);

// // // // // interface Author {
// // // // //   id: number;
// // // // //   username: string;
// // // // //   avatarUrl: string | null;
// // // // // }

// // // // // interface Post {
// // // // //   id: number;
// // // // //   imageUrl: string;
// // // // //   caption: string;
// // // // //   createdAt: string;
// // // // //   likeCount: number;
// // // // //   commentCount: number;
// // // // //   likedByMe: boolean;
// // // // //   isSaved?: boolean;
// // // // //   author: Author;
// // // // // }

// // // // // interface PostCardProps {
// // // // //   post: Post;
// // // // // }

// // // // // // Tipe sederhana untuk Feed Page Structure
// // // // // interface FeedPage {
// // // // //   data: {
// // // // //     items: Post[];
// // // // //   };
// // // // // }

// // // // // interface InfiniteFeedData {
// // // // //   pages: FeedPage[];
// // // // // }

// // // // // export default function PostCard({ post }: PostCardProps) {
// // // // //   const queryClient = useQueryClient();
// // // // //   const navigate = useNavigate();

// // // // //   const likeMutation = useMutation({
// // // // //     mutationFn: async () => {
// // // // //       if (post.likedByMe) {
// // // // //         return api.delete(`/api/posts/${post.id}/like`);
// // // // //       } else {
// // // // //         return api.post(`/api/posts/${post.id}/like`);
// // // // //       }
// // // // //     },
// // // // //     onMutate: async () => {
// // // // //       await queryClient.cancelQueries({ queryKey: ['feed'] });
// // // // //       await queryClient.cancelQueries({ queryKey: ['post', String(post.id)] });

// // // // //       const previousFeed = queryClient.getQueryData(['feed']);

// // // // //       queryClient.setQueriesData({ queryKey: ['feed'] }, (oldData: unknown) => {
// // // // //         if (!oldData) return oldData;
// // // // //         const data = oldData as InfiniteFeedData;
        
// // // // //         return {
// // // // //           ...data,
// // // // //           pages: data.pages.map((page) => ({
// // // // //             ...page,
// // // // //             data: {
// // // // //               ...page.data,
// // // // //               items: page.data.items.map((item) => {
// // // // //                 if (item.id === post.id) {
// // // // //                   return {
// // // // //                     ...item,
// // // // //                     likedByMe: !item.likedByMe,
// // // // //                     likeCount: item.likedByMe ? item.likeCount - 1 : item.likeCount + 1,
// // // // //                   };
// // // // //                 }
// // // // //                 return item;
// // // // //               }),
// // // // //             },
// // // // //           })),
// // // // //         };
// // // // //       });

// // // // //       return { previousFeed };
// // // // //     },
// // // // //     onError: (_err, _newTodo, context) => {
// // // // //       if (context?.previousFeed) {
// // // // //         queryClient.setQueryData(['feed'], context.previousFeed);
// // // // //       }
// // // // //     },
// // // // //     onSettled: () => {
// // // // //       queryClient.invalidateQueries({ queryKey: ['feed'] });
// // // // //       queryClient.invalidateQueries({ queryKey: ['post', String(post.id)] });
// // // // //       queryClient.invalidateQueries({ queryKey: ['my-likes'] });
// // // // //     },
// // // // //   });

// // // // //   const saveMutation = useMutation({
// // // // //     mutationFn: async () => {
// // // // //       if (post.isSaved) {
// // // // //         return api.delete(`/api/posts/${post.id}/save`);
// // // // //       } else {
// // // // //         return api.post(`/api/posts/${post.id}/save`);
// // // // //       }
// // // // //     },
// // // // //     onMutate: async () => {
// // // // //       await queryClient.cancelQueries({ queryKey: ['feed'] });
// // // // //       const previousFeed = queryClient.getQueryData(['feed']);

// // // // //       queryClient.setQueriesData({ queryKey: ['feed'] }, (oldData: unknown) => {
// // // // //         if (!oldData) return oldData;
// // // // //         const data = oldData as InfiniteFeedData;

// // // // //         return {
// // // // //           ...data,
// // // // //           pages: data.pages.map((page) => ({
// // // // //             ...page,
// // // // //             data: {
// // // // //               ...page.data,
// // // // //               items: page.data.items.map((item) => {
// // // // //                 if (item.id === post.id) {
// // // // //                   return { ...item, isSaved: !item.isSaved };
// // // // //                 }
// // // // //                 return item;
// // // // //               }),
// // // // //             },
// // // // //           })),
// // // // //         };
// // // // //       });

// // // // //       return { previousFeed };
// // // // //     },
// // // // //     onError: (_err, _variables, context) => {
// // // // //       if (context?.previousFeed) {
// // // // //         queryClient.setQueryData(['feed'], context.previousFeed);
// // // // //       }
// // // // //     },
// // // // //     onSettled: () => {
// // // // //       queryClient.invalidateQueries({ queryKey: ['feed'] });
// // // // //       queryClient.invalidateQueries({ queryKey: ['saved-posts'] });
// // // // //     },
// // // // //   });

// // // // //   return (
// // // // //     <div className="bg-[#000000] border-b md:border-b md:my-4 shadow-sm overflow-hidden">
// // // // //       <div className="p-4 flex items-center justify-between">
// // // // //         <div 
// // // // //           className="flex items-center gap-3 text-[#FDFDFD] cursor-pointer"
// // // // //           onClick={() => navigate(`/users/${post.author.username}`)}
// // // // //         >
// // // // //           <img 
// // // // //             src={post.author.avatarUrl || "https://ui-avatars.com/api/?name=" + post.author.username} 
// // // // //             alt={post.author.username} 
// // // // //             className="w-10 h-10 rounded-full object-cover border border-gray-200"
// // // // //           />
// // // // //           <div>
// // // // //             <p className="font-semibold text-sm hover:underline">{post.author.username}</p>
// // // // //             <p className="text-xs text-gray-500">{dayjs(post.createdAt).fromNow()}</p>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div 
// // // // //         className="w-full bg-[#000000] aspect-square cursor-pointer"
// // // // //         onClick={() => navigate(`/posts/${post.id}`)}
// // // // //       >
// // // // //         <img 
// // // // //             src={post.imageUrl} 
// // // // //             alt={post.caption} 
// // // // //             className="w-[600px] rounded-md bg-[#000000] h-[600px] object-fill"
// // // // //             loading="lazy"
// // // // //         />
// // // // //       </div>

// // // // //       <div className="p-4">
// // // // //         <div className="flex justify-between mb-3">
// // // // //           <div className="flex gap-6">
// // // // //             {/* 1. Like Button (Image + Count) */}
// // // // //             <button 
// // // // //                 onClick={() => likeMutation.mutate()}
// // // // //                 className="flex items-center gap-2 focus:outline-none active:scale-110 transition-transform"
// // // // //                 title={post.likedByMe ? "Unlike" : "Like"}
// // // // //             >
// // // // //               <img src="/love_icon.png" alt="Like" className="w-6 h-6 object-contain" />
// // // // //               <span className="text-[#FDFDFD] font-semibold text-base tracking-tight leading-6">
// // // // //                 {post.likeCount}
// // // // //               </span>
// // // // //             </button>

// // // // //             {/* 2. Comment Button (Image + Count) */}
// // // // //             <button 
// // // // //                 onClick={() => navigate(`/posts/${post.id}`)}
// // // // //                 className="flex items-center gap-2 focus:outline-none"
// // // // //             >
// // // // //               <img src="/Comment_icon.png" alt="Comment" className="w-6 h-6 object-contain" />
// // // // //               <span className="text-[#FDFDFD] font-semibold text-base tracking-tight leading-6">
// // // // //                 {post.commentCount}
// // // // //               </span>
// // // // //             </button>

// // // // //             {/* 3. Share Button (Image + Count) */}
// // // // //             <button className="flex items-center gap-2 focus:outline-none">
// // // // //               <img src="/Share_icon.png" alt="Share" className="w-6 h-6 object-contain" />
// // // // //               <span className="text-[#FDFDFD] font-semibold text-base tracking-tight leading-6">
// // // // //                 0
// // // // //               </span>
// // // // //             </button>
// // // // //           </div>

// // // // //           {/* 4. Bookmark Button (Image only) */}
// // // // //           <button 
// // // // //             onClick={() => saveMutation.mutate()}
// // // // //             className="focus:outline-none"
// // // // //             title={post.isSaved ? "Unsave" : "Save"}
// // // // //           >
// // // // //              <img src="/saved_icon.png" alt="Save" className="w-6 h-6 object-contain" />
// // // // //           </button>
// // // // //         </div>

// // // // //         <p className="font-bold text-sm mb-1 text-[#FDFDFD]">
// // // // //             {post.likeCount > 0 ? `${post.likeCount} likes` : 'Be the first to like'}
// // // // //         </p>

// // // // //         <div className="flex flex-col text-sm mb-2">
// // // // //           <span 
// // // // //             className="font-bold mr-2 text-[#FDFDFD] cursor-pointer hover:underline"
// // // // //             onClick={() => navigate(`/users/${post.author.username}`)}
// // // // //           >
// // // // //             {post.author.username}
// // // // //           </span>
// // // // //           <span className="text-[#FDFDFD]">{post.caption}</span>
// // // // //         </div>

// // // // //         {/* 5. Show More Button */}
// // // // //         {post.commentCount > 0 && (
// // // // //             <button 
// // // // //                 onClick={() => navigate(`/posts/${post.id}`)}
// // // // //                 className="text-[#7F51F9] font-semibold text-base mt-1 hover:underline text-left tracking-tight"
// // // // //             >
// // // // //                 Show More
// // // // //             </button>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // import { useState } from 'react';
// // // // import { useMutation, useQueryClient } from '@tanstack/react-query';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import dayjs from 'dayjs';
// // // // import relativeTime from 'dayjs/plugin/relativeTime';
// // // // import api from '../lib/axios';
// // // // import CommentSection from './CommentSection'; // Import CommentSection

// // // // dayjs.extend(relativeTime);

// // // // interface Author {
// // // //   id: number;
// // // //   username: string;
// // // //   avatarUrl: string | null;
// // // // }

// // // // interface Post {
// // // //   id: number;
// // // //   imageUrl: string;
// // // //   caption: string;
// // // //   createdAt: string;
// // // //   likeCount: number;
// // // //   commentCount: number;
// // // //   likedByMe: boolean;
// // // //   isSaved?: boolean;
// // // //   author: Author;
// // // // }

// // // // interface PostCardProps {
// // // //   post: Post;
// // // // }

// // // // // Tipe sederhana untuk Feed Page Structure
// // // // interface FeedPage {
// // // //   data: {
// // // //     items: Post[];
// // // //   };
// // // // }

// // // // interface InfiniteFeedData {
// // // //   pages: FeedPage[];
// // // // }

// // // // export default function PostCard({ post }: PostCardProps) {
// // // //   const queryClient = useQueryClient();
// // // //   const navigate = useNavigate();
// // // //   const [showComments, setShowComments] = useState(false); // State untuk toggle komentar

// // // //   const likeMutation = useMutation({
// // // //     mutationFn: async () => {
// // // //       if (post.likedByMe) {
// // // //         return api.delete(`/api/posts/${post.id}/like`);
// // // //       } else {
// // // //         return api.post(`/api/posts/${post.id}/like`);
// // // //       }
// // // //     },
// // // //     onMutate: async () => {
// // // //       await queryClient.cancelQueries({ queryKey: ['feed'] });
// // // //       await queryClient.cancelQueries({ queryKey: ['post', String(post.id)] });

// // // //       const previousFeed = queryClient.getQueryData(['feed']);

// // // //       queryClient.setQueriesData({ queryKey: ['feed'] }, (oldData: unknown) => {
// // // //         if (!oldData) return oldData;
// // // //         const data = oldData as InfiniteFeedData;
        
// // // //         return {
// // // //           ...data,
// // // //           pages: data.pages.map((page) => ({
// // // //             ...page,
// // // //             data: {
// // // //               ...page.data,
// // // //               items: page.data.items.map((item) => {
// // // //                 if (item.id === post.id) {
// // // //                   return {
// // // //                     ...item,
// // // //                     likedByMe: !item.likedByMe,
// // // //                     likeCount: item.likedByMe ? item.likeCount - 1 : item.likeCount + 1,
// // // //                   };
// // // //                 }
// // // //                 return item;
// // // //               }),
// // // //             },
// // // //           })),
// // // //         };
// // // //       });

// // // //       return { previousFeed };
// // // //     },
// // // //     onError: (_err, _newTodo, context) => {
// // // //       if (context?.previousFeed) {
// // // //         queryClient.setQueryData(['feed'], context.previousFeed);
// // // //       }
// // // //     },
// // // //     onSettled: () => {
// // // //       queryClient.invalidateQueries({ queryKey: ['feed'] });
// // // //       queryClient.invalidateQueries({ queryKey: ['post', String(post.id)] });
// // // //       queryClient.invalidateQueries({ queryKey: ['my-likes'] });
// // // //     },
// // // //   });

// // // //   const saveMutation = useMutation({
// // // //     mutationFn: async () => {
// // // //       if (post.isSaved) {
// // // //         return api.delete(`/api/posts/${post.id}/save`);
// // // //       } else {
// // // //         return api.post(`/api/posts/${post.id}/save`);
// // // //       }
// // // //     },
// // // //     onMutate: async () => {
// // // //       await queryClient.cancelQueries({ queryKey: ['feed'] });
// // // //       const previousFeed = queryClient.getQueryData(['feed']);

// // // //       queryClient.setQueriesData({ queryKey: ['feed'] }, (oldData: unknown) => {
// // // //         if (!oldData) return oldData;
// // // //         const data = oldData as InfiniteFeedData;

// // // //         return {
// // // //           ...data,
// // // //           pages: data.pages.map((page) => ({
// // // //             ...page,
// // // //             data: {
// // // //               ...page.data,
// // // //               items: page.data.items.map((item) => {
// // // //                 if (item.id === post.id) {
// // // //                   return { ...item, isSaved: !item.isSaved };
// // // //                 }
// // // //                 return item;
// // // //               }),
// // // //             },
// // // //           })),
// // // //         };
// // // //       });

// // // //       return { previousFeed };
// // // //     },
// // // //     onError: (_err, _variables, context) => {
// // // //       if (context?.previousFeed) {
// // // //         queryClient.setQueryData(['feed'], context.previousFeed);
// // // //       }
// // // //     },
// // // //     onSettled: () => {
// // // //       queryClient.invalidateQueries({ queryKey: ['feed'] });
// // // //       queryClient.invalidateQueries({ queryKey: ['saved-posts'] });
// // // //     },
// // // //   });

// // // //   return (
// // // //     <div className="bg-[#000000] border-b md:border-b md:my-4 shadow-sm overflow-hidden">
// // // //       <div className="p-4 flex items-center justify-between">
// // // //         <div 
// // // //           className="flex items-center gap-3 text-[#FDFDFD] cursor-pointer"
// // // //           onClick={() => navigate(`/users/${post.author.username}`)}
// // // //         >
// // // //           <img 
// // // //             src={post.author.avatarUrl || "https://ui-avatars.com/api/?name=" + post.author.username} 
// // // //             alt={post.author.username} 
// // // //             className="w-10 h-10 rounded-full object-cover border border-gray-200"
// // // //           />
// // // //           <div>
// // // //             <p className="font-semibold text-sm hover:underline">{post.author.username}</p>
// // // //             <p className="text-xs text-gray-500">{dayjs(post.createdAt).fromNow()}</p>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <div 
// // // //         className="w-full bg-[#000000] aspect-square cursor-pointer"
// // // //         onClick={() => navigate(`/posts/${post.id}`)}
// // // //       >
// // // //         <img 
// // // //             src={post.imageUrl} 
// // // //             alt={post.caption} 
// // // //             className="w-[600px] rounded-md bg-[#000000] h-[600px] object-fill"
// // // //             loading="lazy"
// // // //         />
// // // //       </div>

// // // //       <div className="p-4">
// // // //         <div className="flex justify-between mb-3">
// // // //           <div className="flex gap-6">
// // // //             {/* 1. Like Button (Image + Count) */}
// // // //             <button 
// // // //                 onClick={() => likeMutation.mutate()}
// // // //                 className="flex items-center gap-2 focus:outline-none active:scale-110 transition-transform"
// // // //                 title={post.likedByMe ? "Unlike" : "Like"}
// // // //             >
// // // //               <img src="/love_icon.png" alt="Like" className="w-6 h-6 object-contain" />
// // // //               <span className="text-[#FDFDFD] font-semibold text-base tracking-tight leading-6">
// // // //                 {post.likeCount}
// // // //               </span>
// // // //             </button>

// // // //             {/* 2. Comment Button (Image + Count) */}
// // // //             <button 
// // // //                 onClick={() => setShowComments(!showComments)} // Toggle comments juga saat ikon diklik
// // // //                 className="flex items-center gap-2 focus:outline-none"
// // // //             >
// // // //               <img src="/Comment_icon.png" alt="Comment" className="w-6 h-6 object-contain" />
// // // //               <span className="text-[#FDFDFD] font-semibold text-base tracking-tight leading-6">
// // // //                 {post.commentCount}
// // // //               </span>
// // // //             </button>

// // // //             {/* 3. Share Button (Image + Count) */}
// // // //             <button className="flex items-center gap-2 focus:outline-none">
// // // //               <img src="/Share_icon.png" alt="Share" className="w-6 h-6 object-contain" />
// // // //               <span className="text-[#FDFDFD] font-semibold text-base tracking-tight leading-6">
// // // //                 0
// // // //               </span>
// // // //             </button>
// // // //           </div>

// // // //           {/* 4. Bookmark Button (Image only) */}
// // // //           <button 
// // // //             onClick={() => saveMutation.mutate()}
// // // //             className="focus:outline-none"
// // // //             title={post.isSaved ? "Unsave" : "Save"}
// // // //           >
// // // //              <img src="/saved_icon.png" alt="Save" className="w-6 h-6 object-contain" />
// // // //           </button>
// // // //         </div>

        

// // // //         <div className="flex flex-col text-sm mb-2">
// // // //           <span 
// // // //             className="font-bold mr-2 text-[#FDFDFD] cursor-pointer hover:underline"
// // // //             onClick={() => navigate(`/users/${post.author.username}`)}
// // // //           >
// // // //             {post.author.username}
// // // //           </span>
// // // //           <span className="text-[#FDFDFD]">{post.caption}</span>
// // // //         </div>

// // // //         {/* 5. Show More Button (Toggle Comments) */}
// // // //         {post.commentCount > 0 && (
// // // //             <button 
// // // //                 onClick={() => setShowComments(!showComments)}
// // // //                 className="text-[#7F51F9] font-semibold text-base mt-1 hover:underline text-left tracking-tight"
// // // //             >
// // // //                 {showComments ? 'Hide comments' : 'Show More'}
// // // //             </button>
// // // //         )}

// // // //         {/* Comment Section */}
// // // //         {showComments && (
// // // //           <div className="mt-4 border-t border-gray-800 pt-4">
// // // //             <CommentSection postId={post.id} />
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // import { useState } from 'react';
// // // import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// // // import { useNavigate } from 'react-router-dom';
// // // import dayjs from 'dayjs';
// // // import relativeTime from 'dayjs/plugin/relativeTime';
// // // import { X } from 'lucide-react';
// // // import api from '../lib/axios';

// // // dayjs.extend(relativeTime);

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

// // // interface PostCardProps {
// // //   post: Post;
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

// // // export default function PostCard({ post }: PostCardProps) {
// // //   const queryClient = useQueryClient();
// // //   const navigate = useNavigate();
// // //   const [isFloatingOpen, setIsFloatingOpen] = useState(false);

// // //   // Fetch comments untuk floating detail
// // //   const { data: commentsData } = useQuery({
// // //     queryKey: ['comments', post.id],
// // //     queryFn: async () => {
// // //       const res = await api.get(`/api/posts/${post.id}/comments?page=1&limit=10`);
// // //       return res.data.data.comments as Comment[];
// // //     },
// // //     enabled: isFloatingOpen, // Fetch hanya saat modal dibuka
// // //   });

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
// // //         const data = oldData as InfiniteFeedData;
        
// // //         return {
// // //           ...data,
// // //           pages: data.pages.map((page) => ({
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
// // //     onError: (_err, _newTodo, context) => {
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
// // //         const data = oldData as InfiniteFeedData;

// // //         return {
// // //           ...data,
// // //           pages: data.pages.map((page) => ({
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
// // //     onError: (_err, _variables, context) => {
// // //       if (context?.previousFeed) {
// // //         queryClient.setQueryData(['feed'], context.previousFeed);
// // //       }
// // //     },
// // //     onSettled: () => {
// // //       queryClient.invalidateQueries({ queryKey: ['feed'] });
// // //       queryClient.invalidateQueries({ queryKey: ['saved-posts'] });
// // //     },
// // //   });

// // //   return (
// // //     <>
// // //       <div className="bg-[#000000] border-b md:border-b md:my-4 shadow-sm overflow-hidden">
// // //         <div className="p-4 flex items-center justify-between">
// // //           <div 
// // //             className="flex items-center gap-3 text-[#FDFDFD] cursor-pointer"
// // //             onClick={() => navigate(`/users/${post.author.username}`)}
// // //           >
// // //             <img 
// // //               src={post.author.avatarUrl || "https://ui-avatars.com/api/?name=" + post.author.username} 
// // //               alt={post.author.username} 
// // //               className="w-10 h-10 rounded-full object-cover border border-gray-200"
// // //             />
// // //             <div>
// // //               <p className="font-semibold text-sm hover:underline">{post.author.username}</p>
// // //               <p className="text-xs text-gray-500">{dayjs(post.createdAt).fromNow()}</p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div 
// // //           className="w-full bg-[#000000] aspect-square cursor-pointer"
// // //           onClick={() => setIsFloatingOpen(true)}
// // //         >
// // //           <img 
// // //               src={post.imageUrl} 
// // //               alt={post.caption} 
// // //               className="w-[600px] rounded-md bg-[#000000] h-[600px] object-fill"
// // //               loading="lazy"
// // //           />
// // //         </div>

// // //         <div className="p-4">
// // //           <div className="flex justify-between mb-3">
// // //             <div className="flex gap-6">
// // //               {/* 1. Like Button */}
// // //               <button 
// // //                   onClick={() => likeMutation.mutate()}
// // //                   className="flex items-center gap-2 focus:outline-none active:scale-110 transition-transform"
// // //                   title={post.likedByMe ? "Unlike" : "Like"}
// // //               >
// // //                 <img src="/love_icon.png" alt="Like" className="w-6 h-6 object-contain" />
// // //                 <span className="text-[#FDFDFD] font-semibold text-base tracking-tight leading-6">
// // //                   {post.likeCount}
// // //                 </span>
// // //               </button>

// // //               {/* 2. Comment Button - Opens Floating Post Detail */}
// // //               <button 
// // //                   onClick={() => setIsFloatingOpen(true)}
// // //                   className="flex items-center gap-2 focus:outline-none"
// // //               >
// // //                 <img src="/Comment_icon.png" alt="Comment" className="w-6 h-6 object-contain" />
// // //                 <span className="text-[#FDFDFD] font-semibold text-base tracking-tight leading-6">
// // //                   {post.commentCount}
// // //                 </span>
// // //               </button>

// // //               {/* 3. Share Button */}
// // //               <button className="flex items-center gap-2 focus:outline-none">
// // //                 <img src="/Share_icon.png" alt="Share" className="w-6 h-6 object-contain" />
// // //                 <span className="text-[#FDFDFD] font-semibold text-base tracking-tight leading-6">
// // //                   0
// // //                 </span>
// // //               </button>
// // //             </div>

// // //             {/* 4. Bookmark Button */}
// // //             <button 
// // //               onClick={() => saveMutation.mutate()}
// // //               className="focus:outline-none"
// // //               title={post.isSaved ? "Unsave" : "Save"}
// // //             >
// // //               <img src="/saved_icon.png" alt="Save" className="w-6 h-6 object-contain" />
// // //             </button>
// // //           </div>

// // //           <p className="font-bold text-sm mb-1 text-[#FDFDFD]">
// // //               {post.likeCount > 0 ? `${post.likeCount} likes` : 'Be the first to like'}
// // //           </p>

// // //           <div className="flex flex-col text-sm mb-2">
// // //             <span 
// // //               className="font-bold mr-2 text-[#FDFDFD] cursor-pointer hover:underline"
// // //               onClick={() => navigate(`/users/${post.author.username}`)}
// // //             >
// // //               {post.author.username}
// // //             </span>
// // //             <span className="text-[#FDFDFD]">{post.caption}</span>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* FLOATING POST DETAIL PAGE (MODAL) */}
// // //       {isFloatingOpen && (
// // //         <div className="fixed inset-0 my-1 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
// // //           <div 
// // //             className="relative bg-[#000000] border border-[#181D27] rounded-xl overflow-hidden flex"
// // //             style={{ width: '1200px', height: '768px', gap: '24px' }}
// // //           >
// // //             {/* Close Button */}
// // //             <button 
// // //               onClick={() => setIsFloatingOpen(false)}
// // //               className="absolute top-4 right-4 text-[#FDFDFD] z-10 p-1 bg-black/50 rounded-full hover:bg-black/80"
// // //             >
// // //               <X size={24} />
// // //             </button>

// // //             {/* A. KOLOM KIRI: Image */}
// // //             <div className="w-[720px] h-[720px] flex items-center justify-center bg-black">
// // //               <img 
// // //                 src={post.imageUrl} 
// // //                 alt="Post Detail" 
// // //                 className="w-full h-full object-cover"
// // //               />
// // //             </div>

// // //             {/* B. KOLOM KANAN: Comments Section */}
// // //             <div className="flex-1 flex flex-col h-full p-6">
              
// // //               {/* Header Post Owner */}
// // //               <div className="flex items-center gap-3 mb-4 border-b border-[#181D27] pb-4">
// // //                 <img 
// // //                   src={post.author.avatarUrl || `https://ui-avatars.com/api/?name=${post.author.username}`} 
// // //                   alt={post.author.username} 
// // //                   className="w-10 h-10 rounded-full border border-[#181D27]"
// // //                 />
// // //                 <div>
// // //                   <p className="text-[#FDFDFD] font-bold text-sm">{post.author.username}</p>
// // //                   <p className="text-gray-500 text-xs">{dayjs(post.createdAt).fromNow()}</p>
// // //                 </div>
// // //               </div>

// // //               {/* Comments List (Scrollable) */}
// // //               <div className="flex-1 overflow-y-auto pr-2">
// // //                 <h3 className="text-[#FDFDFD] font-bold text-md mb-4 border-b border-[#181D27] pb-2">
// // //                   Comments
// // //                 </h3>
                
// // //                 {commentsData && commentsData.length > 0 ? (
// // //                   commentsData.map((comment) => (
// // //                     <div key={comment.id} className="flex gap-3 mb-4">
// // //                       <img 
// // //                         src={comment.author.avatarUrl || `https://ui-avatars.com/api/?name=${comment.author.username}`} 
// // //                         alt={comment.author.username} 
// // //                         className="w-8 h-8 rounded-full border border-[#181D27]"
// // //                       />
// // //                       <div>
// // //                         <div className="flex items-center gap-2">
// // //                           <span className="text-[#FDFDFD] font-bold text-sm">
// // //                             {comment.author.username}
// // //                           </span>
// // //                           <span className="text-gray-500 text-xs">
// // //                             {dayjs(comment.createdAt).fromNow()}
// // //                           </span>
// // //                         </div>
// // //                         <p className="text-[#FDFDFD] font-normal text-sm mt-1">
// // //                           {comment.text}
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                   ))
// // //                 ) : (
// // //                   <p className="text-gray-500 text-center mt-4">No comments yet.</p>
// // //                 )}
// // //               </div>

// // //               {/* Footer Actions (Like, Comment, Share, Save) */}
// // //               <div className="mt-auto pt-4 border-t border-[#181D27]">
// // //                 <div className="flex justify-between items-center">
// // //                   <div className="flex gap-6">
// // //                     <button 
// // //                         onClick={() => likeMutation.mutate()}
// // //                         className="flex items-center gap-2 focus:outline-none active:scale-110 transition-transform"
// // //                     >
// // //                       <img src="/love_icon.png" alt="Like" className="w-6 h-6 object-contain" />
// // //                       <span className="text-[#FDFDFD] font-semibold text-md">
// // //                         {post.likeCount}
// // //                       </span>
// // //                     </button>

// // //                     <button className="flex items-center gap-2 focus:outline-none">
// // //                       <img src="/Comment_icon.png" alt="Comment" className="w-6 h-6 object-contain" />
// // //                       <span className="text-[#FDFDFD] font-semibold text-md">
// // //                         {post.commentCount}
// // //                       </span>
// // //                     </button>

// // //                     <button className="flex items-center gap-2 focus:outline-none">
// // //                       <img src="/Share_icon.png" alt="Share" className="w-6 h-6 object-contain" />
// // //                       <span className="text-[#FDFDFD] font-semibold text-md">
// // //                         0
// // //                       </span>
// // //                     </button>
// // //                   </div>

// // //                   <button 
// // //                     onClick={() => saveMutation.mutate()}
// // //                     className="focus:outline-none"
// // //                   >
// // //                     <img src="/saved_icon.png" alt="Save" className="w-6 h-6 object-contain" />
// // //                   </button>
// // //                 </div>
// // //               </div>

// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // }

// // import { useState } from 'react';
// // import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// // import { useNavigate } from 'react-router-dom';
// // import dayjs from 'dayjs';
// // import relativeTime from 'dayjs/plugin/relativeTime';
// // import { X } from 'lucide-react';
// // import api from '../lib/axios';

// // dayjs.extend(relativeTime);

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

// // interface PostCardProps {
// //   post: Post;
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

// // export default function PostCard({ post }: PostCardProps) {
// //   const queryClient = useQueryClient();
// //   const navigate = useNavigate();
// //   const [isFloatingOpen, setIsFloatingOpen] = useState(false);

// //   // Fetch comments untuk floating detail
// //   const { data: commentsData } = useQuery({
// //     queryKey: ['comments', post.id],
// //     queryFn: async () => {
// //       const res = await api.get(`/api/posts/${post.id}/comments?page=1&limit=10`);
// //       return res.data.data.comments as Comment[];
// //     },
// //     enabled: isFloatingOpen, // Fetch hanya saat modal dibuka
// //   });

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
// //         const data = oldData as InfiniteFeedData;
        
// //         return {
// //           ...data,
// //           pages: data.pages.map((page) => ({
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
// //     onError: (_err, _newTodo, context) => {
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
// //         const data = oldData as InfiniteFeedData;

// //         return {
// //           ...data,
// //           pages: data.pages.map((page) => ({
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
// //     onError: (_err, _variables, context) => {
// //       if (context?.previousFeed) {
// //         queryClient.setQueryData(['feed'], context.previousFeed);
// //       }
// //     },
// //     onSettled: () => {
// //       queryClient.invalidateQueries({ queryKey: ['feed'] });
// //       queryClient.invalidateQueries({ queryKey: ['saved-posts'] });
// //     },
// //   });

// //   return (
// //     <>
// //       <div className="bg-[#000000] border-b md:border-b md:my-4 shadow-sm overflow-hidden">
// //         <div className="p-4 flex items-center justify-between">
// //           <div 
// //             className="flex items-center gap-3 text-[#FDFDFD] cursor-pointer"
// //             onClick={() => navigate(`/users/${post.author.username}`)}
// //           >
// //             <img 
// //               src={post.author.avatarUrl || "https://ui-avatars.com/api/?name=" + post.author.username} 
// //               alt={post.author.username} 
// //               className="w-10 h-10 rounded-full object-cover border border-gray-200"
// //             />
// //             <div>
// //               <p className="font-semibold text-sm hover:underline">{post.author.username}</p>
// //               <p className="text-xs text-gray-500">{dayjs(post.createdAt).fromNow()}</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div 
// //           className="w-full bg-[#000000] aspect-square cursor-pointer"
// //           onClick={() => setIsFloatingOpen(true)}
// //         >
// //           <img 
// //               src={post.imageUrl} 
// //               alt={post.caption} 
// //               className="w-[600px] rounded-md bg-[#000000] h-[600px] object-fill"
// //               loading="lazy"
// //           />
// //         </div>

// //         <div className="p-4">
// //           <div className="flex justify-between mb-3">
// //             <div className="flex gap-6">
// //               {/* 1. Like Button */}
// //               <button 
// //                   onClick={() => likeMutation.mutate()}
// //                   className="flex items-center gap-2 focus:outline-none active:scale-110 transition-transform"
// //                   title={post.likedByMe ? "Unlike" : "Like"}
// //               >
// //                 <img src="/love_icon.png" alt="Like" className="w-6 h-6 object-contain" />
// //                 <span className="text-[#FDFDFD] font-semibold text-base tracking-tight leading-6">
// //                   {post.likeCount}
// //                 </span>
// //               </button>

// //               {/* 2. Comment Button - Opens Floating Post Detail */}
// //               <button 
// //                   onClick={() => setIsFloatingOpen(true)}
// //                   className="flex items-center gap-2 focus:outline-none"
// //               >
// //                 <img src="/Comment_icon.png" alt="Comment" className="w-6 h-6 object-contain" />
// //                 <span className="text-[#FDFDFD] font-semibold text-base tracking-tight leading-6">
// //                   {post.commentCount}
// //                 </span>
// //               </button>

// //               {/* 3. Share Button */}
// //               <button className="flex items-center gap-2 focus:outline-none">
// //                 <img src="/Share_icon.png" alt="Share" className="w-6 h-6 object-contain" />
// //                 <span className="text-[#FDFDFD] font-semibold text-base tracking-tight leading-6">
// //                   0
// //                 </span>
// //               </button>
// //             </div>

// //             {/* 4. Bookmark Button */}
// //             <button 
// //               onClick={() => saveMutation.mutate()}
// //               className="focus:outline-none"
// //               title={post.isSaved ? "Unsave" : "Save"}
// //             >
// //               <img src="/saved_icon.png" alt="Save" className="w-6 h-6 object-contain" />
// //             </button>
// //           </div>

// //           <p className="font-bold text-sm mb-1 text-[#FDFDFD]">
// //               {post.likeCount > 0 ? `${post.likeCount} likes` : 'Be the first to like'}
// //           </p>

// //           <div className="flex flex-col text-sm mb-2">
// //             <span 
// //               className="font-bold mr-2 text-[#FDFDFD] cursor-pointer hover:underline"
// //               onClick={() => navigate(`/users/${post.author.username}`)}
// //             >
// //               {post.author.username}
// //             </span>
// //             <span className="text-[#FDFDFD]">{post.caption}</span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* FLOATING POST DETAIL PAGE (MODAL) */}
// //       {isFloatingOpen && (
// //         // Update Wrapper: Added overflow-y-auto and removed items-center (handled by my-auto) to prevent cut-off
// //         <div className="fixed inset-0 z-50 flex justify-center bg-black/80 backdrop-blur-sm overflow-y-auto">
// //           <div 
// //             // Update Container: Added my-[30px] for 30px margin top/bottom, and my-auto for vertical centering
// //             className="relative bg-[#000000] border border-[#181D27] rounded-xl overflow-hidden flex my-[30px] shrink-0"
// //             style={{ width: '1200px', height: '768px', gap: '24px' }}
// //           >
// //             {/* Close Button */}
// //             <button 
// //               onClick={() => setIsFloatingOpen(false)}
// //               className="absolute top-4 right-4 text-[#FDFDFD] z-10 p-1 bg-black/50 rounded-full hover:bg-black/80"
// //             >
// //               <X size={24} />
// //             </button>

// //             {/* A. KOLOM KIRI: Image */}
// //             <div className="w-[720px] h-[720px] flex items-center justify-center  bg-black">
// //               <img 
// //                 src={post.imageUrl} 
// //                 alt="Post Detail" 
// //                 className="w-full h-full object-fill"
// //               />
// //             </div>

// //             {/* B. KOLOM KANAN: Comments Section */}
// //             <div className="flex-1 flex flex-col h-full p-6">
              
// //               {/* Header Post Owner */}
// //               <div className="flex items-center gap-3 mb-4 border-b border-[#181D27] pb-4">
// //                 <img 
// //                   src={post.author.avatarUrl || `https://ui-avatars.com/api/?name=${post.author.username}`} 
// //                   alt={post.author.username} 
// //                   className="w-10 h-10 rounded-full border border-[#181D27]"
// //                 />
// //                 <div>
// //                   <p className="text-[#FDFDFD] font-bold text-sm">{post.author.username}</p>
// //                   <p className="text-gray-500 text-xs">{dayjs(post.createdAt).fromNow()}</p>
// //                 </div>
// //               </div>

// //               {/* Comments List (Scrollable) */}
// //               <div className="flex-1 overflow-y-auto pr-2">
// //                 <h3 className="text-[#FDFDFD] font-bold text-md mb-4 border-b border-[#181D27] pb-2">
// //                   Comments
// //                 </h3>
                
// //                 {commentsData && commentsData.length > 0 ? (
// //                   commentsData.map((comment) => (
// //                     <div key={comment.id} className="flex gap-3 mb-4">
// //                       <img 
// //                         src={comment.author.avatarUrl || `https://ui-avatars.com/api/?name=${comment.author.username}`} 
// //                         alt={comment.author.username} 
// //                         className="w-8 h-8 rounded-full border border-[#181D27]"
// //                       />
// //                       <div>
// //                         <div className="flex items-center gap-2">
// //                           <span className="text-[#FDFDFD] font-bold text-sm">
// //                             {comment.author.username}
// //                           </span>
// //                           <span className="text-gray-500 text-xs">
// //                             {dayjs(comment.createdAt).fromNow()}
// //                           </span>
// //                         </div>
// //                         <p className="text-[#FDFDFD] font-normal text-sm mt-1">
// //                           {comment.text}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <p className="text-gray-500 text-center mt-4">No comments yet.</p>
// //                 )}
// //               </div>

// //               {/* Footer Actions (Like, Comment, Share, Save) */}
// //               <div className="mt-auto pt-4 border-t border-[#181D27]">
// //                 <div className="flex justify-between items-center">
// //                   <div className="flex gap-6">
// //                     <button 
// //                         onClick={() => likeMutation.mutate()}
// //                         className="flex items-center gap-2 focus:outline-none active:scale-110 transition-transform"
// //                     >
// //                       <img src="/love_icon.png" alt="Like" className="w-6 h-6 object-contain" />
// //                       <span className="text-[#FDFDFD] font-semibold text-md">
// //                         {post.likeCount}
// //                       </span>
// //                     </button>

// //                     <button className="flex items-center gap-2 focus:outline-none">
// //                       <img src="/Comment_icon.png" alt="Comment" className="w-6 h-6 object-contain" />
// //                       <span className="text-[#FDFDFD] font-semibold text-md">
// //                         {post.commentCount}
// //                       </span>
// //                     </button>

// //                     <button className="flex items-center gap-2 focus:outline-none">
// //                       <img src="/Share_icon.png" alt="Share" className="w-6 h-6 object-contain" />
// //                       <span className="text-[#FDFDFD] font-semibold text-md">
// //                         0
// //                       </span>
// //                     </button>
// //                   </div>

// //                   <button 
// //                     onClick={() => saveMutation.mutate()}
// //                     className="focus:outline-none"
// //                   >
// //                     <img src="/saved_icon.png" alt="Save" className="w-6 h-6 object-contain" />
// //                   </button>
// //                 </div>
// //               </div>

// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }


// import { useState } from 'react';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import { X } from 'lucide-react';
// import api from '../lib/axios';

// dayjs.extend(relativeTime);

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

// interface PostCardProps {
//   post: Post;
// }

// interface Comment {
//   id: number;
//   text: string;
//   createdAt: string;
//   author: Author;
// }

// interface FeedPage {
//   data: {
//     items: Post[];
//   };
// }

// interface InfiniteFeedData {
//   pages: FeedPage[];
// }

// export default function PostCard({ post }: PostCardProps) {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const [isFloatingOpen, setIsFloatingOpen] = useState(false);
//   const [showComments, setShowComments] = useState(false);

//   // Fetch comments untuk floating detail
//   const { data: commentsData } = useQuery({
//     queryKey: ['comments', post.id],
//     queryFn: async () => {
//       const res = await api.get(`/api/posts/${post.id}/comments?page=1&limit=10`);
//       return res.data.data.comments as Comment[];
//     },
//     enabled: isFloatingOpen, 
//   });

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
//         const data = oldData as InfiniteFeedData;
        
//         return {
//           ...data,
//           pages: data.pages.map((page) => ({
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
//     onError: (_err, _newTodo, context) => {
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
//         const data = oldData as InfiniteFeedData;

//         return {
//           ...data,
//           pages: data.pages.map((page) => ({
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
//     onError: (_err, _variables, context) => {
//       if (context?.previousFeed) {
//         queryClient.setQueryData(['feed'], context.previousFeed);
//       }
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ['feed'] });
//       queryClient.invalidateQueries({ queryKey: ['saved-posts'] });
//     },
//   });

//   return (
//     <>
//       <div className="bg-[#000000] border-b md:border-b md:my-4 shadow-sm overflow-hidden">
//         <div className="p-4 flex items-center justify-between">
//           <div 
//             className="flex items-center gap-3 text-[#FDFDFD] cursor-pointer"
//             onClick={() => navigate(`/users/${post.author.username}`)}
//           >
//             <img 
//               src={post.author.avatarUrl || "https://ui-avatars.com/api/?name=" + post.author.username} 
//               alt={post.author.username} 
//               className="w-10 h-10 rounded-full object-cover border border-gray-200"
//             />
//             <div>
//               <p className="font-semibold text-sm hover:underline">{post.author.username}</p>
//               <p className="text-xs text-gray-500">{dayjs(post.createdAt).fromNow()}</p>
//             </div>
//           </div>
//         </div>

//         <div 
//           className="w-full bg-[#000000] aspect-square cursor-pointer"
//           onClick={() => setIsFloatingOpen(true)}
//         >
//           <img 
//               src={post.imageUrl} 
//               alt={post.caption} 
//               className="w-[600px] rounded-md bg-[#000000] h-[600px] object-fill"
//               loading="lazy"
//           />
//         </div>

//         <div className="p-4">
//           <div className="flex justify-between mb-3">
//             <div className="flex gap-6">
//               {/* 1. Like Button */}
//               <button 
//                   onClick={() => likeMutation.mutate()}
//                   className="flex items-center gap-2 focus:outline-none active:scale-110 transition-transform"
//                   title={post.likedByMe ? "Unlike" : "Like"}
//               >
//                 <img src="/love_icon.png" alt="Like" className="w-6 h-6 object-contain" />
//                 <span className="text-[#FDFDFD] font-semibold text-base tracking-tight leading-6">
//                   {post.likeCount}
//                 </span>
//               </button>

//               {/* 2. Comment Button - Opens Floating Post Detail */}
//               <button 
//                   onClick={() => setIsFloatingOpen(true)}
//                   className="flex items-center gap-2 focus:outline-none"
//               >
//                 <img src="/Comment_icon.png" alt="Comment" className="w-6 h-6 object-contain" />
//                 <span className="text-[#FDFDFD] font-semibold text-base tracking-tight leading-6">
//                   {post.commentCount}
//                 </span>
//               </button>

//               {/* 3. Share Button */}
//               <button className="flex items-center gap-2 focus:outline-none">
//                 <img src="/Share_icon.png" alt="Share" className="w-6 h-6 object-contain" />
//                 <span className="text-[#FDFDFD] font-semibold text-base tracking-tight leading-6">
//                   0
//                 </span>
//               </button>
//             </div>

//             {/* 4. Bookmark Button */}
//             <button 
//               onClick={() => saveMutation.mutate()}
//               className="focus:outline-none"
//               title={post.isSaved ? "Unsave" : "Save"}
//             >
//               <img src="/saved_icon.png" alt="Save" className="w-6 h-6 object-contain" />
//             </button>
//           </div>

//           <p className="font-bold text-sm mb-1 text-[#FDFDFD]">
//               {post.likeCount > 0 ? `${post.likeCount} likes` : 'Be the first to like'}
//           </p>

//           <div className="flex flex-col text-sm mb-2">
//             <span 
//               className="font-bold mr-2 text-[#FDFDFD] cursor-pointer hover:underline"
//               onClick={() => navigate(`/users/${post.author.username}`)}
//             >
//               {post.author.username}
//             </span>
//             <span className="text-[#FDFDFD]">{post.caption}</span>
//           </div>

//           {/* 5. Show More Button */}
//           {post.commentCount > 0 && (
//             <button 
//                 onClick={() => setShowComments(!showComments)}
//                 className="text-[#7F51F9] font-semibold text-base mt-1 hover:underline text-left tracking-tight"
//             >
//                 {showComments ? 'Hide comments' : 'Show More'}
//             </button>
//           )}

//           {/* Mobile Add Comment Section (Visible on mobile only) */}
//           <div className="flex items-center gap-2 mt-4 md:hidden">
//             {/* Container 1: Emoji */}
//             <div className="w-[48px] h-[48px] rounded-xl border border-[#181D27] flex items-center justify-center p-4 shrink-0">
//                 <img 
//                     src="/Emoji.png" 
//                     alt="Emoji" 
//                     className="w-full h-full object-contain"
//                     onError={(e) => { e.currentTarget.style.display = 'none'; }} 
//                 />
//             </div>

//             {/* Container 2: Input */}
//             <div className="flex-1 h-[48px] bg-[#0A0D12] border border-[#181D27] rounded-xl flex items-center justify-between px-4">
//                 <input 
//                     type="text" 
//                     placeholder="Add Comment" 
//                     className="bg-transparent border-none outline-none text-[#535862] placeholder-[#535862] text-base font-medium w-full"
//                 />
//                 <button className="text-[#535862] font-medium text-base ml-2 cursor-pointer hover:text-white transition-colors">
//                     Post
//                 </button>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* FLOATING POST DETAIL PAGE (MODAL) */}
//       {isFloatingOpen && (
//         <div className="fixed inset-0 z-50 flex justify-center bg-black/80 backdrop-blur-sm overflow-y-auto">
//           <div 
//             className="relative bg-[#000000] border border-[#181D27] rounded-xl overflow-hidden flex my-[30px] my-auto shrink-0"
//             style={{ width: '1200px', height: '768px', gap: '24px' }}
//           >
//             {/* Close Button */}
//             <button 
//               onClick={() => setIsFloatingOpen(false)}
//               className="absolute top-4 right-4 text-[#FDFDFD] z-10 p-1 bg-black/50 rounded-full hover:bg-black/80"
//             >
//               <X size={24} />
//             </button>

//             {/* A. KOLOM KIRI: Image */}
//             <div className="w-[720px] h-[720px] flex items-center justify-center bg-black">
//               <img 
//                 src={post.imageUrl} 
//                 alt="Post Detail" 
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* B. KOLOM KANAN: Comments Section */}
//             <div className="flex-1 flex flex-col h-full p-6">
              
//               {/* Header Post Owner */}
//               <div className="flex items-center gap-3 mb-4 border-b border-[#181D27] pb-4">
//                 <img 
//                   src={post.author.avatarUrl || `https://ui-avatars.com/api/?name=${post.author.username}`} 
//                   alt={post.author.username} 
//                   className="w-10 h-10 rounded-full border border-[#181D27]"
//                 />
//                 <div>
//                   <p className="text-[#FDFDFD] font-bold text-sm">{post.author.username}</p>
//                   <p className="text-gray-500 text-xs">{dayjs(post.createdAt).fromNow()}</p>
//                 </div>
//               </div>

//               {/* Comments List (Scrollable) */}
//               <div className="flex-1 overflow-y-auto pr-2">
//                 <h3 className="text-[#FDFDFD] font-bold text-md mb-4 border-b border-[#181D27] pb-2">
//                   Comments
//                 </h3>
                
//                 {commentsData && commentsData.length > 0 ? (
//                   commentsData.map((comment) => (
//                     <div key={comment.id} className="flex gap-3 mb-4">
//                       <img 
//                         src={comment.author.avatarUrl || `https://ui-avatars.com/api/?name=${comment.author.username}`} 
//                         alt={comment.author.username} 
//                         className="w-8 h-8 rounded-full border border-[#181D27]"
//                       />
//                       <div>
//                         <div className="flex items-center gap-2">
//                           <span className="text-[#FDFDFD] font-bold text-sm">
//                             {comment.author.username}
//                           </span>
//                           <span className="text-gray-500 text-xs">
//                             {dayjs(comment.createdAt).fromNow()}
//                           </span>
//                         </div>
//                         <p className="text-[#FDFDFD] font-normal text-sm mt-1">
//                           {comment.text}
//                         </p>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-500 text-center mt-4">No comments yet.</p>
//                 )}
//               </div>

//               {/* Footer Actions (Like, Comment, Share, Save) */}
//               <div className="mt-auto pt-4 border-t border-[#181D27]">
//                 <div className="flex justify-between items-center">
//                   <div className="flex gap-6">
//                     <button 
//                         onClick={() => likeMutation.mutate()}
//                         className="flex items-center gap-2 focus:outline-none active:scale-110 transition-transform"
//                     >
//                       <img src="/love_icon.png" alt="Like" className="w-6 h-6 object-contain" />
//                       <span className="text-[#FDFDFD] font-semibold text-md">
//                         {post.likeCount}
//                       </span>
//                     </button>

//                     <button className="flex items-center gap-2 focus:outline-none">
//                       <img src="/Comment_icon.png" alt="Comment" className="w-6 h-6 object-contain" />
//                       <span className="text-[#FDFDFD] font-semibold text-md">
//                         {post.commentCount}
//                       </span>
//                     </button>

//                     <button className="flex items-center gap-2 focus:outline-none">
//                       <img src="/Share_icon.png" alt="Share" className="w-6 h-6 object-contain" />
//                       <span className="text-[#FDFDFD] font-semibold text-md">
//                         0
//                       </span>
//                     </button>
//                   </div>

//                   <button 
//                     onClick={() => saveMutation.mutate()}
//                     className="focus:outline-none"
//                   >
//                     <img src="/saved_icon.png" alt="Save" className="w-6 h-6 object-contain" />
//                   </button>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import api from '../lib/axios';
import CommentSection from './CommentSection';
import PostDetailModal from './PostDetailModal'; // Import komponen modal

dayjs.extend(relativeTime);

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

interface PostCardProps {
  post: Post;
}

interface FeedPage {
  data: {
    items: Post[];
  };
}

interface InfiniteFeedData {
  pages: FeedPage[];
}

export default function PostCard({ post }: PostCardProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);

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
        const data = oldData as InfiniteFeedData;
        
        return {
          ...data,
          pages: data.pages.map((page) => ({
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
    onError: (_err, _newTodo, context) => {
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
        const data = oldData as InfiniteFeedData;

        return {
          ...data,
          pages: data.pages.map((page) => ({
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
    onError: (_err, _variables, context) => {
      if (context?.previousFeed) {
        queryClient.setQueryData(['feed'], context.previousFeed);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['saved-posts'] });
    },
  });

  return (
    <>
      <div className="bg-[#000000] border-b md:border-b md:my-4 shadow-sm overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 text-[#FDFDFD] cursor-pointer"
            onClick={() => navigate(`/users/${post.author.username}`)}
          >
            <img 
              src={post.author.avatarUrl || "https://ui-avatars.com/api/?name=" + post.author.username} 
              alt={post.author.username} 
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
            <div>
              <p className="font-semibold text-sm hover:underline">{post.author.username}</p>
              <p className="text-xs text-gray-500">{dayjs(post.createdAt).fromNow()}</p>
            </div>
          </div>
        </div>

        <div 
          className="w-full bg-[#000000] aspect-square cursor-pointer"
          onClick={() => setIsFloatingOpen(true)}
        >
          <img 
              src={post.imageUrl} 
              alt={post.caption} 
              className="w-[600px] rounded-md bg-[#000000] h-[600px] object-fill"
              loading="lazy"
          />
        </div>

        <div className="p-4">
          <div className="flex justify-between mb-3">
            <div className="flex gap-6">
              <button 
                  onClick={() => likeMutation.mutate()}
                  className="flex items-center gap-2 focus:outline-none active:scale-110 transition-transform"
                  title={post.likedByMe ? "Unlike" : "Like"}
              >
                <img src="/love_icon.png" alt="Like" className="w-6 h-6 object-contain" />
                <span className="text-[#FDFDFD] font-semibold text-base tracking-tight leading-6">
                  {post.likeCount}
                </span>
              </button>

              <button 
                  onClick={() => setIsFloatingOpen(true)}
                  className="flex items-center gap-2 focus:outline-none"
              >
                <img src="/Comment_icon.png" alt="Comment" className="w-6 h-6 object-contain" />
                <span className="text-[#FDFDFD] font-semibold text-base tracking-tight leading-6">
                  {post.commentCount}
                </span>
              </button>

              <button className="flex items-center gap-2 focus:outline-none">
                <img src="/Share_icon.png" alt="Share" className="w-6 h-6 object-contain" />
                <span className="text-[#FDFDFD] font-semibold text-base tracking-tight leading-6">
                  0
                </span>
              </button>
            </div>

            <button 
              onClick={() => saveMutation.mutate()}
              className="focus:outline-none"
              title={post.isSaved ? "Unsave" : "Save"}
            >
              <img src="/saved_icon.png" alt="Save" className="w-6 h-6 object-contain" />
            </button>
          </div>

          <p className="font-bold text-sm mb-1 text-[#FDFDFD]">
              {post.likeCount > 0 ? `${post.likeCount} likes` : 'Be the first to like'}
          </p>

          <div className="flex flex-col text-sm mb-2">
            <span 
              className="font-bold mr-2 text-[#FDFDFD] cursor-pointer hover:underline"
              onClick={() => navigate(`/users/${post.author.username}`)}
            >
              {post.author.username}
            </span>
            <span className="text-[#FDFDFD]">{post.caption}</span>
          </div>

          {/* Mobile Only: Show More Button */}
          {post.commentCount > 0 && (
            <button 
                onClick={() => setShowComments(!showComments)}
                className="text-[#7F51F9] font-semibold text-base mt-1 hover:underline text-left tracking-tight"
            >
                {showComments ? 'Hide comments' : 'Show More'}
            </button>
          )}

          {/* Mobile Only: Comment Section */}
          {showComments && (
            <div className="mt-4 border-t border-gray-800 pt-4">
              <CommentSection postId={post.id} />
            </div>
          )}

          {/* Mobile Only: Add Comment Section */}
          <div className="flex items-center gap-2 mt-4 md:hidden">
            <div className="w-124h-12nded-xl border border-[#181D27] flex items-center justify-center p-4 shrink-0">
                <img 
                    src="/Emoji.png" 
                    alt="Emoji" 
                    className="w-full h-full object-contain"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                />
            </div>

            <div className="flex-1 h-12 bg-[#0A0D12] border border-[#181D27] rounded-xl flex items-center justify-between px-4">
                <input 
                    type="text" 
                    placeholder="Add Comment" 
                    className="bg-transparent border-none outline-none text-[#535862] placeholder-[#535862] text-base font-medium w-full"
                />
                <button className="text-[#535862] font-medium text-base ml-2 cursor-pointer hover:text-white transition-colors">
                    Post
                </button>
            </div>
          </div>

        </div>
      </div>

      {/* Render Floating Post Detail Modal */}
      {isFloatingOpen && (
        <PostDetailModal 
          post={post} 
          onClose={() => setIsFloatingOpen(false)} 
        />
      )}
    </>
  );
}