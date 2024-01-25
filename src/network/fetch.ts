import { getServerSession } from "next-auth";

export const RiotFetch = async (path: string, params: any): Promise<any> => {
  try {
    const token = process.env.TOKEN;

    const newParams = {
      ...params,
      headers: {
        ...params?.headers,
        "Content-Type": "application/json",
        "X-Riot-Token": token,
      },
    };

    let url = path;

    if (!path.includes("https")) {
      url = `${process.env.RIOT_BASE_API}${path}`;
    }

    return fetch(url, newParams);
  } catch (error) {
    console.error(error);
    return {
      status: false,
      error: "Erro interno não especificado",
    };
  }
};
