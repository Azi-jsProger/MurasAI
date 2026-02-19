"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

// Интерфейс для контекста
interface UserContextType {
  userName: string;
  avatarBg: string;
}

// Создаем контекст с дефолтными значениями
export const UserContext = createContext<UserContextType>({
  userName: "Student S",
  avatarBg: "6366F1",
});

// Провайдер, который будет оборачивать все приложение
export function UserProvider({ children }: { children: ReactNode }) {
  const names = ["Aziret O", "Daniel K", "Beknazar T", "Emirlan N"];
  const colors = ["6366F1", "10B981", "F59E0B", "EF4444"]; // Hex цвета для аватара

  const [userName, setUserName] = useState("Student S");
  const [avatarBg, setAvatarBg] = useState("6366F1");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * names.length);
    setUserName(names[randomIndex]);
    setAvatarBg(colors[randomIndex]);
  }, []);

  return (
    <UserContext.Provider value={{ userName, avatarBg }}>
      {children}
    </UserContext.Provider>
  );
}
