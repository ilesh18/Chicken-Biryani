import {
  LayoutDashboard,
  User,
  GitBranch,
  CalendarDays,
  BookOpen,
  CalendarCheck,
  Library,
  Sparkles,
  Timer,
  Users,
  Trophy,
  LogOut,
  ChevronDown,
  Menu,
  Bell,
  Search,
  Settings,
  Shield,
  GraduationCap,
  BookMarked,
  ClipboardCheck,
  DoorOpen,
  FileText,
  BarChart3,
  Wallet,
  School,
} from "lucide-react";

export type Role = "student" | "faculty" | "admin";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export const studentNavigation: NavSection[] = [
  {
    title: "Academic",
    items: [
      { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard, exact: true },
      { label: "Profile", href: "/student/profile", icon: User },
      { label: "FCFS", href: "/student/fcfs", icon: GitBranch },
      { label: "Timetable", href: "/student/timetable", icon: CalendarDays },
      { label: "Classroom", href: "/student/classroom", icon: BookOpen },
      { label: "Calendar", href: "/student/calendar", icon: CalendarCheck },
      { label: "Leave", href: "/student/leave", icon: FileText },
    ],
  },
  {
    title: "Productivity",
    items: [
      { label: "Library", href: "/student/library", icon: Library },
      { label: "AI Summarizer", href: "/student/summarizer", icon: Sparkles },
      { label: "Pomodoro", href: "/student/pomodoro", icon: Timer },
      { label: "Study Rooms", href: "/student/study-rooms", icon: Users },
      { label: "Challenges", href: "/student/challenges", icon: Trophy },
    ],
  },
];

export const facultyNavigation: NavSection[] = [
  {
    title: "Academic",
    items: [
      { label: "Dashboard", href: "/faculty/dashboard", icon: LayoutDashboard, exact: true },
      { label: "Profile", href: "/faculty/profile", icon: User },
      { label: "Courses", href: "/faculty/courses", icon: BookMarked },
      { label: "Timetable", href: "/faculty/timetable", icon: CalendarDays },
      { label: "Classroom", href: "/faculty/classroom", icon: BookOpen },
      { label: "Approvals", href: "/faculty/approvals", icon: ClipboardCheck },
      { label: "Calendar", href: "/faculty/calendar", icon: CalendarCheck },
      { label: "Leave", href: "/faculty/leave", icon: FileText },
    ],
  },
];

export const adminNavigation: NavSection[] = [
  {
    title: "Platform",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, exact: true },
      { label: "Students", href: "/admin/students", icon: GraduationCap },
      { label: "Faculty", href: "/admin/faculty", icon: School },
      { label: "Courses", href: "/admin/courses", icon: BookMarked },
      { label: "Subjects", href: "/admin/subjects", icon: BookOpen },
      { label: "Timetables", href: "/admin/timetables", icon: CalendarDays },
      { label: "FCFS", href: "/admin/fcfs", icon: GitBranch },
      { label: "Leave", href: "/admin/leave", icon: FileText },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Security", href: "/admin/security", icon: Shield },
      { label: "Payments", href: "/admin/payments", icon: Wallet },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export const navigationByRole: Record<Role, NavSection[]> = {
  student: studentNavigation,
  faculty: facultyNavigation,
  admin: adminNavigation,
};

export function getNavigationForRole(role: Role): NavSection[] {
  return navigationByRole[role] ?? [];
}

export function isActiveNavItem(href: string, pathname: string): boolean {
  if (href === "/" || href === "") return pathname === href;
  if (href === "/student/dashboard" || href === "/faculty/dashboard" || href === "/admin/dashboard") {
    return pathname === href;
  }
  return pathname.startsWith(href + "/") || pathname === href;
}
