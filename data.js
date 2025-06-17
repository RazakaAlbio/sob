// Database alat musik dengan multi-bahasa
const instrumentsData = {
    gamelan: {
        id: 'gamelan',
        name: {
            id: 'Gamelan',
            en: 'Gamelan',
            jp: 'ガムラン'
        },
        shortDescription: {
            id: 'Ensemble musik tradisional Jawa',
            en: 'Traditional Javanese music ensemble',
            jp: 'ジャワの伝統音楽アンサンブル'
        },
        description: {
            id: 'Gamelan adalah ansambel musik tradisional Jawa, Sunda, dan Bali di Indonesia yang terdiri dari instrumen perkusi seperti metalofon, xilofon, drum, dan gong. Gamelan memiliki peran penting dalam upacara keagamaan, pertunjukan wayang, dan acara-acara tradisional lainnya.',
            en: 'Gamelan is a traditional ensemble music of Java, Sunda, and Bali in Indonesia, made up predominantly of percussive instruments such as metallophones, xylophones, drums, and gongs. Gamelan plays an important role in religious ceremonies, wayang performances, and other traditional events.',
            jp: 'ガムランは、インドネシアのジャワ、スンダ、バリの伝統的なアンサンブル音楽で、主にメタロフォン、木琴、太鼓、ゴングなどの打楽器で構成されています。ガムランは宗教的儀式、ワヤン公演、その他の伝統的な行事で重要な役割を果たしています。'
        },
        mainImage: 'assets/gamelan-main.svg',
        additionalImages: [
            'assets/gamelan-main.svg',
            'assets/gamelan-main.svg',
            'assets/gamelan-main.svg'
        ],
        audio: 'assets/audio/gamelan.mp3'
    },
    angklung: {
        id: 'angklung',
        name: {
            id: 'Angklung',
            en: 'Angklung',
            jp: 'アンクルン'
        },
        shortDescription: {
            id: 'Alat musik bambu dari Sunda',
            en: 'Bamboo musical instrument from Sunda',
            jp: 'スンダの竹製楽器'
        },
        description: {
            id: 'Angklung adalah alat musik multitonal (bernada ganda) yang tradisional berkembang dalam masyarakat Sunda di Jawa Barat. Alat musik ini dibuat dari bambu, dibunyikan dengan cara digoyangkan sehingga menghasilkan bunyi yang bergetar dalam susunan nada 2, 3, sampai 4 nada dalam setiap ukuran.',
            en: 'Angklung is a multitonal (double-pitched) traditional musical instrument that developed in Sundanese society in West Java. This musical instrument is made of bamboo, played by shaking it to produce vibrating sounds in arrangements of 2, 3, to 4 tones in each size.',
            jp: 'アンクルンは、西ジャワのスンダ社会で発達した多音階（複音階）の伝統楽器です。この楽器は竹で作られ、振ることで演奏し、各サイズで2、3、4音の音階配列で振動音を生み出します。'
        },
        mainImage: 'assets/angklung-main.svg',
        additionalImages: [
            'assets/angklung-main.svg',
            'assets/angklung-main.svg',
            'assets/angklung-main.svg'
        ],
        audio: 'assets/audio/angklung.mp3'
    },
    sasando: {
        id: 'sasando',
        name: {
            id: 'Sasando',
            en: 'Sasando',
            jp: 'ササンド'
        },
        shortDescription: {
            id: 'Alat musik petik dari Nusa Tenggara Timur',
            en: 'Plucked string instrument from East Nusa Tenggara',
            jp: '東ヌサトゥンガラの弦楽器'
        },
        description: {
            id: 'Sasando adalah alat musik petik tradisional yang berasal dari Pulau Rote, Nusa Tenggara Timur. Sasando terbuat dari bambu yang dibelah dan dibentuk seperti tabung, kemudian diberi dawai dari logam. Suara yang dihasilkan sangat merdu dan khas, sering digunakan dalam musik tradisional dan modern.',
            en: 'Sasando is a traditional plucked string instrument originating from Rote Island, East Nusa Tenggara. Sasando is made from split bamboo shaped like a tube, then fitted with metal strings. The sound produced is very melodious and distinctive, often used in traditional and modern music.',
            jp: 'ササンドは、東ヌサトゥンガラのロテ島発祥の伝統的な弦楽器です。ササンドは竹を割って筒状に成形し、金属の弦を張って作られます。非常に美しく独特な音を奏で、伝統音楽と現代音楽の両方でよく使用されます。'
        },
        mainImage: 'assets/sasando-main.svg',
        additionalImages: [
            'assets/sasando-main.svg',
            'assets/sasando-main.svg',
            'assets/sasando-main.svg'
        ],
        audio: 'assets/audio/sasando.mp3'
    },
    kendang: {
        id: 'kendang',
        name: {
            id: 'Kendang',
            en: 'Kendang',
            jp: 'クンダン'
        },
        shortDescription: {
            id: 'Alat musik perkusi tradisional Indonesia',
            en: 'Traditional Indonesian percussion instrument',
            jp: 'インドネシアの伝統打楽器'
        },
        description: {
            id: 'Kendang adalah alat musik perkusi yang dimainkan dengan tangan. Kendang biasanya dimainkan sebagai pengatur irama dalam gamelan Jawa dan Sunda. Alat musik ini terbuat dari kayu dengan membran dari kulit kambing atau sapi yang direntangkan di kedua sisinya.',
            en: 'Kendang is a percussion instrument played with hands. Kendang is usually played as a rhythm controller in Javanese and Sundanese gamelan. This musical instrument is made of wood with membranes of goat or cow skin stretched on both sides.',
            jp: 'クンダンは手で演奏する打楽器です。クンダンは通常、ジャワとスンダのガムランでリズムコントローラーとして演奏されます。この楽器は木製で、両側にヤギや牛の皮の膜が張られています。'
        },
        mainImage: 'assets/kendang-main.svg',
        additionalImages: [
            'assets/kendang-main.svg',
            'assets/kendang-main.svg',
            'assets/kendang-main.svg'
        ],
        audio: 'assets/audio/kendang.mp3'
    },
    suling: {
        id: 'suling',
        name: {
            id: 'Suling',
            en: 'Suling',
            jp: 'スリン'
        },
        shortDescription: {
            id: 'Alat musik tiup tradisional dari bambu',
            en: 'Traditional bamboo wind instrument',
            jp: '竹製の伝統管楽器'
        },
        description: {
            id: 'Suling adalah alat musik tiup tradisional Indonesia yang terbuat dari bambu. Suling dimainkan dengan cara ditiup dan memiliki lubang-lubang yang dapat ditutup dengan jari untuk menghasilkan nada yang berbeda. Suling sering digunakan dalam musik gamelan dan musik rakyat.',
            en: 'Suling is a traditional Indonesian wind instrument made from bamboo. Suling is played by blowing and has holes that can be covered with fingers to produce different tones. Suling is often used in gamelan music and folk music.',
            jp: 'スリンは竹で作られたインドネシアの伝統的な管楽器です。スリンは息を吹き込んで演奏し、指で塞ぐことができる穴があり、異なる音程を生み出します。スリンはガムラン音楽や民族音楽でよく使用されます。'
        },
        mainImage: 'assets/suling-main.svg',
        additionalImages: [
            'assets/suling-main.svg',
            'assets/suling-main.svg',
            'assets/suling-main.svg'
        ],
        audio: 'assets/audio/suling.mp3'
    }
};

