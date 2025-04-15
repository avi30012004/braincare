import React, { useState } from 'react';
import {braincare} from '../assets'
import { navigation as nav } from '../constants'
import { useLocation, Link,NavLink } from 'react-router-dom';
import Button from './Button'
import { SignInButton, SignedIn, SignedOut, UserButton, SignUpButton } from "@clerk/clerk-react";
import { HambugerMenu } from './design/Header'
import MenuSvg from '../assets/svg/MenuSvg'
import { disablePageScroll, enablePageScroll } from 'scroll-lock'


const Header = () => {
  const pathname = useLocation();
  const  [openNavigation, setopenNavigation] = useState(false)

  const toggleNavigation = () => {
    if(openNavigation){
      setopenNavigation(false);
      enablePageScroll();
    }else{
      setopenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if(!openNavigation) return
    enablePageScroll();
    setopenNavigation(false);
  }; 

  return (
    <div className='fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm'>
      <div className='flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:px-4'>
        <Link to="/" className='block w-[12rem] xl:mr-8'>
          <img src={braincare} width={190} height={40} alt='brainwave'/>
        </Link>
        <nav className={`${openNavigation?'flex':'hidden'} fixed top-[5rem] bottom-0 left-0 right-0 bg-n-8 lg:bg-transparent lg:mx-auto lg:static lg:flex`}>
          <div className='relative flex flex-col z-2 items-center m-auto lg:flex-row'>
            {nav.map((item) => (
              <NavLink to={item.url === "#home" ? "/" : item.url === "#aichat" ? "/aichat" : item.url.startsWith("#") ? item.url.slice(1) : item.url} onClick={handleClick} key={item.id}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === "#aichat" ? (pathname.pathname === "/aichat" ? "z-2 lg:text-n-1" : "lg:text-n-1/50") : item.url === pathname.hash
                    ? "z-2 lg:text-n-1" : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              > 
                 {item.title}
              </NavLink>
            ))}
            
          </div>
          <HambugerMenu />
        </nav>
        <SignedOut>
          <SignUpButton mode="modal">
            <a className='button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block cursor-pointer'>
                sign up
            </a>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button className='hidden lg:flex'>Login</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <Button className='ml-auto lg:hidden' onClick={toggleNavigation} px='px-3'>
            <MenuSvg  openNavigation={openNavigation}/>
        </Button>
      </div>
    </div>
  )
}

export default Header