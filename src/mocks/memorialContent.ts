import familyLegacyArtwork from "../assets/ugo/family-legacy.svg";
import faithAndServiceArtwork from "../assets/ugo/faith-and-service.svg";
import galleryLoveArtwork from "../assets/ugo/gallery-love.svg";
import galleryMotherArtwork from "../assets/ugo/gallery-mother.svg";
import galleryProfessionArtwork from "../assets/ugo/gallery-profession.svg";
import mentorshipArtwork from "../assets/ugo/mentorship.svg";
import portraitArtwork from "../assets/ugo/portrait.svg";
import { MemorialContent } from "../types/memorial";

export const memorialContent: MemorialContent = {
  site: {
    title: "Dcns Ugo Geri Robert Memorial",
    shortTitle: "DUGR Memorial",
    tagline: "Celebrating a life of faith, excellence, mentorship, and love.",
    nextRemembranceDate: "2026-11-28T00:00:00",
    navigation: [
      { label: "Home", href: "/" },
      { label: "Life", href: "/story" },
      { label: "Legacy", href: "/legacy" },
      { label: "Gallery", href: "/gallery" },
      { label: "Tributes", href: "/tributes" },
    ],
    quickStats: [
      { value: "50", label: "Public memorial messages recovered" },
      { value: "04", label: "Roles repeated across the tribute wall" },
      { value: "03", label: "Circles of impact preserved here" },
    ],
    announcementItems: [
      "Mother to many",
      "Teacher and mentor",
      "A life of faith",
      "Legacy of excellence",
      "Loved beyond words",
    ],
  },
  person: {
    name: "Deaconess Ugo Geri Robert",
    years: "Called to glory on November 28, 2022",
    roles: ["Mother", "Teacher", "Mentor", "Woman of faith"],
    heroTitle: "Her life of faith, excellence, and love still speaks.",
    heroBody:
      "This memorial experience was populated from the public ForeverMissed tribute wall, preserving the words used most often about her: mother, teacher, mentor, encourager, and a woman whose love for God and people left a lasting mark.",
    portrait: {
      url: portraitArtwork,
      alt: "Memorial portrait card for Deaconess Ugo Geri Robert",
      caption: "A locally stored memorial artwork created from the themes recovered on the tribute wall.",
    },
    familyMessage:
      "Across family, church, and professional circles, she is remembered for warmth, courage, discipline, generosity, and a rare ability to guide people firmly while loving them deeply.",
  },
  timeline: [
    {
      id: "faith",
      label: "Faith",
      title: "She was remembered as a woman who lived openly for the Lord.",
      body: "Many of the recovered messages describe her as joyful in service, fearless in conviction, and committed to helping others grow in faith.",
      featured: true,
    },
    {
      id: "family",
      label: "Family",
      title: "Family tributes speak of a strong matriarch and steady source of care.",
      body: "The memorial wall repeatedly returns to her generosity, her sacrifices for loved ones, and the way she made people feel protected, corrected, and deeply seen.",
    },
    {
      id: "mentorship",
      label: "Mentorship",
      title: "Colleagues and mentees describe a leader who opened doors for others.",
      body: "Recovered messages from the memorial page speak of encouragement, standards of excellence, practical wisdom, and careers shaped by her guidance.",
    },
    {
      id: "legacy",
      label: "Legacy",
      title: "Her impact is remembered across church, home, and professional life.",
      body: "Even brief tributes call her unforgettable, love personified, and a rare gem whose influence continues long after her passing.",
    },
  ],
  legacyProjects: [
    {
      id: "1",
      slug: "faith-and-service",
      year: "2022 - present",
      category: "Faith",
      title: "A life of faith and service",
      summary: "The memorial wall remembers a woman who loved God openly and served people with conviction, joy, and spiritual courage.",
      highlights: ["Lived for the Lord", "Prayer and service", "Church family memories"],
      assetCount: "1 local memorial card",
      cover: {
        url: faithAndServiceArtwork,
        alt: "Faith and service memorial artwork",
        caption: "A locally stored memorial card built from the tribute wall.",
      },
      story:
        "Again and again, the public tributes describe a woman whose faith was visible, practical, and generous. Visitors remembered her encouragement, her example, and the way she kept pointing people back to God while caring for them personally.",
    },
    {
      id: "2",
      slug: "mentorship-and-excellence",
      year: "2022 - present",
      category: "Profession",
      title: "Mentorship and professional excellence",
      summary: "Friends and colleagues remembered her as a leader, teacher, and market-research professional who set high standards while lifting others up.",
      highlights: ["Market research leader", "Careers shaped", "Words of wisdom"],
      assetCount: "1 local memorial card",
      cover: {
        url: mentorshipArtwork,
        alt: "Mentorship and excellence memorial artwork",
        caption: "A locally stored memorial card built from colleague tributes.",
      },
      story:
        "Several recovered messages mention doors she opened, confidence she built in younger professionals, and the rare balance of firmness and kindness she brought into leadership. Her influence is described not only in outcomes, but in the people she helped become more capable and more confident.",
    },
    {
      id: "3",
      slug: "family-love-and-generosity",
      year: "2022 - present",
      category: "Family",
      title: "Family love and generosity",
      summary: "Family and close friends remembered her as a mother to many whose care, sacrifice, and affection still shape everyday life.",
      highlights: ["Mother to many", "Deeply missed", "Love lives on"],
      assetCount: "1 local memorial card",
      cover: {
        url: familyLegacyArtwork,
        alt: "Family love and generosity memorial artwork",
        caption: "A locally stored memorial card built from family tributes.",
      },
      story:
        "The tribute wall carries the language of deep personal loss alongside gratitude for her sacrifices, counsel, and love. Even short notes return to the same truth: her care was felt widely, and the people she loved still live inside that legacy.",
    },
  ],
  galleryCollections: [
    {
      id: "roles-and-remembrance",
      title: "Roles and remembrance",
      count: 2,
      description: "Local memorial cards summarising the words repeated most often on the public tribute wall.",
      items: [
        {
          url: galleryMotherArtwork,
          alt: "Mother, teacher, mentor, woman of faith memorial card",
          caption: "The roles most frequently used to describe her.",
        },
        {
          url: galleryLoveArtwork,
          alt: "Loved beyond words memorial card",
          caption: "A closing line echoed by multiple memorial guests.",
        },
      ],
    },
    {
      id: "faith-and-family",
      title: "Faith and family",
      count: 2,
      description: "Locally stored artwork drawn from family and church messages recovered from the memorial page.",
      items: [
        {
          url: faithAndServiceArtwork,
          alt: "Faith and service memorial card",
          caption: "A life lived for the Lord and remembered in service.",
        },
        {
          url: familyLegacyArtwork,
          alt: "Family love and generosity memorial card",
          caption: "A tribute to the love and generosity described by family.",
        },
      ],
    },
    {
      id: "professional-legacy",
      title: "Professional legacy",
      count: 2,
      description: "A locally saved visual record of how colleagues described her leadership, excellence, and mentorship.",
      items: [
        {
          url: mentorshipArtwork,
          alt: "Mentorship and excellence memorial card",
          caption: "Colleagues remembered wisdom, kindness, and inspiration.",
        },
        {
          url: galleryProfessionArtwork,
          alt: "Professional legacy memorial card",
          caption: "A tribute to her impact in qualitative research and leadership.",
        },
      ],
    },
  ],
  tributes: [
    {
      id: "tribute-1",
      author: "Kunmi Olu",
      date: "Nov 30, 2024",
      message:
        "Dear Madam, it was a great privilege meeting you and knowing you. I appreciate the support, motivation and push from you that has gotten me this far. Your kindness, charisma, resilience, and your faith in Lord is a great inspiration. You will forever be missed. May your soul rest in the Blossom of the Lord, Amen.",
    },
    {
      id: "tribute-2",
      author: "Dolapo Akinola-Omojola",
      date: "Nov 26, 2024",
      message:
        "Amazing woman. She exemplified excellence and was ever ready to help others. Sad to have lost such an irreplaceable soul in MR but glad to know heaven gained an angel. Rest on Ugo Geri-Roberts in the bossom of the Master whom you so lovingly and whole heartedly served. Your memories have definitely been imprinted in the sands of time.",
    },
    {
      id: "tribute-3",
      author: "Dorcas Omowole",
      date: "Nov 25, 2024",
      message:
        "Madam, I am grateful to God for your life, your supportiveness, openness, and legacy of excellence. You are loved and sorely missed.",
    },
    {
      id: "tribute-4",
      author: "Dorcas Imoleayo",
      date: "Nov 25, 2024",
      message:
        "Dear madam Ugo, it is over a year and it is like just yesterday you left. Your legacy will never be forgotten. You are a mother, a teacher, a mentor and you do not leave a stone unturned. I will never forget your word of encouragement, advice, and your preaching. Continue to rest in the blossom of God almighty. We miss you.",
    },
    {
      id: "tribute-5",
      author: "Omolara Oyebola",
      date: "Nov 25, 2024",
      message:
        "\"My Madam at the top\", Iya in Yoruba as I always call you, hummmmm you were a teacher, a mentor, a kind hearted woman, who wants well for all. God loves you more, keep resting in his bossom.",
    },
    {
      id: "tribute-6",
      author: "Chinyere Ugwulali",
      date: "Nov 25, 2024",
      message:
        "Dear Madam, it still feels surreal that you are no more with us on earth. I know you are singing with the angels in heaven. I can just imagine all the energy you brought to them. Literally, a happy space back to back. I miss having you around, I miss your words of advice, I miss your banters on life and the economy, I miss your aura and grace, I miss how you show up and show out for the things of God, I miss your brilliant mind, I miss so many things about you and it hurts so bad sometimes and some days. Continue to rest with the Lord until we reunite again in heaven to part no more.",
    },
    {
      id: "tribute-7",
      author: "Adedeji Adu",
      date: "Nov 25, 2024",
      message:
        "\"Dcns Boss\" as myself and Bosun call you ma. You gave me an opportunity to start my career in Market Research when I was an I.T student with MB. You saw potential in me even when I was scared. Tough but passionate, resolute but endearing. You showed me back then as a leader of a very big organization that there is no need for toxicity in life, but to do what you have to do and the family at MB has your back. This I uphold to this day professionally. Thank you Deaconess Ugo Geri-Roberts, aka Dcns Boss. Keep resting in the bossom of our Lord Jesus Christ.",
    },
    {
      id: "tribute-8",
      author: "Junaid Adesola",
      date: "Nov 25, 2024",
      message:
        "Madam as we called you, you can never be forgotten in my home, the legacy you laid down can never be erased, you will forever be in our heart. Continue to rest in the blossom of our Lord Jesus, miss you madam.",
    },
  ],
};
