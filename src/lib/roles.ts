export type Role =
  | "supAdmin"
  | "admin"
  | "teacher"
  | "director"
  | "student"
  | "secretary";

export const ALL_ROLES: Role[] = [
  "supAdmin",
  "admin",
  "teacher",
  "director",
  "student",
  "secretary",
];

export type NavItem = {
  href: string;
  labelKey: string;
  roles: Role[];
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", labelKey: "home", roles: ALL_ROLES },
  { href: "/schedule", labelKey: "schedule", roles: ["student", "teacher", "secretary", "director", "admin", "supAdmin"] },
  { href: "/chat", labelKey: "chat", roles: ["student", "teacher", "director", "admin", "supAdmin"] },
  { href: "/personal", labelKey: "personal", roles: ALL_ROLES },
  { href: "/analytics", labelKey: "analytics", roles: ["student", "teacher", "director", "admin", "supAdmin"] },
  { href: "/tests", labelKey: "tests", roles: ["student", "teacher", "admin", "supAdmin"] },
  { href: "/webtest", labelKey: "webtest", roles: ["student", "teacher", "admin", "supAdmin"] },
  { href: "/plan", labelKey: "plan", roles: ["student"] },
  { href: "/teacher", labelKey: "teacherPanel", roles: ["teacher", "director", "admin", "supAdmin"] },
  { href: "/director", labelKey: "directorPanel", roles: ["director", "admin", "supAdmin"] },
  { href: "/admin", labelKey: "adminPanel", roles: ["admin", "supAdmin"] },
];

export function canAccess(roles: string[], allowed: Role[]): boolean {
  return allowed.some((r) => roles.includes(r));
}

export function primaryRole(roles: string[]): string {
  const order: Role[] = ["supAdmin", "admin", "director", "teacher", "secretary", "student"];
  return order.find((r) => roles.includes(r)) ?? roles[0] ?? "student";
}
