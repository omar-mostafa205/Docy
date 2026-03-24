"use client"
import React, { useEffect, useState } from 'react'

const Nav2 = () => {
    const [isScrolled , setIsScrolled] = React.useState(false)
    const [isMobile , setIsMobile] = React.useState(false)
useEffect(()=>{
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
        window.removeEventListener('scroll', handleScroll)
    }
},[])
    function handleScrollSection (sectionId : string){
        const ele = document.getElementById(sectionId)
        if(ele){
            const yOffset = -50; 
            const y = ele.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({
                top: y,
                behavior: 'smooth',
            });
        }
    }
  return (
    <div>nav2</div>
  )
}

export default Nav2