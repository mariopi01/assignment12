// import { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { Send, Trash2 } from 'lucide-react';
// import api from '../lib/axios';

// interface CommentProps {
//   postId: number;
// }

// export default function CommentSection({ postId }: CommentProps) {
//   const [text, setText] = useState('');
//   const queryClient = useQueryClient();

//   // 1. Fetch Comments
//   const { data } = useQuery({
//     queryKey: ['comments', postId],
//     queryFn: async () => {
//       const res = await api.get(`/api/posts/${postId}/comments`); // [cite: 473]
//       return res.data.data.comments;
//     }
//   });

//   // 2. Post Comment
//   const addCommentMutation = useMutation({
//     mutationFn: async (newText: string) => {
//       return api.post(`/api/posts/${postId}/comments`, { text: newText }); // [cite: 494]
//     },
//     onSuccess: () => {
//       setText('');
//       queryClient.invalidateQueries({ queryKey: ['comments', postId] });
//     }
//   });

//   // 3. Delete Comment
//   const deleteMutation = useMutation({
//     mutationFn: async (commentId: number) => {
//       return api.delete(`/api/comments/${commentId}`); // [cite: 528]
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['comments', postId] });
//     }
//   });

//   return (
//     <div className="mt-4 border-t pt-4">
//       {/* Input Comment */}
//       <form 
//         onSubmit={(e) => { e.preventDefault(); addCommentMutation.mutate(text); }}
//         className="flex gap-2 mb-4"
//       >
//         <input 
//           type="text" 
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Tulis komentar..."
//           className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
//         />
//         <button type="submit" disabled={!text || addCommentMutation.isPending} className="text-blue-600">
//            <Send size={20} />
//         </button>
//       </form>

//       {/* List Comments */}
//       <div className="space-y-3 max-h-60 overflow-y-auto">
//         {data?.map((comment: any) => (
//           <div key={comment.id} className="flex gap-2 items-start text-sm">
//              <span className="font-bold shrink-0">{comment.author.username}</span>
//              <p className="flex-1 text-gray-700">{comment.text}</p>
//              {comment.isMine && (
//                <button onClick={() => deleteMutation.mutate(comment.id)} className="text-gray-400 hover:text-red-500">
//                  <Trash2 size={14} />
//                </button>
//              )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Send, Trash2 } from 'lucide-react';
import api from '../lib/axios';

interface CommentProps {
  postId: number;
}

interface Comment {
  id: number;
  text: string;
  author: {
    username: string;
  };
  isMine: boolean;
}

export default function CommentSection({ postId }: CommentProps) {
  const [text, setText] = useState('');
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const res = await api.get(`/api/posts/${postId}/comments`);
      return res.data.data.comments as Comment[];
    }
  });

  const addCommentMutation = useMutation({
    mutationFn: async (newText: string) => {
      return api.post(`/api/posts/${postId}/comments`, { text: newText });
    },
    onSuccess: () => {
      setText('');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (commentId: number) => {
      return api.delete(`/api/comments/${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    }
  });

  return (
    <div className="mt-4 border-t pt-4">
      <form 
        onSubmit={(e) => { e.preventDefault(); addCommentMutation.mutate(text); }}
        className="flex gap-2 mb-4"
      >
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tulis komentar..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
        />
        <button type="submit" disabled={!text || addCommentMutation.isPending} className="text-blue-600">
           <Send size={20} />
        </button>
      </form>

      <div className="space-y-3 max-h-60 overflow-y-auto">
        {data?.map((comment) => (
          <div key={comment.id} className="flex gap-2 items-start text-sm">
             <span className="font-bold shrink-0">{comment.author.username}</span>
             <p className="flex-1 text-gray-700">{comment.text}</p>
             {comment.isMine && (
               <button onClick={() => deleteMutation.mutate(comment.id)} className="text-gray-400 hover:text-red-500">
                 <Trash2 size={14} />
               </button>
             )}
          </div>
        ))}
      </div>
    </div>
  );
}