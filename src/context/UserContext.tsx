"use client";

import React, { createContext, useState, useEffect } from "react";
import { fetchCurrentUser } from "@/lib/api";

type UserContextType = {
  userName: string;
  avatarBg: string;
  loading: boolean;
};

export const UserContext = createContext<UserContextType>({
  userName: "Гость",
  avatarBg: "indigo",
  loading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserName] = useState<string>("Гость");
  const [avatarBg, setAvatarBg] = useState<string>("6366f1"); // Дефолтный цвет indigo в HEX для аватарок
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUser() {
      const name = await fetchCurrentUser();
      if (name) {
        setUserName(name);
        
        // Опционально: генерируем уникальный цвет аватарки на основе первой буквы имени
        const colors = ["6366f1", "ec4899", "10b981", "f59e0b", "3b82f6"];
        const charCode = name.charCodeAt(0) || 0;
        setAvatarBg(colors[charCode % colors.length]);
      }
      setLoading(false);
    }

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ userName, avatarBg, loading }}>
      {children}
    </UserContext.Provider>
  );
}