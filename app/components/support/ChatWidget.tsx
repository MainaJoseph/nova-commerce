"use client";

import { useState, useEffect, useRef } from "react";
import axios, { AxiosResponse } from "axios";
import { SafeUser } from "@/types";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";
import Avatar from "../Avatar";

interface ChatWidgetProps {
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

const ChatWidget: React.FC<ChatWidgetProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showNewMessageBadge, setShowNewMessageBadge] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const previousMessageCountRef = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowNewMessageBadge(false);
  };

  const isUserAtBottom = () => {
    const container = messagesContainerRef.current;
    if (!container) return true;

    const threshold = 100; // pixels from bottom
    const position =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    return position < threshold;
  };

  const handleScroll = () => {
    if (isUserAtBottom()) {
      setShowNewMessageBadge(false);
    }
  };

  useEffect(() => {
    // Only scroll if user is at bottom or if there are new messages
    const hasNewMessages = messages.length > previousMessageCountRef.current;

    if (hasNewMessages) {
      if (isUserAtBottom()) {
        scrollToBottom();
      } else {
        // User is scrolled up, show badge instead
        setShowNewMessageBadge(true);
      }
    }

    previousMessageCountRef.current = messages.length;
  }, [messages]);

  useEffect(() => {
    if (currentUser && isOpen && !sessionId) {
      setLoading(true);
      axios
        .get(`/api/chat/chats?userId=${currentUser.id}`)
        .then((response: AxiosResponse<ChatSession[]>) => {
          const sessions = response.data;
          if (sessions.length > 0) {
            const lastSession = sessions[sessions.length - 1];
            setSessionId(lastSession.id);
            setMessages([
              {
                sender: "Nova Support",
                text: "Hi! How can I help you today? 👋",
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
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [currentUser, isOpen, sessionId]);

  // Poll for new messages every 3 seconds when chat is open
  useEffect(() => {
    if (sessionId && isOpen) {
      const pollMessages = () => {
        axios
          .get(`/api/chat/messages?sessionId=${sessionId}`)
          .then((response: AxiosResponse<Message[]>) => {
            setMessages([
              {
                sender: "Nova Support",
                text: "Hi! How can I help you today? 👋",
                type: "received",
              },
              ...response.data,
            ]);
          })
          .catch((error) => {
            console.error("Error polling messages:", error);
          });
      };

      // Poll every 3 seconds
      const interval = setInterval(pollMessages, 3000);

      // Cleanup on unmount or when dependencies change
      return () => clearInterval(interval);
    }
  }, [sessionId, isOpen]);

  const createNewSession = () => {
    if (currentUser) {
      axios
        .post("/api/chat/chats", { userId: currentUser.id })
        .then((response: AxiosResponse<ChatSession>) => {
          const newSession = response.data;
          setSessionId(newSession.id);
          setMessages([
            {
              sender: "Nova Support",
              text: "Hi! How can I help you today? 👋",
              type: "received",
            },
          ]);
        })
        .catch((error) => {
          console.error("Error creating new session:", error);
        })
        .finally(() => {
          setLoading(false);
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
        }),
      };

      axios
        .post("/api/chat/messages", {
          userId: currentUser.id,
          sessionId,
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getFirstName = (name: string | null) => {
    if (!name) return "Guest";
    return name.split(" ")[0];
  };

  if (!currentUser) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        >
          <MessageCircle className="h-6 w-6 text-white" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex h-5 w-5 rounded-full bg-orange-500"></span>
          </span>
        </button>

        {isOpen && (
          <div className="animate-in slide-in-from-bottom-5 absolute bottom-20 right-0 w-96 rounded-2xl border border-gray-200 bg-white shadow-2xl">
            <div className="rounded-t-2xl bg-gradient-to-r from-orange-500 to-orange-600 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  Nova Support
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 text-white transition-colors hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6 text-center">
              <p className="mb-4 text-gray-600">
                Please sign in to chat with our support team
              </p>
              <a
                href="/login"
                className="inline-block rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2 font-semibold text-white transition-all hover:scale-105"
              >
                Sign In
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        >
          <MessageCircle className="h-6 w-6 text-white" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex h-5 w-5 rounded-full bg-orange-500"></span>
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`absolute bottom-0 right-0 flex w-96 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 ${
            isMinimized ? "h-16" : "h-[600px]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-orange-500 to-orange-600 p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar src={currentUser?.image} />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  {getFirstName(currentUser?.name)}
                </h3>
                <p className="text-xs text-orange-100">
                  Chat with Nova Support
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="rounded-full p-1 text-white transition-colors hover:bg-white/20"
              >
                <Minimize2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-white transition-colors hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
                {loading ? (
                  <div className="flex h-full items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.sender === "User"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                            message.sender === "User"
                              ? "rounded-br-none bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                              : "rounded-bl-none bg-slate-600 text-white shadow-sm"
                          }`}
                        >
                          <p className="whitespace-pre-line text-sm">
                            {message.text}
                          </p>
                          {message.timestamp && (
                            <p
                              className={`mt-1 text-xs ${
                                message.sender === "User"
                                  ? "text-orange-100"
                                  : "text-slate-300"
                              }`}
                            >
                              {message.timestamp}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 bg-white p-4">
                <div className="flex items-end gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    disabled={loading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={loading || !inputValue.trim()}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md transition-all hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-2 text-center text-xs text-gray-400">
                  Powered by Nova Support.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
