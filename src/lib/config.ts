// ============================================
// Birthday Website Configuration
// Edit this file to personalize the website
// ============================================

export const birthdayConfig = {
  // Person's name - change this to the birthday person's name
  name: "Najwa Mizu Abhita",

  // Birthday date in ISO format (YYYY-MM-DD)
  // Countdown targets midnight in Asia/Jakarta timezone
  birthdayDate: "2026-11-16",

  // Timezone for countdown calculation
  timezone: "Asia/Jakarta",

  // Hero section
  hero: {
    label: "A LITTLE SOMETHING FOR YOU",
    subheadline:
      "Another year, another chapter, and so many beautiful things ahead.",
    dateDisplay: "16 November 2026",
  },

  // Birthday message
  message: {
    title: "A Message Just for You",
    content: `Happy birthday! Semoga di umur yang baru ini kamu selalu diberi kesehatan, kebahagiaan, dan banyak alasan buat tersenyum. Semoga hal-hal baik yang selama ini kamu harapkan bisa pelan-pelan jadi kenyataan.

Jangan terlalu keras sama diri sendiri, ya. Kamu juga pantas menikmati setiap proses yang sedang kamu jalani. Have the best birthday ever!`,
    extendedContent: `Terima kasih sudah jadi orang yang selalu bikin suasana lebih hangat. Keberadaanmu itu berarti lebih dari yang kamu kira. Semoga tahun ini membawa banyak hal seru, pencapaian baru, dan momen-momen yang bikin kamu merasa bahagia tanpa alasan tertentu.

Kalau ada yang bisa aku doakan, aku doakan yang terbaik buat kamu. Selamat ulang tahun sekali lagi — enjoy your day! 🎂`,
  },

  // Memory gallery photos
  // Replace src with actual photo paths in /public/memories/
  memories: {
    title: "Little Moments, Big Memories",
    photos: [
      {
        id: 1,
        src: "/memories/photo-1.jpg",
        caption: "Tambahkan caption kenangan pertama di sini",
        aspect: "portrait" as const,
      },
      {
        id: 2,
        src: "/memories/photo-2.jpg",
        caption: "Tambahkan caption kenangan kedua di sini",
        aspect: "landscape" as const,
      },
      {
        id: 3,
        src: "/memories/photo-3.jpg",
        caption: "Tambahkan caption kenangan ketiga di sini",
        aspect: "square" as const,
      },
      {
        id: 4,
        src: "/memories/photo-4.jpg",
        caption: "Tambahkan caption kenangan keempat di sini",
        aspect: "landscape" as const,
      },
      {
        id: 5,
        src: "/memories/photo-5.jpg",
        caption: "Tambahkan caption kenangan kelima di sini",
        aspect: "portrait" as const,
      },
    ],
  },

  // Surprise section
  surprise: {
    title: "A Little Surprise",
    buttonText: "Open Your Surprise",
    message: `Kamu tahu nggak? Di antara semua orang yang pernah aku kenal, kamu salah satu yang paling bikin aku bersyukur. Terima kasih sudah jadi bagian dari ceritaku. Here's to another amazing year of you being you. ✨`,
  },

  // Music player
  music: {
    src: "/music/birthday-song.mp3",
    title: "Birthday Song",
    artist: "For You",
    // Set to true once you've added an actual audio file
    hasAudio: false,
  },

  // Navigation items
  nav: [
    { label: "Home", href: "#home" },
    { label: "Countdown", href: "#countdown" },
    { label: "Memories", href: "#memories" },
    { label: "Wishes", href: "#wishes" },
  ],
} as const;

// Color palette - referenced in CSS and components
export const colors = {
  bgPrimary: "#131118",
  bgSecondary: "#1C1923",
  pink: "#FF6B9E",
  lavender: "#A78BFA",
  textPrimary: "#F8FAFC",
  textSecondary: "#B8B2C2",
  border: "rgba(255, 107, 158, 0.22)",
} as const;

