import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId } = req.body;

    try {
      const newSession = await prisma.chatSession.create({
        data: {
          user: { connect: { id: userId } },
        },
      });
      res.status(201).json(newSession);
    } catch (error) {
      console.error("Error creating new session:", error);
      res.status(500).json({ error: "Error creating new session" });
    }
  } else if (req.method === "GET") {
    const { userId } = req.query;

    try {
      const sessions = await prisma.chatSession.findMany({
        where: { userId: userId as string },
        include: { messages: true },
        orderBy: { createdAt: "asc" },
      });
      res.status(200).json(sessions);
    } catch (error) {
      console.error("Error fetching chat sessions:", error);
      res.status(500).json({ error: "Error fetching chat sessions" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
