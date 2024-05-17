"use client";

import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import Avatar from "../Avatar";
import { SafeUser } from "@/types";
import ChatHeader from "./ChatHeader";

interface ChatComponentProps {
  currentUser: SafeUser | null;
}

interface Message {
  sender: string;
  text: string;
  type: "sent" | "received";
  timestamp?: string; // Make timestamp optional
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
      axios
        .get(`/api/chat/chats?userId=${currentUser.id}`)
        .then((response: AxiosResponse<ChatSession[]>) => {
          const sessions = response.data;
          if (sessions.length > 0) {
            const lastSession = sessions[sessions.length - 1];
            setSessionId(lastSession.id);
            setMessages([
              {
                sender: "Admin",
                text: "Hi, how can I help you today?",
                type: "received",
              },
              ...lastSession.messages,
            ]);
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
          setMessages([
            {
              sender: "Admin",
              text: "Hi, how can I help you today?",
              type: "received",
            },
          ]);
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
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }), // Add timestamp
      };

      axios
        .post("/api/chat/messages", {
          userId: currentUser.id,
          sessionId,
          sender: newMessage.sender,
          text: newMessage.text,
          type: newMessage.type,
          timestamp: newMessage.timestamp, // Include timestamp in the request
        })
        .then((response: AxiosResponse<Message>) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { ...response.data, timestamp: newMessage.timestamp },
          ]);
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
    <div className="w-full bg-gray-900 rounded-lg overflow-hidden shadow-lg">
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
                message.type === "sent" ? "bg-orange-500" : "bg-slate-800"
              } text-white p-2 rounded-lg`}
            >
              <p className="whitespace-pre-line">{message.text}</p>
              {message.timestamp && ( // Conditionally render timestamp
                <p className="text-xs text-white text-right mt-1">
                  {message.timestamp}
                </p>
              )}
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
