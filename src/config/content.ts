// src/config/content.ts — The Universe Where I Found You
// Complete Authentic Storyline of Shim (Captain) & Saba (Chubby)

export const META = {
  title: "The Universe Where I Found You",
  subtitle: "A Little World Made for My Chubby",
  openingHeading: "To My Chubby, From Your Captain",
  openingSubtitle: "I made something for you, Baby. A little world filled with everything I never knew how to say.",
  openingButton: "Open My Heart",
  sender: "Shim",
  senderNick: "Captain",
  recipient: "Saba",
  recipientNicknames: ["Baby", "Chubby", "My Love"],
  occasion: "Two Months of Love & Magic",
};

export interface StoryChapter {
  id: number;
  slug: string;
  landmark: string;
  title: string;
  subtitle: string;
  locationLabel: string;
  paragraphs: string[];
  ambientVisual?: string;
  quoteHighlight?: string;
}

export const storyChapters: StoryChapter[] = [
  {
    id: 1,
    slug: "silence",
    landmark: "cottage",
    locationLabel: "The Quiet Cottage",
    title: "THE BOY WHO LOVED SILENCE",
    subtitle: "Before you, my world was quiet, safe, and lonely.",
    quoteHighlight: "Being understood by someone could feel even more peaceful than being alone.",
    paragraphs: [
      "Before you, Baby, I was someone who had learned to find comfort in being alone.",
      "I never really liked meeting new people. I wasn't the kind of boy who could easily walk into a room and start conversations. I had my own little world, my own dreams, and a quiet life that I thought would always be enough.",
      "I had grown so used to keeping everything to myself that I never imagined someone could make me want to share my days, my thoughts, and even my smallest feelings.",
      "I wasn't waiting for someone to change my life.",
      "And then, somehow, you became part of it.",
      "You didn't ask me to become a different person. You simply made me feel that I could be myself around you.",
      "And for the first time, I started realizing that maybe being understood by someone could feel even more peaceful than being alone.",
    ],
  },
  {
    id: 2,
    slug: "tree-smile",
    landmark: "tree",
    locationLabel: "The Cherry Blossom Tree",
    title: "THE SMILE UNDER THE TREE",
    subtitle: "The hackathon was my reason to approach you, but your smile was what drew me towards you.",
    quoteHighlight: "I went there looking for a teammate, but life introduced me to someone who would become so much more.",
    paragraphs: [
      "Baby, do you know the real reason I walked towards you that day?",
      "I still remember seeing a cute girl sitting under a tree, wearing the sweetest little smile. There was something about that smile that caught my attention, and I couldn't help but find you absolutely adorable.",
      "Yes, I came to you with an invitation to join our hackathon team. But I didn't approach you simply because I was looking for a female team member.",
      "I approached you because, among all the people around me, your smile was the one that made me want to come over and talk to you.",
      "And you know your Shim, Baby. Approaching someone new, especially a girl, was something completely outside my comfort zone.",
      "I was nervous, hesitant, and probably stammering a little while talking to you. But somehow, I gathered enough courage to walk towards you and ask if you would like to join our team.",
      "And when you said yes, I had no idea how much that little conversation would eventually mean to me.",
      "We exchanged numbers, became teammates, and started talking about our project. Everything seemed so ordinary at the time.",
      "But today, when I look back, that ordinary moment feels incredibly special.",
      "Who would have thought that the girl whose smile caught my attention under a tree would eventually become the girl whose smile I would want to see every single day?",
      "The girl I was once nervous to approach is now the person I never want to stop talking to.",
      "Sometimes, Baby, I wonder what would have happened if I hadn't gathered the courage to walk towards you that day.",
      "And I'm so grateful that I did.",
      "Because what began with a simple hackathon invitation turned into something far more beautiful than I could have ever imagined.",
      "**I went there looking for a teammate, but life introduced me to someone who would become so much more.**",
      "And it all started with that beautiful little smile of yours, my Chubby. ♡",
      "— Your Captain",
    ],
  },
  {
    id: 3,
    slug: "chose-me",
    landmark: "bridge",
    locationLabel: "The Lantern Bridge",
    title: "THE MOMENT YOU CHOSE ME",
    subtitle: "When you stood beside me, everything changed.",
    quoteHighlight: "Someone was saying that my presence mattered. And that someone was you.",
    paragraphs: [
      "Baby, there is one thing you did that I don't think I will ever forget.",
      "When things were difficult with the team, you stood beside me.",
      "You said that if Shim wasn't going to stay, you wouldn't stay either.",
      "Maybe you didn't realize how much those words meant to me. But I did.",
      "I was a boy who had spent so much of his life handling things on his own. And suddenly, someone was standing up for me.",
      "Someone was saying that my presence mattered. Someone was choosing to stay beside me. And that someone was you.",
      "I cannot explain how happy that made me. For the first time in a long time, I felt that I wasn't facing everything alone.",
      "You made me feel seen, valued, and supported.",
      "Baby, you didn't just defend me in that moment. You gave me a reason to believe that I could let someone into my world and trust that they would care.",
    ],
  },
  {
    id: 4,
    slug: "little-things",
    landmark: "garden",
    locationLabel: "The Botanical Heart Garden",
    title: "THE LITTLE THINGS",
    subtitle: "A gentle handkerchief, a tender touch, a quiet understanding.",
    quoteHighlight: "Sometimes, love is simply someone noticing the little things.",
    paragraphs: [
      "Do you know what I love about you, Baby? It's the little things.",
      "The things you do so naturally that you probably don't even remember them.",
      "I still remember that hackathon day.",
      "We were sitting together, working on our project, and my hands were sweating. And you gently took your handkerchief and wiped them.",
      "I know it sounds like such a small moment. But for me, it wasn't small at all.",
      "I remember being surprised that someone could care for me so naturally. You noticed something about me and helped without making it a big deal.",
      "That little moment stayed with me. And it wasn't the only one.",
      "Every time you listened to me, supported me, checked on me, or made me smile, you gave me another reason to feel grateful that you were in my life.",
      "You made me understand that love isn't always about grand gestures. Sometimes, love is simply someone noticing the little things.",
    ],
  },
  {
    id: 5,
    slug: "sunshine",
    landmark: "waterfall",
    locationLabel: "The Celestial Waterfall",
    title: "THE GIRL WHO BROUGHT SUNSHINE",
    subtitle: "You turned cold midnight into golden morning.",
    quoteHighlight: "You didn't erase who I was. You simply helped me discover a happier side of myself.",
    paragraphs: [
      "Before you, I thought my little world was enough.",
      "But then you came along and showed me how beautiful life could feel when you have someone special to share it with.",
      "You made ordinary conversations exciting. You made simple days memorable.",
      "You made me want to hear your voice every day, even when we had nothing important to talk about.",
      "I love your smile, Baby. I love the way you care for me. I love how you make me feel like your little baby sometimes.",
      "I love your silly moments, your laughter, and the way you can make me happy without even trying.",
      "Sometimes, when you're close to me, all I want is to hold you gently, keep you near, and make sure you know how much you mean to me.",
      "And when you're not around, I find myself looking forward to the next time I can see you.",
      "You brought warmth into places in my life that had been quiet for a long time.",
      "You didn't erase who I was. You simply helped me discover a happier side of myself. And Baby, that means more to me than I can explain.",
    ],
  },
  {
    id: 6,
    slug: "memories",
    landmark: "constellation",
    locationLabel: "The Memory Constellation",
    title: "OUR LITTLE MEMORIES",
    subtitle: "Little Moments, Big Feelings",
    quoteHighlight: "Every picture reminds me of another reason I'm grateful for you.",
    paragraphs: [
      "Every single moment we've shared, every laugh, every quiet pause, and every picture holds a piece of my heart.",
      "Take your time looking through these memories, Baby. Each star in our sky holds a glimpse of why you mean the entire universe to me.",
    ],
  },
  {
    id: 7,
    slug: "every-tomorrow",
    landmark: "moon",
    locationLabel: "The Moonlit Sky",
    title: "EVERY TOMORROW, WITH YOU",
    subtitle: "Two stars finding their permanent place beside one another.",
    quoteHighlight: "I don't want to promise you a perfect life. I want to promise you effort, honesty, patience, and love.",
    paragraphs: [
      "Baby, I don't know everything the future has planned for us.",
      "I know that life won't always be easy. There will be difficult days, misunderstandings, challenges, and moments when things don't go the way we hoped.",
      "But I want to keep choosing you through all of it.",
      "I want to be the person who celebrates your happiness, listens when you're upset, and reminds you that you don't have to face every difficult moment alone.",
      "I want us to grow together. I want us to chase the dreams we've talked about.",
      "I want to see you achieve everything you've wished for. And I want to be there, cheering for you, feeling proud of you, and holding your hand through every chapter.",
      "I don't want to promise you a perfect life. I want to promise you effort, honesty, patience, and love.",
      "I want to keep learning how to love you better.",
      "And I hope that, years from now, we can look back at these first two months and smile at how something so beautiful began.",
    ],
  },
];

