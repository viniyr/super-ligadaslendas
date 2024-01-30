"use client";

import { useEffect, useState, Fragment, useReducer } from "react";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import { DialogContainer } from "./DialogContainer";
import { Input } from "@/components/shared/inputs/default";
import { Button } from "@/components/buttons/Button";
import { helpers } from "@/utils/helpers";

interface SignupDialogProps {
    isOpen: boolean;
    onRecoveryClick: () => void;
    closeModal: () => void;
}

export function SignupDialog({
    isOpen,
    closeModal,
    onRecoveryClick,
}: SignupDialogProps) {
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const route = useSearchParams();
    const pathname = usePathname();

    const [signupForm, setSignupForm] = useReducer(
        (prev: any, next: any) => {
            return { ...prev, ...next };
        },
        {
            name: "",
            nick: "",
            tagline: "",
            phone: "",
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

    const handleSignup = async () => {

        if (!isFormValid()) return;

        setLoading(true)
        try {

            let url = "https://super-ligadaslendas.vercel.app/api/user"

            if (process.env.NODE_ENV == 'development') {
                url = "http://localhost:3000/api/user"

            }

            const signupPayload = {
                ...signupForm,
                phone: helpers.unformatAll(signupForm.phone),
            }


            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(signupPayload),
                headers: { "Content-Type": "application/json" },
            });

            const user = await res.json();

            if (res.ok && user) {
                const login = await signIn('credentials', { isSignup: true, user: JSON.stringify(user), redirect: false })
                if (!login?.ok) {
                    setLoading(false)
                    return;
                }
                router.refresh();
                internalClose();

                return;
            }

            setErrorMessage(user?.message)
            setLoading(false)

        } catch (error: any) {
            setErrorMessage(error?.message ?? "Erro ao realizar login")
            setLoading(false)
        }
    }

    function isFormValid() {
        if (!signupForm.name) {
            setErrorMessage("Por favor, preencha todos os campos");
            return false;
        }
        if (!signupForm.password) {
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
                        icon={<>🫂</>}
                        disabled={false}
                        inputNativeType="text"
                        onFocus={(e) => setErrorMessage("")}
                        propagateChange={(e) => setSignupForm({ name: e })}
                        placeholder="Nome"
                    ></Input>
                    <Input
                        icon={<>🖥️</>}
                        disabled={false}
                        inputNativeType="text"
                        onFocus={(e) => setErrorMessage("")}
                        propagateChange={(e) => setSignupForm({ nick: e })}
                        placeholder="Nick"
                    ></Input>
                    <Input
                        icon={<>🏷️</>}
                        disabled={false}
                        inputNativeType="text"
                        onFocus={(e) => setErrorMessage("")}
                        propagateChange={(e) => setSignupForm({ tagline: e })}
                        placeholder="Tagline"
                    ></Input>
                    <Input
                        icon={<>📱</>}
                        value={signupForm.phone}
                        disabled={false}
                        inputNativeType='tel'
                        propagateChange={(e) => setSignupForm({ phone: helpers.cellphoneMask(e) })} type='tel'
                        placeholder='Zap'
                    ></Input>
                    <Input
                        icon={<>🔐</>}
                        disabled={false}
                        propagateChange={(e) => setSignupForm({ password: e })}
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
                    onClick={() => handleSignup()}
                    color="secondary"
                    customStyle="w-full"
                >
                    CRIAR CONTA
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

