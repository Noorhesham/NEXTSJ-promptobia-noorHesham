'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';

function Nav() {
  const {data: session} = useSession(); //acssess the session 
  
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(function () {
    const setUpProviders = async function () {
      const res = await getProviders();
      setProviders(res);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className=" flex gap-2 flex-center">
        <Image src={"/assets/images/logo.svg"} alt="logo" width={40} height={40} className=" object-contain" />
        <p className="logo_text">Promptobia</p>
      </Link>
      <div className="sm:flex hidden ">
        {session?.user ? (
          <div className=" flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image src={session?.user.image} width={37} height={37} alt="profile" />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button type="button" key={provider.name} onClick={(e) =>{ 
                  e.preventDefault()
                  signIn(provider.id)}} className="black_btn capitalize">
                  sign in
                </button>
              ))}
          </>
        )}
      </div>
      {/* mobile nav */}
      <div className=" sm:hidden flex relative ">
        {session?.user ? (
          <div className="flex">
            <Image onClick={() => setToggleDropDown((prev) => !prev)} src={session?.user.image} width={37} height={37}  alt="profile"/>

            {toggleDropDown && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropDown(false)}>
                  My Profile
                </Link>
                <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropDown(false)}>
                  Create Prompt
                </Link>
                <button type="button" className=' mt-5 w-full black_btn'
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn capitalize">
                  sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
