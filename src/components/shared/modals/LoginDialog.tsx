"use client";

import { useEffect, useState, Fragment, useReducer } from "react";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import { DialogContainer } from "./DialogContainer";
import { Input } from "@/components/shared/inputs/default";
import { Button } from "@/components/buttons/Button";

interface LoginDialogProps {
    isOpen: boolean;
    onRecoveryClick: () => void;
    closeModal: () => void;
}

export function LoginDialog({
    isOpen,
    closeModal,
    onRecoveryClick,
}: LoginDialogProps) {
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const route = useSearchParams();
    const pathname = usePathname();

    const [loginForm, setLoginForm] = useReducer(
        (prev: any, next: any) => {
            return { ...prev, ...next };
        },
        {
            nick: "",
            password: "",
            callbackUrl: `/`,
            redirect: false,
        },
    );

    function internalClose() {
        router.replace(pathname);
        router.refresh();
        setLoading(false);
        closeModal();
    }

    useEffect(() => {
        setLoading(false);
        setErrorMessage("");
        if (route.get("message"))
            setErrorMessage(
                ""
            );
        // if (route.get('logout')) handleLogout();
    }, []);

    // const handleLogout = async () => {
    //     const res = await signOut({ redirect: false })
    //     if (res) {
    //         router.refresh();
    //     }
    // }

    const handleLogin = async () => {
        if (!isFormValid()) return;

        setLoading(true);
        const res = await signIn("credentials", {
            ...loginForm,
        });

        console.log(res)
        if (!res?.ok) {
            setLoading(false);
            setErrorMessage("E-mail ou senha inválidos");
            return;
        }

        internalClose();
    };

    function isFormValid() {
        if (!loginForm.nick) {
            setErrorMessage("Por favor, preencha todos os campos");
            return false;
        }
        if (!loginForm.password) {
            setErrorMessage("Por favor, preencha todos os campos");
            return false;
        }

        return true;
    }

    function redirectToSignup() {
        router.replace("/?signup=1");
    }

    return (
        <DialogContainer isOpen={isOpen} closeModal={() => internalClose()}>

            <HeadlessDialog.Title
                as="h3"
                className="flex items-center justify-center pb-3"
            >
                <Image
                    sizes="100vw"
                    className="w-[200px] h-auto"
                    height={"0"}
                    width={"0"}
                    src={'/images/iconweb.webp'}
                    alt="logo"
                ></Image>
            </HeadlessDialog.Title>
            <div className="mt-2 w-full">
                {errorMessage && (
                    <h1 className="py-2 text-red-500 text-center">
                        {errorMessage}
                    </h1>
                )}
                <form className="w-full flex flex-col gap-2">
                    <Input
                        icon={<>👤</>}
                        disabled={false}
                        inputNativeType="text"
                        onFocus={(e) => setErrorMessage("")}
                        propagateChange={(e) => setLoginForm({ nick: e })}
                        placeholder="Nick"
                    ></Input>
                    <Input
                        icon={<>🔐</>}
                        disabled={false}
                        propagateChange={(e) => setLoginForm({ password: e })}
                        inputNativeType="password"
                        onFocus={(e) => setErrorMessage("")}
                        placeholder="Senha"
                    ></Input>

                    {/* <h1
                        onClick={() => onRecoveryClick()}
                        className="text-end text-sm leading-3 py-1 text-[13px] cursor-pointer hover:text-white/70"
                    >
                        Esqueceu a senha?
                    </h1> */}
                </form>
            </div>

            <div className="mt-4">
                <Button
                    loading={loading}
                    onClick={() => handleLogin()}
                    color="secondary"
                    customStyle="w-full"
                >
                    ENTRAR
                </Button>
            </div>

            <h1
                onClick={() => redirectToSignup()}
                className="text-center text-[13px] mt-9"
            >
                Ainda não tem uma conta?{" "}
                <span className="text-lol-slate">
                    Criar conta agora!
                </span>
            </h1>
        </DialogContainer>
    );
}

