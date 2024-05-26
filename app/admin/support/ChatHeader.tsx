import Avatar from "@/app/components/Avatar";
import { PartialSafeUser } from "@/types/types";
// Import PartialSafeUser

interface ChatHeaderProps {
  user: PartialSafeUser | null;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ user }) => {
  return (
    <div className="p-4 bg-gray-800">
      <div className="flex items-center">
        <div className="flex items-center justify-center">
          <Avatar src={user?.image} />
        </div>
        <div className="ml-2 text-white">
          <p className="font-bold">{user?.name}</p>
          <p className="text-sm">{user?.email}</p>
        </div>
        <div className="ml-auto">
          <button className="text-gray-400 hover:text-white">
            <span className="sr-only">Add contact</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 2 2zM6 4c1.1 0 2-.9 2-2S7.1 0 6 0 4 .9 4 2s.9 2 2 2zm6 2c-3.31 0-6 2.69-6 6v7c0 1.1.9 2 2 2h1v-6H8v-1c0-2.21 1.79-4 4-4s4 1.79 4 4v1h-1v6h1c1.1 0 2-.9 2-2v-7c0-3.31-2.69-6-6-6zm0 15c-.55 0-1 .45-1 1h-2c0-1.66 1.34-3 3-3s3 1.34 3 3h-2c0-.55-.45-1-1-1z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
