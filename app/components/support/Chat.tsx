"use client";

// components/ChatComponent.tsx
import { useState } from "react";
import Avatar from "../Avatar";
import { SafeUser } from "@/types";
import ChatHeader from "./ChatHeader";

interface ChatComponentProps {
  currentUser: SafeUser | null;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ currentUser }) => {
  const [messages, setMessages] = useState([
    {
      sender: "Admin",
      text: "Hi, how can I help you today?",
      type: "received",
    },
    {
      sender: "User",
      text: "Hey, I'm having \trouble with my account.",
      type: "sent",
    },
    {
      sender: "Sofia Davis",
      text: "What seems to be the problem?",
      type: "received",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        { sender: "User", text: inputValue, type: "sent" },
      ]);
      setInputValue("");
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
