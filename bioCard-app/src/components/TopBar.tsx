import type { userType } from "@/types/user";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

type TopBarProps = {
  user: userType;
  onLogout: () => void;
};

export default function TopBar({ user, onLogout }: TopBarProps) {
  return (
    <div className="bg-gray-700 text-primary-foreground flex justify-between items-center px-8 py-4 shadow">
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl">MediCard</span>
      </div>
      <div className="flex items-center gap-4">
        <span>
          Welcome, {user?.name} ({user?.role})
        </span>
        <Button
          onClick={onLogout}
          className="flex items-center gap-2 rounded-full bg-white text-black border border-gray-300 shadow-sm transition-colors duration-200
            hover:bg-primary hover:text-white hover:border-primary"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </div>
  );
}
