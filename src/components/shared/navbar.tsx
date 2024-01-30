'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { LoginDialog } from "./modals/LoginDialog";
import { Fragment, useEffect, useState } from "react";
import { ViewColumnsIcon } from "@heroicons/react/16/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { SignupDialog } from "./modals/SignupDialog";
import { signOut, useSession } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

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


            <Menu as="nav" className={"w-full"}>
                <button onClick={() => router.push('/home')} className="absolute flex items-center justify-center md:hidden w-10 h-10 rounded-lg bg-gray-800 p-2 left-2 top-2">
                    <div className="relative w-[20px] h-[20px]">
                        <Image src="/images/iconweb.webp" alt="" className="object-cover" fill></Image>
                    </div>
                </button>
                <div>
                    <Menu.Button className="absolute md:hidden w-10 h-10 rounded-lg bg-gray-800 p-2 right-2 top-2">
                        <span className="sr-only">Open user menu</span>
                        <Bars3Icon></Bars3Icon>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute z-10 mt-2 top-12 right-4 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {status == 'unauthenticated' && <>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={() => router.push('/moni')}
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                    >
                                        Moni
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={() => setOpenedModal('SIGNUP')}
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                    >
                                        Criar conta
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={() => setOpenedModal('LOGIN')}
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                    >
                                        Entrar
                                    </a>
                                )}
                            </Menu.Item>

                        </>}
                        {
                            status == 'authenticated' && <>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            onClick={() => router.push('/moni')}
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Moni
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            onClick={() => signOutUser()}
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Sair
                                        </a>
                                    )}
                                </Menu.Item>
                            </>
                        }
                    </Menu.Items>
                </Transition>
            </Menu>

            <LoginDialog closeModal={() => setOpenedModal(undefined)} isOpen={openedModal === 'LOGIN'} onRecoveryClick={() => { }}></LoginDialog>
            <SignupDialog closeModal={() => setOpenedModal(undefined)} isOpen={openedModal === 'SIGNUP'} onRecoveryClick={() => { }}></SignupDialog>
        </>
    )
}
