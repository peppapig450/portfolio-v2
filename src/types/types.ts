import { ReactNode } from "react";

// Define the base timeline data interface with common properties
interface BaseItem {
  title: string;
  description: string;
  link: string;
}

// Extend BaseItem with the initial Timeline item stuff
export interface AboutMeItem extends BaseItem {
  icon: ReactNode;
  linkText: string;
}

// Extend BaseItem for PlaylistItem with additional properties
export interface PlaylistItem extends BaseItem {
  source: string;
}

// Define the context data type that combines all items
export interface AboutContextData {
  aboutMeItems: AboutMeItem[];
  playlistItems: PlaylistItem[];
}
