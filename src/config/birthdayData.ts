export interface MemoryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  caption: string;
  imageSrc?: string;
  aspectRatio: "portrait" | "landscape" | "square";
  note?: string;
}

export interface WishItem {
  id: string;
  sender: string;
  relationship: string;
  message: string;
  date: string;
  avatarColor?: string;
}

export const BIRTHDAY_CONFIG = {
  // Personal Details
  recipientName: "Najwa Mizu Abhita",
  nickname: "Najwa",
  birthDateDisplay: "16 November 2026",
  // Target timestamp: 16 November 2026 00:00:00 WIB (UTC+7)
  targetIsoDate: "2026-11-16T00:00:00+07:00",
  
  // Hero Section
  hero: {
    badge: "A LITTLE SOMETHING FOR YOU",
    headlinePrefix: "Happy Birthday,",
    headlineName: "Najwa Mizu Abhita!",
    subheadline: "Another year, another chapter, and so many beautiful things ahead.",
    dateTag: "16 November 2026",
    primaryButtonText: "Open Your Surprise",
    secondaryButtonText: "Read My Wishes",
  },

  // Countdown Section
  countdown: {
    badge: "COUNTDOWN TO CELEBRATION",
    title: "Counting Down to Your Special Day",
    subtitle: "Setiap detik yang berdetik membawa kita semakin dekat ke lembaran barumu.",
    celebrationTitle: "IT'S YOUR SPECIAL DAY!",
    celebrationSubtitle: "Selamat ulang tahun! Hari ini adalah harimu — semoga setiap detik dipenuhi tawa dan kebahagiaan yang tulus.",
    postCelebrationTitle: "CELEBRATING ANOTHER WONDERFUL YEAR!",
    postCelebrationSubtitle: "Hari ulang tahunmu telah tiba. Semoga 365 hari ke depan dipenuhi berkah dan petualangan yang indah.",
  },

  // Message Card Section
  messageCard: {
    badge: "HEARTFELT GREETING",
    title: "A Message Just for You",
    subtitle: "Untaian doa dan apresiasi hangat yang ditulis dengan tulus.",
    mainParagraph:
      "Happy birthday! Semoga di umur yang baru ini kamu selalu diberi kesehatan, kebahagiaan, dan banyak alasan buat tersenyum. Semoga hal-hal baik yang selama ini kamu harapkan bisa pelan-pelan jadi kenyataan. Jangan terlalu keras sama diri sendiri, ya. Kamu juga pantas menikmati setiap proses yang sedang kamu jalani. Have the best birthday ever!",
    extendedParagraphs: [
      "Di tengah kesibukan dan banyaknya hal yang kamu hadapi setiap hari, terima kasih sudah selalu bertahan, berproses, dan tetap menjadi pribadi yang berharga bagi orang-orang di sekitarmu.",
      "Jangan pernah ragu sama potensi dan kebaikan hatimu sendiri. Kadang langkah kecil yang kamu ambil dengan gigih hari ini adalah fondasi dari hal-hal luar biasa di masa depan.",
      "Luangkan waktu untuk istirahat sejenak, hargai seberapa jauh kamu sudah melangkah, dan semoga semesta selalu memelukmu dengan hal-hal yang menenangkan."
    ],
    signOff: "With warmest wishes & warmest prayers,",
    senderName: "Your Good Friend",
  },

  // Memory Gallery Section
  memories: [
    {
      id: "mem-1",
      title: "Golden Hour Conversations",
      category: "Quiet Moments",
      date: "Spring Memories",
      caption: "Obrolan santai di sore hari yang selalu bikin pikiran tenang dan penuh tawa.",
      aspectRatio: "portrait",
      note: "Salah satu obrolan paling berkesan tentang mimpi dan rencana masa depan.",
    },
    {
      id: "mem-2",
      title: "The Unplanned Coffee Run",
      category: "Daily Adventures",
      date: "Weekend Escape",
      caption: "Ketika rencana mendadak justru jadi momen paling seru dan memorable.",
      aspectRatio: "landscape",
      note: "Secangkir kopi hangat dan obrolan panjang tanpa rasa terburu-buru.",
    },
    {
      id: "mem-3",
      title: "Shared Milestones",
      category: "Achievements",
      date: "Growth Journey",
      caption: "Melihatmu berjuang dan berhasil mencapai target yang kamu impikan.",
      aspectRatio: "square",
      note: "Bukti nyata kalau kerja keras dan ketulusanmu tidak pernah sia-sia.",
    },
    {
      id: "mem-4",
      title: "Spontaneous Laughter",
      category: "Joyful Days",
      date: "Random Tuesday",
      caption: "Candaan sederhana yang berhasil mencairkan hari yang melelahkan.",
      aspectRatio: "landscape",
      note: "Karena senyuman tulus itu selalu menular ke orang-orang di sekitarmu.",
    },
    {
      id: "mem-5",
      title: "Looking Toward Tomorrow",
      category: "Next Chapter",
      date: "New Horizons",
      caption: "Langkah baru menantimu, dan setiap mimpi layak untuk terus diperjuangkan.",
      aspectRatio: "portrait",
      note: "Terus melangkah dengan percaya diri dan tetap jadi dirimu yang autentik.",
    },
  ] as MemoryItem[],

  // Surprise Section
  surprise: {
    badge: "CONFIDENTIAL & SPECIAL",
    title: "Open Your Surprise",
    subtitle: "Sebuah amplop digital khusus yang disegel rapi untuk Najwa.",
    buttonLabel: "Open Envelope",
    buttonCloseLabel: "Close & Keep Safe",
    sealText: "OPEN",
    letterHead: "Dear Najwa,",
    letterBody:
      "Selamat bertambah usia! Di lembaran barumu ini, aku berharap kamu tidak pernah lupa betapa istimewanya kehadiranmu. Teruslah tumbuh tanpa kehilangan kehangatan hatimu. Terima kasih sudah menjadi teman yang suportif, pendengar yang baik, dan orang yang selalu bisa diandalkan.",
    couponTitle: "Exclusive Birthday Ticket ✦",
    couponDetail: "Voucher Bebas Repot: 1x Sesi Traktir Kopi/Makan + Ngobrol Santai kapan pun kamu mau!",
    couponCode: "NAJWA-BDAY-2026",
    sparkleBlessing: "May every path you take be paved with grace and light.",
  },

  // Wishes Wall / Interactive Section
  wishesWall: {
    badge: "COMMUNITY OF WELL-WISHERS",
    title: "Warm Wishes & Good Prayers",
    subtitle: "Kumpulan doa terbaik dari orang-orang yang peduli dan menyayangimu.",
    defaultWishes: [
      {
        id: "wish-1",
        sender: "Sahabat Dekat",
        relationship: "Close Friend",
        message: "Barakallah fii umrik Najwa! Semoga selalu dimudahkan urusannya, makin sukses karir dan pendidikannya, serta bahagia terus!",
        date: "16 Nov 2026",
        avatarColor: "#FF6B9E",
      },
      {
        id: "wish-2",
        sender: "Teman Seperjuangan",
        relationship: "Study & Work Buddy",
        message: "Happy birthday Najwa Mizu Abhita! Tetap semangat meraih mimpi-mimpimu, sehat selalu dan diberkahi rezekinya.",
        date: "16 Nov 2026",
        avatarColor: "#A78BFA",
      },
      {
        id: "wish-3",
        sender: "Circle Hangout",
        relationship: "Hangout Friends",
        message: "Selamat ulang tahun Najwa! Jangan lupa istirahat yang cukup dan nikmati hari spesialmu semaksimal mungkin!",
        date: "16 Nov 2026",
        avatarColor: "#F472B6",
      },
    ] as WishItem[],
  },

  // Audio / Music Player
  music: {
    title: "Gentle Rose Reverie",
    artist: "Acoustic Ambient Harmony",
    defaultVolume: 0.5,
    customAudioSrc: "", // Can be a local or URL audio file; fallback synthesizer provided
  },

  // Featured Portrait Photo (between Hero and Countdown)
  featuredPhoto: {
    tag: "PORTRAIT OF THE DAY",
    title: "Najwa's Portrait",
    imageSrc: "/images/najwa.jpg", // Taruh foto teman Anda di public/images/najwa.jpg
    altText: "Foto Najwa Mizu Abhita",
    captionTitle: "Najwa Mizu Abhita",
    captionSubtitle: "Radiant, inspiring, and embarking on another beautiful chapter.",
    placeholderNote: "Letakkan file foto Anda di public/images/najwa.jpg",
  },

  // Navigation Links
  navLinks: [
    { label: "Home", href: "#hero" },
    { label: "Countdown", href: "#countdown" },
    { label: "Message", href: "#message" },
    { label: "Surprise", href: "#surprise" },
    { label: "Wishes", href: "#wishes" },
  ],
};
