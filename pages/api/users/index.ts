import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "GET") {
    return res.status(405).end();
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return res.status(200).json(users);
  } catch (error) {
    console.log(error)
    return res.status(500).end();
  }
}