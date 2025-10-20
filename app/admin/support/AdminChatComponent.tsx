"use client";

import { useState, useEffect, useRef } from "react";
import axios, { AxiosResponse } from "axios";
import { SafeUser } from "@/types";
import { PartialSafeUser } from "@/types/types";
import Avatar from "@/app/components/Avatar";
import {
  Send,
  Search,
  MessageCircle,
  Users,
  Clock,
  CheckCheck,
} from "lucide-react";

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
  userEmail: string;
  userImage: string;
}

const AdminChatComponent: React.FC<AdminChatComponentProps> = ({
  currentUser,
}) => {
  const [users, setUsers] = useState<UserChatSession[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<PartialSafeUser | null>(
    null,
  );
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (currentUser) {
      fetchUsers();
      // Poll for new users every 5 seconds
      const interval = setInterval(fetchUsers, 5000);
      return () => clearInterval(interval);
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

  const filteredUsers = users.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.userEmail.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getFirstName = (name: string) => {
    return name.split(" ")[0];
  };

  return (
    <div className="flex h-[calc(100vh-200px)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
      {/* Sidebar - Users List */}
      <div className="flex w-80 flex-col border-r border-gray-200 bg-gray-50">
        {/* Sidebar Header */}
        <div className="border-b border-gray-200 bg-gradient-to-r from-orange-500 to-orange-600 p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Support Chat</h2>
              <p className="text-sm text-orange-100">
                {users.length} active conversation
                {users.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border-0 bg-white/90 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 backdrop-blur-sm transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center">
              <MessageCircle className="mx-auto mb-3 h-12 w-12 text-gray-300" />
              <p className="text-sm text-gray-500">
                {searchQuery ? "No users found" : "No active chats"}
              </p>
            </div>
          ) : (
            <div className="p-2">
              {filteredUsers.map((user) => (
                <div
                  key={user.userId}
                  onClick={() => handleUserSelect(user)}
                  className={`group mb-2 cursor-pointer rounded-xl p-4 transition-all duration-200 ${
                    selectedUserId === user.userId
                      ? "bg-orange-50 ring-2 ring-orange-500"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar src={user.userImage} />
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p
                        className={`truncate font-semibold ${
                          selectedUserId === user.userId
                            ? "text-orange-900"
                            : "text-gray-900"
                        }`}
                      >
                        {user.userName}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {user.userEmail}
                      </p>
                    </div>
                    {selectedUserId === user.userId && (
                      <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="border-b border-gray-200 bg-white px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar src={selectedUser.image} />
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedUser.name}
                    </h3>
                    <p className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                      Active now
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {selectedUser.email}
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
              {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                    <p className="text-sm text-gray-500">
                      No messages yet. Start the conversation!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.sender === "Admin"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                          message.sender === "Admin"
                            ? "rounded-br-none bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                            : "rounded-bl-none bg-white text-gray-800 shadow-sm"
                        }`}
                      >
                        <p className="whitespace-pre-line text-sm leading-relaxed">
                          {message.text}
                        </p>
                        <div
                          className={`mt-1 flex items-center gap-1 text-xs ${
                            message.sender === "Admin"
                              ? "justify-end text-orange-100"
                              : "text-gray-400"
                          }`}
                        >
                          <Clock className="h-3 w-3" />
                          {message.timestamp}
                          {message.sender === "Admin" && (
                            <CheckCheck className="h-3 w-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 bg-white p-4">
              <div className="flex items-end gap-3">
                <input
                  type="text"
                  placeholder={`Message ${selectedUser ? getFirstName(selectedUser.name || "") : "user"}...`}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  className="flex-1 rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm transition-all focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md transition-all hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-1 items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
                <MessageCircle className="h-10 w-10 text-orange-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Welcome to Support Chat
              </h3>
              <p className="text-sm text-gray-500">
                Select a conversation from the left to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChatComponent;
