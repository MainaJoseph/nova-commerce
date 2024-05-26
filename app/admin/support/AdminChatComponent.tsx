"use client";

import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { SafeUser } from "@/types"; // Assuming SafeUser type is defined
import { PartialSafeUser } from "@/types/types"; // Import PartialSafeUser
import Avatar from "@/app/components/Avatar"; // Assuming you have an Avatar component
import ChatHeader from "./ChatHeader";

interface AdminChatComponentProps {
  currentUser: SafeUser | null;
}

interface Message {
  sender: string;
  text: string;
  type: "sent" | "received";
  timestamp?: string;
}

interface ChatSession {
  id: string;
  messages: Message[];
}

interface UserChatSession {
  userId: string;
  userName: string;
  sessionId: string;
  userEmail: string; // Make sure to include userEmail and userImage in your data fetching
  userImage: string;
}

const AdminChatComponent: React.FC<AdminChatComponentProps> = ({
  currentUser,
}) => {
  const [users, setUsers] = useState<UserChatSession[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<PartialSafeUser | null>(
    null
  ); // Use PartialSafeUser type
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  const fetchUsers = () => {
    axios
      .get("/api/chat/users")
      .then((response: AxiosResponse<UserChatSession[]>) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  };

  const fetchMessages = (sessionId: string) => {
    axios
      .get(`/api/chat/messages?sessionId=${sessionId}`)
      .then((response: AxiosResponse<Message[]>) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };

  const handleUserSelect = (user: UserChatSession) => {
    setSelectedUserId(user.userId);
    setSelectedUser({
      id: user.userId,
      name: user.userName,
      email: user.userEmail,
      image: user.userImage,
    });
    fetchMessages(user.sessionId);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() && selectedUserId && currentUser) {
      const newMessage: Message = {
        sender: "Admin",
        text: inputValue,
        type: "sent",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      axios
        .post("/api/chat/messages", {
          userId: selectedUserId,
          sessionId: users.find((user) => user.userId === selectedUserId)
            ?.sessionId,
          sender: newMessage.sender,
          text: newMessage.text,
          type: newMessage.type,
          timestamp: newMessage.timestamp,
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
    if (e.key === "Enter" && selectedUserId) {
      handleSendMessage();
    }
  };

  return (
    <div className="w-full bg-gray-900 rounded-lg overflow-hidden shadow-lg flex flex-col">
      {selectedUser && <ChatHeader user={selectedUser} />}
      <div className="flex flex-1">
        <div className="w-1/4 bg-gray-800 p-4 overflow-y-scroll">
          {users.map((user) => (
            <div
              key={user.userId}
              className={`flex items-center mb-2 cursor-pointer p-2 rounded-lg ${
                selectedUserId === user.userId ? "border border-orange-500" : ""
              }`}
              onClick={() => handleUserSelect(user)}
            >
              <Avatar src={user.userImage} />
              <span className="ml-2 text-white">{user.userName}</span>
            </div>
          ))}
        </div>
        <div className="w-3/4">
          <div className="p-4 bg-gray-700 h-64 overflow-y-scroll">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "Admin" ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`${
                    message.sender === "Admin"
                      ? "bg-orange-500"
                      : "bg-slate-500"
                  } text-white p-2 rounded-lg`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                  {message.timestamp && (
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
              disabled={!selectedUserId} // Disable input if no user is selected
            />
            <button
              onClick={handleSendMessage}
              className={`ml-2 p-2 bg-orange-500 text-white rounded ${
                !selectedUserId || loading
                  ? "cursor-not-allowed bg-orange-300"
                  : "cursor-pointer"
              }`}
              disabled={!selectedUserId || loading} // Disable button if no user is selected or if loading
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChatComponent;