// Final Love Letter when the glass heart vault is unlocked
export const finalLoveLetter = {
  title: "HAPPY TWO MONTHS, MY BABY",
  greeting: "My sweetest Saba,",
  paragraphs: [
    "Happy Two Months, my Baby.",
    "Sometimes I still find it unbelievable that someone could become so important to me in such a short time.",
    "You came into the life of a boy who was comfortable being alone, and you became someone he looks forward to seeing, hearing, and talking to every day.",
    "You made Shim feel understood. You made him feel supported. You made him feel that he mattered.",
    "And more than anything, you made him feel loved in ways he had never expected.",
    "Thank you for your beautiful smile.",
    "Thank you for the times you stood beside me.",
    "Thank you for every little act of care.",
    "Thank you for listening to me, believing in me, and making space for me in your life.",
    "Baby, I want to give you the same love, comfort, and happiness that you've given me. I want to be there for your dreams.",
    "I want to make you laugh when you're having a difficult day.",
    "I want to hold your hand through life's beautiful moments and its difficult ones.",
    "And I want us to keep building something meaningful together.",
    "These two months are only the beginning of what I hope will be a beautiful journey.",
    "I love you, my Chubby. Shim is yours, Saba.",
    "And I hope I get to be your Captain through every chapter still to come.",
  ],
  signoff: "Forever your Captain,\nYour Shim. ❤️",
};

export const finaleCelebration = {
  heading: "HAPPY TWO MONTHS, MY CHUBBY ❤️",
  subheading: "Two months of love. A thousand little reasons to smile.",
  coupleSign: "SHIM ♡ SABA",
  finalVow: "If I could choose my favourite part of these two months, it would always be you.",
  buttonLabel: "Explore Our Universe Again",
};
