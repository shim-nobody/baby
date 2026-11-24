// src/config/photos.ts — Romantic Memory Constellation Configuration
// Featuring real couple memories of Shim (Captain) & Saba (Chubby)

import photo1 from '../assets/photos/photo1.png';
import photo2 from '../assets/photos/photo2.jpg';
import photo3 from '../assets/photos/photo3.jpg';
import photo4 from '../assets/photos/photo4.jpg';
import photo5 from '../assets/photos/photo5.jpg';
import photo6 from '../assets/photos/photo6.jpg';
import photo7 from '../assets/photos/photo7.jpg';

export interface PhotoEntry {
  id: number;
  src: string;
  caption: string;
  date?: string;
  location?: string;
  category?: string;
  order?: number;
  note?: string;
}

export type PhotoItem = PhotoEntry;

export const photos: PhotoEntry[] = [
  {
    id: 1,
    src: photo1,
    caption: "Resting on your shoulder, holding your arm.",
    date: "Every sweet moment",
    location: "My safest place",
    category: "Sweet Moments",
    order: 1,
  },
  {
    id: 2,
    src: photo2,
    caption: "Stealing my cap and flashing peace signs.",
    date: "Late night video calls",
    location: "Miles apart, close at heart",
    category: "Video Calls",
    order: 2,
  },
  {
    id: 3,
    src: photo3,
    caption: "Our chaotic skincare routine together.",
    date: "Face mask night",
    location: "Our silly happiness",
    category: "Video Calls",
    order: 3,
  },
  {
    id: 4,
    src: photo4,
    caption: "Leaning on you in quiet comfort.",
    date: "Month 1 & forever",
    location: "Beside each other",
    category: "Sweet Moments",
    order: 4,
  },
  {
    id: 5,
    src: photo5,
    caption: "Train journeys and silly smiles with you.",
    date: "Our travel adventures",
    location: "On the train together",
    category: "Adventures",
    order: 5,
  },
  {
    id: 6,
    src: photo6,
    caption: "Lazy sweet afternoons and your radiant smile.",
    date: "Quiet afternoon dates",
    location: "Just you and me",
    category: "Sweet Moments",
    order: 6,
  },
  {
    id: 7,
    src: photo7,
    caption: "Our mirror selfie under the archway.",
    date: "Hackathon & College days",
    location: "Always side by side",
    category: "College & Hackathons",
    order: 7,
  },
];

export const finalePhoto = photo7;
export const finalSurprisePhoto = finalePhoto;
