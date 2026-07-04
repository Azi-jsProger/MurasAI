"use client";

import React, { createContext, useState, useEffect } from "react";
import { fetchAuthMe, fetchUserProfile } from "@/lib/api";

type UserContextType = {
  userName: string;
  avatarBg: string;
  aiRatingKey: string;
  aiGrade: string;
  roles: string[];
  hasRole: (...roles: string[]) => boolean;
  loading: boolean;
};

export const UserContext = createContext<UserContextType>({
  userName: "Гость",
  avatarBg: "6366f1",
  aiRatingKey: "advanced",
  aiGrade: "A+",
  roles: [],
  hasRole: () => false,
  loading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserName] = useState("Гость");
  const [avatarBg, setAvatarBg] = useState("6366f1");
  const [aiRatingKey, setAiRatingKey] = useState("advanced");
  const [aiGrade, setAiGrade] = useState("A+");
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      // roles live on /api/auth/me now (cookie-auth aware)
      const me = await fetchAuthMe();
      if (me?.authenticated && me.roles) setRoles(me.roles);

      const profile = await fetchUserProfile();
      if (profile) {
        setUserName(profile.userName);
        setAvatarBg(profile.avatarBg.replace("#", ""));
        setAiRatingKey(profile.aiRatingKey);
        setAiGrade(profile.aiGrade);
      }
      setLoading(false);
    }

    loadUser();
  }, []);

  const hasRole = (...need: string[]) => need.some((r) => roles.includes(r));

  return (
    <UserContext.Provider
      value={{ userName, avatarBg, aiRatingKey, aiGrade, roles, hasRole, loading }}
    >
      {children}
    </UserContext.Provider>
  );
}
