'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { LoginDialog } from "./modals/LoginDialog";
import { useEffect, useState } from "react";
import { ViewColumnsIcon } from "@heroicons/react/16/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { SignupDialog } from "./modals/SignupDialog";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {

    const router = useRouter();
    const [openedModal, setOpenedModal] = useState<'LOGIN' | 'SIGNUP' | undefined>(undefined)
    const { status } = useSession();

    useEffect(() => {

    }, [status])

    const signOutUser = async () => {
        const res = await signOut({ redirect: false })
        if (res) router.replace('/home')
    }

    return (
        <>
            <nav className="hidden md:flex h-fit w-fit absolute items-center gap-10 bg-gray-800 py-4 px-10 rounded-lg -translate-x-1/2 left-1/2 top-4">
                <button onClick={() => router.push('/home')} className="flex items-center gap-4 border-r-[1px] border-white/10 pr-10 w-fit h-fit relative">
                    <div className="relative w-[32px] h-[32px]">
                        <Image src="/images/iconweb.webp" alt="" className="object-cover" fill></Image>
                    </div>
                    <h1 className="text-2xl">Lendas </h1>
                </button>
                {status == 'unauthenticated' && <>
                    <a onClick={() => router.push('/moni')} className="cursor-pointer hover:text-lol-gray font-semibold uppercase text-sm hover:underline underline-offset-2">Moni</a>
                    <a onClick={() => setOpenedModal('SIGNUP')} className="cursor-pointer hover:text-lol-gray font-semibold uppercase text-sm hover:underline underline-offset-2">Criar conta</a>
                    <a onClick={() => setOpenedModal('LOGIN')} className="cursor-pointer hover:text-lol-gray font-semibold uppercase text-sm hover:underline underline-offset-2">Login</a></>
                }
                {status == 'authenticated' && <>
                    <a onClick={() => router.push('/moni')} className="cursor-pointer hover:text-lol-gray font-semibold uppercase text-sm hover:underline underline-offset-2">Moni</a>
                    <button onClick={() => signOutUser()} className="cursor-pointer hover:text-lol-gray font-semibold uppercase text-sm hover:underline underline-offset-2">Sair</button>
                </>
                }


            </nav>

            <nav className="absolute md:hidden w-10 h-10 rounded-lg bg-gray-800 p-2 right-2 top-2">
                <Bars3Icon></Bars3Icon>
            </nav>

            <LoginDialog closeModal={() => setOpenedModal(undefined)} isOpen={openedModal === 'LOGIN'} onRecoveryClick={() => { }}></LoginDialog>
            <SignupDialog closeModal={() => setOpenedModal(undefined)} isOpen={openedModal === 'SIGNUP'} onRecoveryClick={() => { }}></SignupDialog>
        </>
    )
}
