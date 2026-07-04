"use client";

import { useEffect, useState } from "react";
import { Shield, Trash2, UserPlus, Pencil } from "lucide-react";
import RoleGuard from "@/components/RoleGuard";
import Skeleton from "@/components/Skeleton";
import {
  AdminUserDto,
  AuditLogDto,
  createAdminUser,
  deleteAdminUser,
  fetchAdminUsers,
  fetchAuditLogs,
  updateAdminUser,
} from "@/lib/api";
import { ALL_ROLES } from "@/lib/roles";
import { translateKey } from "@/lib/i18n";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/locales";
import {
  InputField,
  PageCard,
  PageHeader,
  PageShell,
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui/page-shell";

export default function AdminPage() {
  return (
    <RoleGuard roles={["admin", "supAdmin"]}>
      <AdminContent />
    </RoleGuard>
  );
}

function AdminContent() {
  const { language } = useLanguage();
  const t = translations[language];
  const [users, setUsers] = useState<AdminUserDto[]>([]);
  const [audit, setAudit] = useState<AuditLogDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["student"]);

  const load = async () => {
    setLoading(true);
    const [u, a] = await Promise.all([fetchAdminUsers(), fetchAuditLogs()]);
    setUsers(u);
    setAudit(a);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setEditId(null);
    setEmail("");
    setPassword("");
    setDisplayName("");
    setSelectedRoles(["student"]);
    setFormOpen(false);
  };

  const handleSave = async () => {
    if (editId) {
      const updated = await updateAdminUser(editId, {
        displayName,
        roles: selectedRoles,
      });
      if (updated) resetForm();
    } else {
      if (!email || !password || !displayName) return;
      const created = await createAdminUser({
        email,
        password,
        displayName,
        roles: selectedRoles,
      });
      if (created) resetForm();
    }
    await load();
  };

  const startEdit = (user: AdminUserDto) => {
    setEditId(user.id);
    setDisplayName(user.displayName);
    setSelectedRoles([...user.roles]);
    setFormOpen(true);
  };

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  return (
    <PageShell>
      <PageHeader
        icon={Shield}
        title={t.adminPanel}
        subtitle="Управление пользователями и ролями"
        actions={
          <PrimaryButton onClick={() => { resetForm(); setFormOpen(true); }}>
            <UserPlus className="h-4 w-4" />
            Добавить
          </PrimaryButton>
        }
      />

      {loading ? (
        <Skeleton width="w-full" height="h-64" className="rounded-2xl" />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <PageCard>
            <h2 className="mb-4 text-lg font-semibold">Пользователи ({users.length})</h2>
            <div className="space-y-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200/80 p-4 dark:border-slate-800"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.displayName}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {user.roles.map((r) => (
                        <span
                          key={r}
                          className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs text-indigo-600 dark:text-indigo-400"
                        >
                          {translateKey(t, r)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <SecondaryButton onClick={() => startEdit(user)}>
                      <Pencil className="h-4 w-4" />
                    </SecondaryButton>
                    <SecondaryButton
                      onClick={async () => {
                        if (confirm(`Удалить ${user.email}?`)) {
                          await deleteAdminUser(user.id);
                          await load();
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </SecondaryButton>
                  </div>
                </div>
              ))}
            </div>
          </PageCard>

          <PageCard>
            <h2 className="mb-4 text-lg font-semibold">Журнал аудита</h2>
            <div className="max-h-[480px] space-y-2 overflow-y-auto text-sm">
              {audit.map((log) => (
                <div
                  key={log.id}
                  className="rounded-lg border border-gray-100 p-2 dark:border-slate-800"
                >
                  <p className="font-medium">{log.action}</p>
                  <p className="text-gray-500">{log.actorEmail ?? "—"}</p>
                  <p className="text-xs text-gray-400">{log.details}</p>
                  <p className="text-xs text-gray-400">{log.createdAt}</p>
                </div>
              ))}
            </div>
          </PageCard>
        </div>
      )}

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <PageCard className="w-full max-w-md">
            <h2 className="mb-4 text-xl font-bold">
              {editId ? "Редактировать" : "Новый пользователь"}
            </h2>
            <div className="space-y-3">
              {!editId && (
                <>
                  <InputField
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputField
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              )}
              <InputField
                placeholder="Имя"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <div>
                <p className="mb-2 text-sm font-medium">Роли</p>
                <div className="flex flex-wrap gap-2">
                  {ALL_ROLES.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => toggleRole(role)}
                      className={`rounded-lg px-3 py-1 text-sm ${
                        selectedRoles.includes(role)
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-600 dark:bg-slate-800"
                      }`}
                    >
                      {translateKey(t, role)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <SecondaryButton onClick={resetForm}>Отмена</SecondaryButton>
                <PrimaryButton onClick={handleSave}>Сохранить</PrimaryButton>
              </div>
            </div>
          </PageCard>
        </div>
      )}
    </PageShell>
  );
}
