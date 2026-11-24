// src/config/theme.ts — Cinematic Romantic Palette
export const theme = {
  colors: {
    midnightBlue:  '#0B1026',
    royalPurple:   '#342454',
    dustyRose:     '#D98FA8',
    warmPeach:     '#F4B8A4',
    champagneGold: '#E8C88D',
    softIvory:     '#FFF6EE',
    deepNavy:      '#070B1A',
    emeraldMoss:   '#2A382A',
    streamBlue:    '#3B7A8C',
  },
  glows: {
    gold:    '0 0 25px rgba(232, 200, 141, 0.6), 0 0 50px rgba(232, 200, 141, 0.25)',
    rose:    '0 0 25px rgba(217, 143, 168, 0.6), 0 0 55px rgba(217, 143, 168, 0.25)',
    peach:   '0 0 25px rgba(244, 184, 164, 0.5), 0 0 50px rgba(244, 184, 164, 0.2)',
    lantern: '0 0 20px rgba(232, 200, 141, 0.8), 0 0 45px rgba(244, 184, 164, 0.4)',
  },
} as const;
