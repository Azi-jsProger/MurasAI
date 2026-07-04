"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { Role } from "@/lib/roles";
import Skeleton from "@/components/Skeleton";

type Props = {
  roles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export default function RoleGuard({ roles: allowed, children, fallback }: Props) {
  const { roles, loading, hasRole } = useContext(UserContext);
  const router = useRouter();

  const allowedAccess = allowed.some((r) => hasRole(r));

  useEffect(() => {
    if (!loading && !allowedAccess) {
      router.replace("/");
    }
  }, [loading, allowedAccess, router]);

  if (loading) {
    return <Skeleton width="w-full" height="h-64" className="rounded-2xl" />;
  }

  if (!allowedAccess) {
    return (
      fallback ?? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center text-red-600 dark:text-red-400">
          Доступ запрещён
        </div>
      )
    );
  }

  return <>{children}</>;
}
