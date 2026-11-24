// src/config/photos.ts — Romantic Memory Constellation Configuration
// Featuring real couple memories of Shim (Captain) & Saba (Chubby)

import photo1 from 'C:/Users/Admin/.gemini/antigravity/brain/71066aa7-597d-4cb8-8a4e-ceb421e21784/.user_uploaded/media_1795478808485_b149649f.png';
import photo2 from 'C:/Users/Admin/.gemini/antigravity/brain/71066aa7-597d-4cb8-8a4e-ceb421e21784/.user_uploaded/media_1795478808520_09d9ef00.jpg';
import photo3 from 'C:/Users/Admin/.gemini/antigravity/brain/71066aa7-597d-4cb8-8a4e-ceb421e21784/.user_uploaded/media_1795478808520_a14946c0.jpg';
import photo4 from 'C:/Users/Admin/.gemini/antigravity/brain/71066aa7-597d-4cb8-8a4e-ceb421e21784/.user_uploaded/media_1795478808546_96406387.jpg';
import photo5 from 'C:/Users/Admin/.gemini/antigravity/brain/71066aa7-597d-4cb8-8a4e-ceb421e21784/.user_uploaded/media_1795478808566_dabdc03f.jpg';
import photo6 from 'C:/Users/Admin/.gemini/antigravity/brain/71066aa7-597d-4cb8-8a4e-ceb421e21784/.user_uploaded/media_1795478808587_a80f2c89.jpg';
import photo7 from 'C:/Users/Admin/.gemini/antigravity/brain/71066aa7-597d-4cb8-8a4e-ceb421e21784/.user_uploaded/media_1795478808629_981aa994.jpg';

export interface PhotoItem {
  id: number;
  src: string;
  caption: string;
  date?: string;
  location?: string;
}

export const photos: PhotoItem[] = [
  {
    id: 1,
    src: photo1,
    caption: "Resting on your shoulder, holding your arm.",
    date: "Every sweet moment",
    location: "My safest place"
  },
  {
    id: 2,
    src: photo2,
    caption: "Stealing my cap and flashing peace signs.",
    date: "Late night video calls",
    location: "Miles apart, close at heart"
  },
  {
    id: 3,
    src: photo3,
    caption: "Our chaotic skincare routine together.",
    date: "Face mask night",
    location: "Our silly happiness"
  },
  {
    id: 4,
    src: photo4,
    caption: "Leaning on you in quiet comfort.",
    date: "Month 1 & forever",
    location: "Beside each other"
  },
  {
    id: 5,
    src: photo5,
    caption: "Train journeys and silly smiles with you.",
    date: "Our travel adventures",
    location: "On the train together"
  },
  {
    id: 6,
    src: photo6,
    caption: "Lazy sweet afternoons and your radiant smile.",
    date: "Quiet afternoon dates",
    location: "Just you and me"
  },
  {
    id: 7,
    src: photo7,
    caption: "Our mirror selfie under the archway.",
    date: "Hackathon & College days",
    location: "Always side by side"
  },
];

export const finalePhoto = photo7;
