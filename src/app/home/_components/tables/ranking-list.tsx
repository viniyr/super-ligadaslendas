import Image from "next/image";
import { Player } from "../../page";

interface RankingList {
    rankings: Player[]
}

function capitalizeFirstLetter(string: string) {
    return string.toLowerCase().charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}

export const RankingList = ({ rankings }: RankingList) => {

    return (
        <section>
            <div className="p-4 bg-transparent text-black rounded-lg">
                <div className="relative shadow-md sm:rounded-lg">
                    {/* <div className="absolute text-7xl z-50 -top-10 left-1/2 transform -translate-x-1/2 animate-shake">🏆</div> */}
                    <div className="overflow-auto max-h-[60vh] scroll-smooth rounded-lg">
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
                                {rankings.map((player, index) => {

                                    if (player.position === 1) {
                                        return (
                                            <tr key={index + 'player'} className="bg-lol-dark backdrop-blur-sm backdrop-opacity-15 bg-opacity-80  border-b dark:border-gray-700 text-xl">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <span className="flex items-center gap-4 text-white font-bold relative">
              
                                                        <p className="text-4xl tracking-wide after:content-['👑'] after:text-4xl after:rotate-45 after:-top-3 after:right-0 after:absolute">{player.name}</p>
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
                                                        <div className="w-20 h-20 relative flex items-center justify-end ml-auto mr-0">
                                                            <p className="drop-shadow-glow">{player.points} pts.</p>
                                                        </div>
                                                    </span>
                                                </th>
                                            </tr>
                                        )
                                    }

                                    return (
                                        <tr key={index + 'player'} className="bg-lol-dark backdrop-blur-sm backdrop-opacity-15 bg-opacity-60 border-b dark:border-gray-700 text-lg">
                                            <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {player.position}. {player.name}
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
                                                    <div className="w-20 h-20 relative flex items-center justify-end ml-auto mr-0">
                                                        <p className="drop-shadow-glow">{player.points} pts.</p>
                                                    </div>
                                                </span>
                                            </th>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </section>
    )
}