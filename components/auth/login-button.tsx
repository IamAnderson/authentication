"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

interface loginButtonProps {
    children: React.ReactNode;
    modal?: "modal" | "redirect";
    asChild?: boolean;
}

const LoginButton = ( { children, modal="redirect", asChild }: loginButtonProps ) => {

    const router = useRouter();

    const onClick = () => {
        router.push("auth/login")
    }

  return (
    <span className='cursor-pointer' onClick={onClick}>
        {children}
    </span>
  )
}

export default LoginButton