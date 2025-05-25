import {
    benefitIcon1,
    benefitIcon2,
    benefitIcon3,
    benefitIcon4,
    benefitImage2,
    betterhelp,
    chromecast,
    calm,
    disc02,
    discord,
    discordBlack,
    facebook,
    figma,
    file02,
    framer,
    homeSmile,
    instagram,
    notification2,
    notification3,
    notification4,
    notion,
    photoshop,
    plusSquare,
    protopie,
    raindrop,
    recording01,
    recording03,
    roadmap1,
    roadmap2,
    roadmap3,
    roadmap4,
    searchMd,
    slack,
    spotifymeditation,
    sliders04,
    telegram,
    twitter,
    yourlogo,
    Head,
    Minddoc,
    jour,
    mylife,
    wysa,
  } from "../assets";
  
  export const navigation = [
    {
      id: "0",
      title: "Home",
      url: "#home",
    },
    {
      id: "1",
      title: "my group",
      url: "#groupchat",
    },
    {
      id: "2",
      title: "HealBot",
      url: "/healbot",
    },
    {
      id: "3",
      title: "Dashboard",
      url: "#dashboard",
    },
    {
      id: "4",
      title: "leaderboard",
      url: "#leaderboard",
    },
    {
      id: "5",
      title: "games and tasks",
      url: "#play",
    },
    {
      id: "6",
      title: "Sign Up",
      url: "#signup",
      onlyMobile: true,
    },
    {
      id: "7",
      title: "Login",
      url: "#login",
      onlyMobile: true,
    },
  ];
  
  export const heroIcons = [homeSmile, file02, searchMd, plusSquare];
  
  export const notificationImages = [notification4, notification3, notification2];
  
  export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];
  
  export const brainwaveServices = [
    "Photo generating",
    "Photo enhance",
    "Seamless Integration",
  ];
  
  export const brainwaveServicesIcons = [
    recording03,
    recording01,
    disc02,
    chromecast,
    sliders04,
  ];
  
  export const roadmap = [
    {
      id: "0",
      title: "Voice recognition",
      text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
      date: "May 2023",
      status: "done",
      imageUrl: roadmap1,
      colorful: true,
    },
    {
      id: "1",
      title: "Gamification",
      text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
      date: "May 2023",
      status: "progress",
      imageUrl: roadmap2,
    },
    {
      id: "2",
      title: "Chatbot customization",
      text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
      date: "May 2023",
      status: "done",
      imageUrl: roadmap3,
    },
    {
      id: "3",
      title: "Integration with APIs",
      text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
      date: "May 2023",
      status: "progress",
      imageUrl: roadmap4,
    },
  ];
  
  export const collabText =
  "With AI-driven stress analysis and real-time insights, BrainCare helps you track your mental well-being and improve daily.";

