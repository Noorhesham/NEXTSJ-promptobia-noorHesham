'use client';

import Form from '@components/Form';
import { useRouter,useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function UpdatePrompt() {

  const router=useRouter();
  const searchParams=useSearchParams();
  const promptId=searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: '', tag: '' });

//   const updatePrompt  = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     if (!promptId) return alert('prompt not found');
//         try {
//             const response=await fetch(`/api/prompt/${promptId}`,{
//                 method:'PATCH',
//                 body:JSON.stringify({
//                     prompt:post.prompt,
//                     tag:post.tag,
//                 })
//             })
//             if (response.ok){
//                 router.push('/');
//             }
//         } catch (error) {
//           console.error(error);
//         }finally{
//            setSubmitting(false); 
//         }
//       };

  useEffect(()=>{
  const getPromptDetails=async()=>{
      const res=await fetch(`/api/prompt/${promptId}`);
      const data=await res.json();
      setPost({prompt:data.prompt,tag:data.tag})
  }
  getPromptDetails()
  },[promptId])

  return (<Form type="Edit" setPost={setPost} post={post} submitting={submitting} handleSubmit={updatePrompt } />);
}

export default UpdatePrompt;
