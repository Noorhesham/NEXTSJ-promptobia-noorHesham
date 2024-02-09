'use client';

import { useRouter,useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
// import Form from '@components/Form';
import dynamic from 'next/dynamic';

const Form = dynamic(
	() => import('@components/Form'),
	{ ssr: false }
);

const UpdatePrompt = () => {

  const router=useRouter();
  const searchParams=useSearchParams();
  const promptId=searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: '', tag: '' });

  useEffect(()=>{
  const getPromptDetails=async()=>{
      const res=await fetch(`/api/prompt/${promptId}`);
      const data=await res.json();
      setPost({prompt:data.prompt,tag:data.tag})
  }
  getPromptDetails()
  },[promptId])

  const EditPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) return alert('prompt not found');
        try {
            const response=await fetch(`/api/prompt/${promptId}`,{
                method:'PATCH',
                body:JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag,
                })
            })
            if (response.ok){
                router.push('/');
            }
        } catch (error) {
          console.error(error);
        }finally{
           setSubmitting(false); 
        }
      };

  return <Form type="Edit" setPost={setPost} post={post} submitting={submitting} handleSubmit={EditPrompt} />;
}

export default UpdatePrompt;