export const collabContent = [
  {
    id: "0",
    title: "Real-Time Stress Analysis",
    text: "AI tracks your stress levels based on responses and daily activities, providing personalized insights.",
  },
  {
    id: "1",
    title: "Anonymous Support Groups",
    text: "Join supportive community chats where you can share experiences and find encouragement anonymously.",
  },
  {
    id: "2",
    title: "AI-Powered Mental Wellness",
    text: "Receive guided meditation, cognitive exercises, and AI-driven tips for a healthier mindset.",
  },
];
  
  export const collabApps = [
    {
      id: "0",
      title: "Head",
      icon: Head,
      width: 26,
      height: 36,
    },
    {
      id: "1",
      title: "calm",
      icon: calm,
      width: 34,
      height: 36,
    },
    {
      id: "2",
      title: "BetterHelp",
      icon: betterhelp,
      width: 36,
      height: 28,
    },
    {
      id: "3",
      title: "spotifymeditation",
      icon: spotifymeditation,
      width: 34,
      height: 35,
    },
    {
      id: "4",
      title: "Minddoc",
      icon: Minddoc,
      width: 34,
      height: 34,
    },
    {
      id: "5",
      title: "jour",
      icon: jour,
      width: 34,
      height: 34,
    },
    {
      id: "6",
      title: "mylife",
      icon: mylife,
      width: 26,
      height: 34,
    },
    {
      id: "7",
      title: "wysa",
      icon: wysa,
      width: 38,
      height: 32,
    },
  ];
  
  export const pricing = [
    {
      id: "0",
      title: "Basic",
      description: "AI chatbot, personalized recommendations",
      price: "0",
      features: [
        "An AI chatbot that can understand your queries",
        "Personalized recommendations based on your preferences",
        "Ability to explore the app and its features without any cost",
      ],
    },
    {
      id: "1",
      title: "Premium",
      description: "Advanced AI chatbot, priority support, analytics dashboard",
      price: "9.99",
      features: [
        "An advanced AI chatbot that can understand complex queries",
        "An analytics dashboard to track your conversations",
        "Priority support to solve issues quickly",
      ],
    },
    {
      id: "2",
      title: "Enterprise",
      description: "Custom AI chatbot, advanced analytics, dedicated account",
      price: null,
      features: [
        "An AI chatbot that can understand your queries",
        "Personalized recommendations based on your preferences",
        "Ability to explore the app and its features without any cost",
      ],
    },
  ];
  
  export const benefits = [
    {
      id: "0",
      title: "Personalized AI Chat",
      text: "Engage in real-time conversations with AI to assess and improve your mental well-being.",
      backgroundUrl: "./src/assets/benefits/card-1.svg",
      iconUrl: benefitIcon1,
      imageUrl: benefitImage2,
    },
    {
      id: "1",
      title: "Stress Level Analysis",
      text: "AI evaluates your responses to real-life scenarios and updates your stress level bar dynamically.",
      backgroundUrl: "./src/assets/benefits/card-2.svg",
      iconUrl: benefitIcon2,
      imageUrl: benefitImage2,
      light: true,
    },
    {
      id: "2",
      title: "Anonymous Group Chat",
      text: "Connect with like-minded individuals and share your thoughts in a safe and anonymous space.",
      backgroundUrl: "./src/assets/benefits/card-3.svg",
      iconUrl: benefitIcon3,
      imageUrl: benefitImage2,
    },
    {
      id: "3",
      title: "AI Trainer Guidance",
      text: "Get personalized recommendations and guidance from an AI-powered virtual trainer for self-improvement.",
      backgroundUrl: "./src/assets/benefits/card-4.svg",
      iconUrl: benefitIcon4,
      imageUrl: benefitImage2,
      light: true
    },
    {
      id: "4",
      title: "Dashboard Insights",
      text: "Track your mental health progress with detailed analytics and stress level updates in an interactive dashboard.",
      backgroundUrl: "./src/assets/benefits/card-5.svg",
      iconUrl: benefitIcon1,
      imageUrl: benefitImage2,
    },
    {
      id: "5",
      title: "Leaderboards & Rewards",
      text: "Stay motivated with progress leaderboards and earn badges for maintaining a healthy mind.",
      backgroundUrl: "./src/assets/benefits/card-6.svg",
      iconUrl: benefitIcon2,
      imageUrl: benefitImage2,
    }
  ];
  
  export const socials = [
    {
      id: "0",
      title: "Discord",
      iconUrl: discordBlack,
      url: "#",
    },
    {
      id: "1",
      title: "Twitter",
      iconUrl: twitter,
      url: "#",
    },
    {
      id: "2",
      title: "Instagram",
      iconUrl: instagram,
      url: "#",
    },
    {
      id: "3",
      title: "Telegram",
      iconUrl: telegram,
      url: "#",
    },
    {
      id: "4",
      title: "Facebook",
      iconUrl: facebook,
      url: "#",
    },
  ];

export const gamesAndTasks = [
    {
      id: "0",
      name: "Sudoku",
      description: "A classic puzzle game to boost cognitive function.",
 stressLevel: "Low",
 path: "/games/sudoku"
    },
    {
      id: "1",
      name: "Word Scramble / Anagram Challenge",
      description: "Unscramble letters to find hidden words.",
 stressLevel: "Low",
 path: "/games/wordscramble"
    },
    {
      id: "2",
      name: "Memory Match Game",
      description: "Test your memory by matching pairs of cards.",
 stressLevel: "Low",
 path: "/games/memorymatch"
    },
    {
      id: "3",
      name: "4-7-8 Breathing Guide",
      description: "Follow a guided breathing exercise to calm your nervous system.",
 stressLevel: "Medium",
 path: "/games/breathingguide"
    },
    {
      id: "4",
      name: "Digital Doodle Pad",
      description: "Express yourself creatively with a freeform drawing tool.",
 stressLevel: "Medium",
 path: "/games/doodlepad"
    },
    {
      id: "5",
      name: "Guided Journaling Prompt",
      description: "Respond to AI-generated prompts for reflective writing.",
 stressLevel: "Medium",
 path: "/games/journaling"
    },
    {
      id: "6",
      name: "Serenity Clicker",
      description: "Click to hear soothing sounds and receive calming quotes.",
 stressLevel: "High",
 path: "/games/serenityclicker"
    },
    {
      id: "7",
      name: "Mood Walk Simulation",
      description: "Virtually experience a guided nature walk with calming visuals and audio.",
 stressLevel: "High",
 path: "/games/moodwalk"
    },
    {
      id: "8",
      name: "Emoji Emotion Board",
      description: "Select emojis to represent your current feelings and get insights.",
 stressLevel: "High",
 path: "/games/emojiboard"
    }
];