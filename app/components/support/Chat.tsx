"use client";

import { useState, useEffect } from "react";
import Avatar from "../Avatar";
import { SafeUser } from "@/types";
import ChatHeader from "./ChatHeader";
import axios, { AxiosResponse } from "axios";

interface ChatComponentProps {
  currentUser: SafeUser | null;
}

interface Message {
  sender: string;
  text: string;
  type: "sent" | "received";
}

interface ChatSession {
  id: string;
  messages: Message[];
}

const ChatComponent: React.FC<ChatComponentProps> = ({ currentUser }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      // Fetch user's chat sessions
      axios
        .get(`/api/chat/chats?userId=${currentUser.id}`)
        .then((response: AxiosResponse<ChatSession[]>) => {
          const sessions = response.data;
          if (sessions.length > 0) {
            const lastSession = sessions[sessions.length - 1];
            setSessionId(lastSession.id);
            setMessages(lastSession.messages);
          } else {
            createNewSession();
          }
        })
        .catch((error) => {
          console.error("Error fetching chat sessions:", error);
        });
    }
  }, [currentUser]);

  const createNewSession = () => {
    if (currentUser) {
      axios
        .post("/api/chat/chats", { userId: currentUser.id })
        .then((response: AxiosResponse<ChatSession>) => {
          const newSession = response.data;
          setSessionId(newSession.id);
        })
        .catch((error) => {
          console.error("Error creating new session:", error);
        });
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() && sessionId && currentUser) {
      const newMessage: Message = {
        sender: "User",
        text: inputValue,
        type: "sent",
      };

      axios
        .post("/api/chat/messages", {
          userId: currentUser.id,
          sessionId,
          sender: newMessage.sender,
          text: newMessage.text,
          type: newMessage.type,
        })
        .then((response: AxiosResponse<Message>) => {
          setMessages((prevMessages) => [...prevMessages, response.data]);
          setInputValue("");
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      <div className="p-4 bg-gray-700 h-64 overflow-y-scroll">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "sent" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`${
                message.type === "sent" ? "bg-orange-500" : "bg-gray-800"
              } text-white p-2 rounded-lg`}
            >
              <p className="whitespace-pre-line">{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-800 flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-2 bg-orange-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
