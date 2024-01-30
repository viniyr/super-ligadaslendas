import { Account, getAccountInformation, getPUUIDByUser, incrementUserXp } from "@/actions/player";
import { RankingList } from "./_components/tables/ranking-list";
import { Suspense } from "react";

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


export default async function RankingsPage() {

    return (
        <main className="h-full w-full flex items-center justify-center">
            <RankingList></RankingList>
        </main>
    )
}