'use client'

import { ReactNode, Fragment } from 'react'
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react'
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/buttons/Button';
import { XMarkIcon } from '@heroicons/react/16/solid';

export interface DialogContainerProps {
    children?: ReactNode,
    isOpen: boolean,
    closeModal: () => void
}

export function DialogContainer({ children, isOpen, closeModal }: DialogContainerProps) {

    const router = useRouter();
    const path = usePathname();

    function internalCloseModal() {
        router.replace(path)
        closeModal()
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <HeadlessDialog as="div" className="relative z-10" onClose={() => { }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-1 lg:p-4 text-center">
                        <Transition.Child
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0 opacity-100"
                            leaveTo="-translate-x-full opacity-0"
                        >
                            <HeadlessDialog.Panel
                                className="w-screen h-full lg:min-w-[600px] transform overflow-hidden rounded-lg bg-primary-color backdrop-blur-2xl bg-opacity-50 px-4 lg:px-6 py-12 lg:p-12 text-left align-middle shadow-2xl transition-all bg-gradient-139 from-black/25 to-transparent border-[1px] border-lol-red/50">


                                <Button onClick={() => internalCloseModal()} color='secondary' customStyle='absolute right-2 top-2 w-[42px] h-[42px] font-bold text-lg rounded-lg shadow-md drop-shadow-md !bg-transparent !border-0'>
                                    <XMarkIcon></XMarkIcon>
                                </Button>


                                {children}
                            </HeadlessDialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </HeadlessDialog>
        </Transition >
    )
}