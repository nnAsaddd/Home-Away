import { NavlinksType, SelectItem } from "./types";

export const Navlinks: NavlinksType[] = [
  { href: "/", label: "home" },
  { href: "/favorites ", label: "favorites" },
  { href: "/bookings ", label: "bookings" },
  { href: "/reviews ", label: "reviews" },
  { href: "/rentals/create ", label: "create rental" },
  { href: "/rentals", label: "my rentals" },
  { href: "/profile ", label: "profile" },
];

export const JobStatusItem: SelectItem[] = [
  { value: "pending" },
  { value: "interview" },
  { value: "declined" },
];

export const JobModeItem: SelectItem[] = [
  { value: "full-time" },
  { value: "part-time" },
  { value: "internship" },
];
