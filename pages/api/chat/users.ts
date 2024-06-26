import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb"; // Adjust the import path according to your project structure

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany({
        where: {
          chatSessions: {
            some: {}, // This ensures we only get users with at least one chat session
          },
        },
        include: {
          chatSessions: true,
        },
      });

      const userChatSessions = users.map((user) => ({
        userId: user.id,
        userName: user.name,
        sessionId:
          user.chatSessions.length > 0 ? user.chatSessions[0].id : null,
        userEmail: user.email, // Add email
        userImage: user.image, // Add image
      }));

      res.status(200).json(userChatSessions);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Error fetching users" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
