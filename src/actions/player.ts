"use server";

import { RiotFetch } from "@/network/fetch";

export async function getPUUIDByUser(name: string, tagline: string) {
  try {
    const response = await RiotFetch(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tagline}`,
      { method: "GET" }
    );

    return response.json();
  } catch (error) {}
}

export async function getSummonerIdByPUUID(puuid: string) {
  try {
    const response = await RiotFetch(
      `/summoner/v4/summoners/by-puuid/${puuid}`,
      { method: "GET" }
    );

    return response.json();
  } catch (error) {}
}

export async function getAccountInformationBySummonerId(
  summonerId: string
): Promise<Account[] | undefined> {
  try {
    const response = await RiotFetch(
      `/league/v4/entries/by-summoner/${summonerId}`,
      { method: "GET" }
    );

    return response.json();
  } catch (error) {}
}

export interface Account {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

export async function getAccountInformation(
  name: string,
  tagline: string
): Promise<Account | undefined> {
  try {
    const { puuid } = await getPUUIDByUser(name, tagline);
    const { id } = await getSummonerIdByPUUID(puuid);
    const account = await getAccountInformationBySummonerId(id);
    return account && account?.length > 0 ? account[0] : undefined;
  } catch (error) {}
}

export async function incrementUserXp(userId: string): Promise<any> {
  "use server";
  let url = `https://super-ligadaslendas.vercel.app/api/user/${userId}`;

  if (process.env.NODE_ENV == "development") {
    url = `http://localhost:3000/api/user/${userId}`;
  }

  const response = await (await fetch(url, { method: "POST" })).json();

  return JSON.stringify({
    status: 200,
    message: response,
  });
}

export async function getPlayers() {
  "use server";
  try {
    let url = "https://super-ligadaslendas.vercel.app/api/user";

    if (process.env.NODE_ENV == "development") {
      url = "http://localhost:3000/api/user";
    }

    const users = await (
      await fetch(url, { method: "GET", cache: "no-cache" })
    ).json();
    return users.response;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export interface Player extends Partial<Account> {
  _id: string;
  name: string;
  nick: string;
  tagline: string;
  position: number;
  points: number;
  xp: number;
}
