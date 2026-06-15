"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/lib/api";
import { GraduationCap } from "lucide-react";

type AuthStatus = "loading" | "authenticated";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    let cancelled = false;

    checkAuth().then((ok) => {
      if (cancelled) return;

      if (ok) {
        setStatus("authenticated");
      } else {
        router.replace("/login");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (status !== "authenticated") {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-slate-950">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-500 ring-1 ring-indigo-500/30">
          <GraduationCap className="h-7 w-7 animate-pulse" />
        </div>
        <p className="text-sm text-gray-500 dark:text-slate-400">Загрузка...</p>
      </div>
    );
  }

  return <>{children}</>;
}
