import { LucideIcon } from "lucide-react";

export interface Category {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  color: string;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  category: "Humanity" | "Funny Animals";
}