// Teks UI dengan multi-bahasa
const uiText = {
    id: {
        mainTitle: "SOUND OF BOROBUDUR",
        mainSubtitle: "Jelajahi Warisan Musik Nusantara",
        title: "Sound of Borobudur",
        subtitle: "Jelajahi Warisan Musik Nusantara",
        play: "Putar Suara",
        startAdventure: "Mulai Petualangan",
        browseOthers: "Jelajahi Lainnya",
        back: "Kembali"
    },
    en: {
        mainTitle: "SOUND OF BOROBUDUR",
        mainSubtitle: "Explore Indonesian Musical Heritage",
        title: "Sound of Borobudur",
        subtitle: "Explore Indonesian Musical Heritage",
        play: "Play Sound",
        startAdventure: "Start Adventure",
        browseOthers: "Browse Others",
        back: "Back"
    },
    ja: {
        mainTitle: "SOUND OF BOROBUDUR",
        mainSubtitle: "インドネシアの音楽遺産を探索",
        title: "Sound of Borobudur",
        subtitle: "インドネシアの音楽遺産を探索",
        play: "音を再生",
        startAdventure: "冒険を始める",
        browseOthers: "他を閲覧",
        back: "戻る"
    }
};

// Mapping spotlight ke instrument
const spotlightMapping = {
    'spot-1': 'gamelan',
    'spot-2': 'angklung',
    'spot-3': 'sasando',
    'spot-4': 'kendang',
    'spot-5': 'suling'
};

// Alias untuk kompatibilitas dengan script.js
const spotlightInstruments = instrumentsData;