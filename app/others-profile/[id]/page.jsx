"use client";

import Profile from '@components/Profile';
import { useParams, useSearchParams,  } from 'next/navigation'
import { useEffect, useState } from 'react';

function userProfile() {
  const{id}=useParams();
  const searchParams=useSearchParams();
  const name =searchParams.get("name");
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts=async ()=>{
      const res=await fetch(`/api/users/${id}/posts`);
      const data=await res.json();
      setPosts(data)
    }
    if(id) fetchPosts();
  },[])
  return (
    <Profile name={name} desc={`This is ${name} profile page`} data={posts}  />
  )
}

export default userProfile