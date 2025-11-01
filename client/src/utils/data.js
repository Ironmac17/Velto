import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuLogOut,
} from "react-icons/lu";
import { BarChart3, Clock, FileDown } from "lucide-react";

export const FEATURES = [
  {
    icon: BarChart3,
    title: "Visual Expense Tracking",
    description: "See your income and expense trends with clear, interactive graphs.",
    gradient: "from-violet-500 to-green-500",
  },
  {
    icon: Clock,
    title: "History Overview",
    description: "Browse detailed transaction history and analyze spending patterns.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: FileDown,
    title: "CSV Export",
    description: "Download your records anytime in CSV format for easy data management.",
    gradient: "from-emerald-500 to-teal-500",
  },
];

export const TESTIMONIALS = [
  {
    name: "Riya Sharma",
    role: "Student",
    feedback:
      "Velto helped me finally understand where my money goes every month!",
    photo:
      "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Karan Mehta",
    role: "Entrepreneur",
    feedback:
      "Simple, clean, and effective. The graphs make it so easy to track income and expenses.",
    photo:
      "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Ayesha Khan",
    role: "Freelancer",
    feedback:
      "I use Velto daily to stay organized. CSV export is a life-saver for my accountant.",
    photo:
      "https://randomuser.me/api/portraits/women/68.jpg",
  },
];


export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Income",
    icon: LuWalletMinimal,
    path: "/income",
  },
  {
    id: "03",
    label: "Expense",
    icon: LuHandCoins,
    path: "/expense",
  },
  {
    id: "06",
    label: "Logout",
    icon: LuLogOut,
    path: "/logout",
  },
];
