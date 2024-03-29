'use client';

import Form from '@components/Form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export const  dynamic='force-dynamic'

function CreatePrompt() {
  const {data:session}=useSession();
  const router=useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: '', tag: '' });
  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
        const response=await fetch('/api/prompt/new',{
            method:'POST',
            body:JSON.stringify({
                prompt:post.prompt,
                tag:post.tag,
                userId:session?.user.id
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
  return <Form type="Create" setPost={setPost} post={post} submitting={submitting} handleSubmit={createPrompt} />;
}

export default CreatePrompt;
