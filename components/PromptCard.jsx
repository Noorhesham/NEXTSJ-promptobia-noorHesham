"use client";

import {useState} from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname,useRouter } from "next/navigation";

function PromptCard({post,handleTagClick,handleEdit,handleDelete}) {
  const [copy , setCopy] = useState("");
  const {data:session}=useSession();
  const pathName=usePathname();
  const router=useRouter();

  const handleCopy=()=>{
    setCopy(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() =>setCopy(''), 3000);
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className=" flex-1 flex justify-start items-center gap-3 cursor-pointer " onClick={()=>router.push(`/others-profile/${post.creator._id}?name=${post.creator.username}`)}>
          <Image src={post.creator.image} alt="user-image" width={40} height={40} className="rounded-full object-contain"/>
        </div>
        <div className="flex flex-col cursor-pointer" onClick={()=>router.push(`/others-profile/${post.creator._id}?name=${post.creator.username}`)}>
            <h3 className=" font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
            <p className=" font-inter text-sm text-gray-500">{post.creator.email}</p>
        </div>
      <div onClick={handleCopy} className="copy_btn">
        <Image src={copy===post.prompt?'/assets/icons/tick.svg':'/assets/icons/copy.svg'}
        width={20} height={20} alt="image"/>
      </div>
      </div>
      <p className=" my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className=" font-inter  text-sm blue_gradient cursor-pointer" onClick={()=>handleTagClick&&handleTagClick(post.tag)}>#{post.tag}</p>
      {session?.user.id===post.creator._id&&pathName==='/profile'&&(
        <div className=" mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className=" font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>
            Edit
          </p>
          <p className=" font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard