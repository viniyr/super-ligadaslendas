import { Account, getAccountInformation, getPUUIDByUser } from "@/actions/player";
import { RankingList } from "./_components/tables/ranking-list";

// const players: Player[] = [
//     {
//         name: 'Moni',
//         position: 1,
//         points: 0
//     },
//     {
//         name: 'João',
//         position: 2,
//         points: 0
//     },
//     {
//         name: 'Neusinha',
//         position: 3,
//         points: 0
//     },
//     {
//         name: 'Alevi',
//         position: 4,
//         points: 0
//     },
//     {
//         name: 'Caio',
//         position: 5,
//         points: 0
//     },
//     {
//         name: 'Estalone',
//         position: 6,
//         points: 0
//     },
//     {
//         name: 'PapaiBruno',
//         position: 7,
//         points: 0
//     },
//     {
//         name: 'Julia',
//         position: 8,
//         points: 0
//     },
//     {
//         name: 'Martini',
//         position: 9,
//         points: 0
//     },
//     {
//         name: 'Five',
//         position: 10,
//         points: 0
//     },
//     {
//         name: 'Ric',
//         position: 11,
//         points: 0
//     },
//     {
//         name: 'Cerri',
//         position: 12,
//         points: 0
//     },
//     {
//         name: 'Pelosini',
//         position: 13,
//         points: 0
//     },
//     {
//         name: 'Guigui',
//         position: 14,
//         points: 0
//     },
//     {
//         name: 'Caldera',
//         position: 15,
//         points: 0
//     },
//     {
//         name: 'Leosion69',
//         position: 16,
//         points: 0
//     },
// ]

const players: Player[] = [
    {
        name: 'vini',
        nick: 'yonezawa',
        tagline: 'night',
        position: 1,
        points: 0
    },
    {
        name: 'guigui',
        nick: 'Aroldo SuasNegas',
        tagline: '0000',
        position: 2,
        points: 0
    },
    {
        name: 'moni',
        nick: 'moni',
        tagline: 'BR2',
        position: 3,
        points: 0
    },
]

export interface Player extends Partial<Account> {
    name: string,
    nick: string,
    tagline: string,
    position: number,
    points: number
}

export default async function RankingsPage() {


    const playersWithRank = await Promise.all(players.map(async (player) => {

        const accountWithRank = await getAccountInformation(player.nick, player.tagline);

        return {
            ...player,
            ...accountWithRank
        }

    }))

    return (
        <main className="h-full w-full flex items-center justify-center">
            <RankingList rankings={playersWithRank}></RankingList>
        </main>
    )
}