'use client'

import Image from "next/image";
import { useSession } from "next-auth/react";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Player, getAccountInformation, getPlayers, incrementUserXp } from "@/actions/player";

interface RankingList {
    rankings: Player[]
}

function capitalizeFirstLetter(string: string) {
    return string.toLowerCase().charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}


export const RankingList = () => {

    const { status } = useSession();
    const [updating, setUpdating] = useState(false);
    const [loading, setLoading] = useState(true);
    const [rankings, setRankings] = useState<Player[]>([]);
    const router = useRouter()

    async function populateUser() {
        setLoading(true);
        const players: Player[] = await getPlayers()

        const playersWithRank = await Promise.all(players.map(async (player) => {

            const accountWithRank = await getAccountInformation(player.nick, player.tagline);

            return {
                ...player,
                ...accountWithRank
            }

        }))

        const playerOrderedByPosition: any = playersWithRank.sort((a, b) => b.xp - a.xp);
        setRankings(playerOrderedByPosition)
        setLoading(false);
    }

    const requestIncrementUserXp = async (userId: string) => {

        setLoading(true);
        if (status !== 'authenticated' || updating) return;

        try {
            await JSON.parse((await incrementUserXp(userId)));
            populateUser();
        } catch (error) {
        }
    }

    useEffect(() => {
        populateUser();
    }, [])



    return (
        <section className="max-w-screen overflow-auto">
            <div className="p-1 md:p-4 bg-transparent text-black rounded-lg">
                <div className="relative shadow-md sm:rounded-lg">
                    {/* <div className="absolute text-7xl z-50 -top-10 left-1/2 transform -translate-x-1/2 animate-shake">🏆</div> */}
                    {/* desktop */}
                    <div className="block overflow-auto max-h-[60vh] scroll-smooth rounded-lg">
                        <table className="w-full min-w-[70vw] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-lol-main dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Tanso
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nick
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Elo
                                    </th>
                                    <th scope="col" className="px-6 py-3 float-right">
                                        Pontos
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {(rankings.length > 0 && !loading) && rankings.map((player, index) => {

                                    if (index == 0) {
                                        return (
                                            <tr key={index + 'player'} className="bg-lol-dark backdrop-blur-sm backdrop-opacity-15 bg-opacity-80  border-b dark:border-gray-700 text-xl">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <span className="flex items-center gap-4 text-white font-bold relative">

                                                        <p className="text-4xl tracking-wide after:content-['👑'] after:text-4xl after:rotate-45 after:-top-3 after:right-0 after:absolute">{index + 1}. {player.name}</p>
                                                    </span>
                                                </th>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {player.nick}#{player.tagline}
                                                </th>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-14 h-14 relative">
                                                            <Image
                                                                alt={`emblem ` + player.tier}
                                                                className="object-contain"
                                                                src={`/images/elos/Rank=${capitalizeFirstLetter(player?.tier ?? 'Bronze')}.png`}
                                                                fill
                                                            ></Image></div>
                                                        <p>{player.tier} {player.rank}</p>
                                                    </div>
                                                </th>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <span className="flex items-center gap-4 text-yellow-500 font-bold relative">
                                                        <div onClick={() => requestIncrementUserXp(player._id)} className="w-fit h-fit relative flex items-center gap-2 justify-end ml-auto mr-0">
                                                            {
                                                                (status == 'authenticated' && !updating) &&
                                                                <PlusCircleIcon className="cursor-pointer w-4 h-4"></PlusCircleIcon>
                                                            }
                                                            {
                                                                updating && <div role="status">
                                                                    <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                            }
                                                            <p className="drop-shadow-glow">{player.xp} pts.</p>
                                                        </div>
                                                    </span>
                                                </th>
                                            </tr>
                                        )
                                    }

                                    return (
                                        <tr key={index + 'player'} className="bg-lol-dark backdrop-blur-sm backdrop-opacity-15 bg-opacity-60 border-b dark:border-gray-700 text-lg">
                                            <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index + 1}. {player.name}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-xs">
                                                {player.nick}#{player.tagline}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-xs">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-10 h-10 relative">
                                                        <Image
                                                            alt={`emblem ` + player.tier}
                                                            className="object-contain"
                                                            src={`/images/elos/Rank=${capitalizeFirstLetter(player?.tier ?? 'Bronze')}.png`}
                                                            fill
                                                        ></Image></div>
                                                    <p>{player.tier} {player.rank}</p>
                                                </div>
                                            </th>
                                            <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <span className="flex items-center gap-4 text-blue-600 font-bold relative">
                                                    <div onClick={() => requestIncrementUserXp(player._id)} className="w-20 h-20 relative flex items-center justify-end ml-auto mr-0 gap-2">
                                                        {
                                                            (status == 'authenticated' && !updating) &&
                                                            <PlusCircleIcon className="cursor-pointer w-4 h-4"></PlusCircleIcon>
                                                        }
                                                        {
                                                            updating && <div role="status">
                                                                <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                        }
                                                        <p className="drop-shadow-glow">{player.xp} pts.</p>
                                                    </div>
                                                </span>
                                            </th>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {rankings.length == 0 && !loading && <div className="bg-lol-dark backdrop-blur-sm backdrop-opacity-15 bg-opacity-80 text-2xl text-center text-white">
                            <h1 className="py-10">Nenhuma lenda encontrada.</h1>
                        </div>}
                        {loading && <div className="bg-lol-dark backdrop-blur-sm backdrop-opacity-15 bg-opacity-80 text-2xl text-center text-white flex items-center justify-center">
                            <h1 className="py-10 flex items-center justify-center">
                                <div className="flex items-center justify-center w-56 h-56 bg-transparent">
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>

                            </h1>
                        </div>}
                    </div>


                    {/* mobile */}
                    {/* <div className="block lg:hidden overflow-auto max-h-[60vh] scroll-smooth rounded-lg">
                        {rankings.map((player, index) => {
                            return (
                                <div key={'player ' + index} className="flex items-center p-4 rounded-lg">
                                </div>
                            )
                        }
                        )}
                    </div> */}
                </div>
            </div>

        </section>
    )
}