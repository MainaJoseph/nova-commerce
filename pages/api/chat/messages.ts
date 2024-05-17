import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, sessionId, sender, text, type, timestamp } = req.body;

    try {
      const message = await prisma.chatMessage.create({
        data: {
          userId,
          sessionId,
          sender,
          text,
          type,
          timestamp, // Include timestamp
        },
      });
      res.status(201).json(message);
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({ error: "Error creating message" });
    }
  } else if (req.method === "GET") {
    const { sessionId } = req.query;

    try {
      const messages = await prisma.chatMessage.findMany({
        where: { sessionId: sessionId as string },
        orderBy: { createdAt: "asc" },
      });
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Error fetching messages" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
