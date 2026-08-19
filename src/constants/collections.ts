export type CollectionData = {
  name: string;
  network: string;
  standard?: string;
  generationContractBytecode?: string;
  contract: string;
  minIndex: number;
  maxIndex: number;
  padded: boolean;
  imageExt: 'svg' | 'webp' | null;
  description: string;
  descriptions: Record<string, string>;
  marketplaces: Record<
    string,
    { name: string; link: string; tokenLink: string }
  >;
  generatesOnChain: boolean;
  constructorParams?: {
    abi: string;
    arguments: (string | bigint)[];
  };
};

export const DEFAULT_ADDRESS = '0x0000000000000000000000000000000000000001';

export const collectionsData: Record<string, CollectionData> = {
  selection: {
    name: 'Selection',
    network: 'Ethereum',
    standard: 'ERC-721',
    generationContractBytecode: '',
    contract: '0xa662f5d0e1ff9e89b972fc44f7b1ba62ba34d055',
    minIndex: 1,
    maxIndex: 4,
    padded: false,
    imageExt: 'svg',
    description:
      'A special selection. Individual works, triptychs, and small series curated just for you. Images and metadata stored directly on blockchain (on-chain).',
    descriptions: {
      en: 'A special selection. Individual works, triptychs, and small series curated just for you. Images and metadata stored directly on blockchain (on-chain).',
      ru: 'Специальная селекция. Индивидуальные работы, триптихи и малые серии, подобранные специально для вас. Изображения и метаданные хранятся полностью в блокчейне (on-chain).',
      zh: '特别甄选：为你精心挑选的单件作品、三联画与小型系列。图像与元数据直接存储在区块链上（链上）。',
      hi: 'एक विशेष चयन। आपके लिए चुनी गई व्यक्तिगत कृतियाँ, त्रिपिटक और छोटी श्रृंखलाएँ। छवियाँ और मेटाडेटा सीधे ब्लॉकचेन पर (ऑन-चेन) संग्रहीत हैं।',
      es: 'Una selección especial. Obras individuales, trípticos y series pequeñas seleccionadas especialmente para ti. Imágenes y metadatos almacenados directamente en la cadena de bloques (on-chain).',
    },
    marketplaces: {
      rarible: {
        name: 'Rarible',
        link: 'https://og.rarible.com/collection/0xa662f5d0e1ff9e89b972fc44f7b1ba62ba34d055',
        tokenLink:
          'https://og.rarible.com/token/0xa662f5d0e1ff9e89b972fc44f7b1ba62ba34d055:',
      },
    },
    generatesOnChain: false,
  },
  folds: {
    name: 'Folds',
    network: 'Ethereum',
    standard: 'ERC-721',
    generationContractBytecode: '',
    contract: '0x1332cba03717a9ae8346fa034a9e0bffb0cfba91',
    minIndex: 1,
    maxIndex: 512,
    padded: false,
    imageExt: 'svg',
    description:
      'A collection of animated vector images in kinetic minimalism style (kinimalism). Images and metadata stored directly on blockchain (on-chain)',
    descriptions: {
      en: 'Animated vector images exploring folds and bends of form in kinetic minimalism style (kinimalism). Images and metadata stored directly on blockchain (on-chain).',
      ru: 'Анимированные векторные изображения, исследующие складки и изгибы формы в стиле кинетического минимализма (кинимализм). Изображения и метаданные хранятся полностью в блокчейне (on-chain).',
      zh: '动感极简主义风格（kinimalism）下探索形式褶皱与弯曲的动画矢量图像。图像与元数据直接存储在区块链上（链上）。',
      hi: 'गतिज न्यूनतमवाद शैली (किनिमलिज़्म) में रूप की तहों और मोड़ों की खोज करने वाली एनिमेटेड वेक्टर छवियाँ। छवियाँ और मेटाडेटा सीधे ब्लॉकचेन पर (ऑन-चेन) संग्रहीत हैं।',
      es: 'Imágenes vectoriales animadas que exploran los pliegues y curvas de la forma en estilo de minimalismo cinético (kinimalismo). Imágenes y metadatos almacenados directamente en la cadena de bloques (on-chain).',
    },
    marketplaces: {
      rarible: {
        name: 'Rarible',
        link: 'https://og.rarible.com/collection/0x1332cba03717a9ae8346fa034a9e0bffb0cfba91',
        tokenLink:
          'https://og.rarible.com/token/0x1332cba03717a9ae8346fa034a9e0bffb0cfba91:',
      },
    },
    generatesOnChain: true,
    constructorParams: {
      abi: 'string, string, string, string, address, uint96',
      arguments: [
        'FOLDS',
        'FOLDS',
        'FOLDS',
        'FOLDS',
        DEFAULT_ADDRESS,
        BigInt(0),
      ],
    },
  },
  frames: {
    name: 'Frames',
    network: 'Ethereum',
    standard: 'ERC-721',
    generationContractBytecode: '',
    contract: '0x99014b9511494088e0ba380fd2aaaeeda8bc5f95',
    minIndex: 1,
    maxIndex: 512,
    padded: false,
    imageExt: 'svg',
    description:
      'A collection of animated vector images in kinetic minimalism style (kinimalism). Images and metadata stored directly on blockchain (on-chain)',
    descriptions: {
      en: 'Animated vector compositions built around frames and boundaries, exploring the structure of the visible in kinetic minimalism style (kinimalism). Stored on-chain on Ethereum.',
      ru: 'Анимированные векторные композиции, построенные вокруг рамок и границ, исследующие структуру видимого в стиле кинетического минимализма (кинимализм). Хранение on-chain в Ethereum.',
      zh: '围绕框架与边界构建的动画矢量作品，以动感极简主义风格（kinimalism）探索可见之物的结构。在以太坊上链上存储。',
      hi: 'फ़्रेम और सीमाओं के इर्द-गिर्द निर्मित एनिमेटेड वेक्टर रचनाएँ, गतिज न्यूनतमवाद शैली (किनिमलिज़्म) में दृश्य की संरचना की खोज। Ethereum पर ऑन-चेन संग्रहीत।',
      es: 'Composiciones vectoriales animadas construidas alrededor de marcos y límites, explorando la estructura de lo visible en estilo de minimalismo cinético (kinimalismo). Almacenado on-chain en Ethereum.',
    },
    marketplaces: {
      rarible: {
        name: 'Rarible',
        link: 'https://og.rarible.com/collection/0x99014b9511494088e0ba380fd2aaaeeda8bc5f95',
        tokenLink:
          'https://og.rarible.com/token/0x99014b9511494088e0ba380fd2aaaeeda8bc5f95:',
      },
    },
    generatesOnChain: true,
    constructorParams: {
      abi: 'string, string, string, string, address, uint96',
      arguments: [
        'FRAMES',
        'FRAMES',
        'FRAMES',
        'FRAMES',
        DEFAULT_ADDRESS,
        BigInt(0),
      ],
    },
  },
  city: {
    name: 'City',
    network: 'Ethereum',
    standard: 'ERC-721',
    generationContractBytecode: '',
    contract: '0x7cdb18d151b672f5532f97ba33feab2cc05cddcb',
    minIndex: 1,
    maxIndex: 512,
    padded: false,
    imageExt: 'svg',
    description:
      'A collection of animated vector images in kinetic minimalism style (kinimalism). Images and metadata stored directly on blockchain (on-chain)',
    descriptions: {
      en: 'Urban rhythm turned into animated vector lines. Cityscapes in kinetic minimalism style (kinimalism), stored fully on-chain on Ethereum.',
      ru: 'Ритм города, превращённый в анимированные векторные линии. Городские пейзажи в стиле кинетического минимализма (кинимализм), полностью хранящиеся on-chain в Ethereum.',
      zh: '将城市节奏转化为动画矢量线条。动感极简主义风格（kinimalism）的城市景观，完全链上存储在以太坊上。',
      hi: 'शहरी लय एनिमेटेड वेक्टर रेखाओं में बदल गई। गतिज न्यूनतमवाद शैली (किनिमलिज़्म) में शहर के दृश्य, पूरी तरह से Ethereum पर ऑन-चेन संग्रहीत।',
      es: 'El ritmo urbano convertido en líneas vectoriales animadas. Paisajes urbanos en estilo de minimalismo cinético (kinimalismo), almacenados totalmente on-chain en Ethereum.',
    },
    marketplaces: {
      rarible: {
        name: 'Rarible',
        link: 'https://og.rarible.com/collection/0x7cdb18d151b672f5532f97ba33feab2cc05cddcb',
        tokenLink:
          'https://og.rarible.com/token/0x7cdb18d151b672f5532f97ba33feab2cc05cddcb:',
      },
    },
    generatesOnChain: true,
    constructorParams: {
      abi: 'string, string, string, string, address, uint96',
      arguments: ['CITY', 'CITY', 'CITY', 'CITY', DEFAULT_ADDRESS, BigInt(0)],
    },
  },
  blinds: {
    name: 'Blinds',
    network: 'Ethereum',
    standard: 'ERC-721',
    generationContractBytecode: '',
    contract: '0x15802dcc0de04AD51D671B41Ecb41Ed519bC4ee2',
    minIndex: 1,
    maxIndex: 555,
    padded: false,
    imageExt: 'svg',
    description:
      'A collection of animated vector images in kinetic minimalism style (kinimalism). Images and metadata stored directly on blockchain (on-chain)',
    descriptions: {
      en: 'Light and shadow through the geometry of blinds: animated vector patterns in kinetic minimalism style (kinimalism), stored on-chain on Ethereum.',
      ru: 'Свет и тень сквозь геометрию жалюзи: анимированные векторные узоры в стиле кинетического минимализма (кинимализм), хранящиеся on-chain в Ethereum.',
      zh: '透过百叶窗几何的光与影：动感极简主义风格（kinimalism）的动画矢量图案，链上存储在以太坊上。',
      hi: 'ब्लाइंड्स की ज्यामिति से गुजरती रोशनी और छाया: गतिज न्यूनतमवाद शैली (किनिमलिज़्म) में एनिमेटेड वेक्टर पैटर्न, Ethereum पर ऑन-चेन संग्रहीत।',
      es: 'Luz y sombra a través de la geometría de las persianas: patrones vectoriales animados en estilo de minimalismo cinético (kinimalismo), almacenados on-chain en Ethereum.',
    },
    marketplaces: {
      rarible: {
        name: 'Rarible',
        link: 'https://og.rarible.com/blinds-by-kirill-ateev',
        tokenLink:
          'https://og.rarible.com/token/0x15802dcc0de04ad51d671b41ecb41ed519bc4ee2:',
      },
    },
    generatesOnChain: true,
    constructorParams: {
      abi: 'string, string, string, string, address, uint96',
      arguments: [
        'BLINDS',
        'BLINDS',
        'BLINDS',
        'BLINDS',
        DEFAULT_ADDRESS,
        BigInt(0),
      ],
    },
  },
  'cocktail-straws': {
    name: 'Cocktail straws',
    network: 'Ethereum',
    standard: 'ERC-721',
    generationContractBytecode: '',
    contract: '0x871B5048D20505D5e2acc3f9487C674441d297D4',
    minIndex: 1,
    maxIndex: 111,
    padded: false,
    imageExt: null,
    description:
      'A collection of animated vector images in kinetic minimalism style (kinimalism). Images and metadata stored directly on blockchain (on-chain)',
    descriptions: {
      en: 'Playful kinetic compositions built from cocktail straws — animated vector minimalism with a light mood, stored on-chain on Ethereum.',
      ru: 'Игривые кинетические композиции из коктейльных трубочек — анимированный векторный минимализм с лёгким настроением, хранящийся on-chain в Ethereum.',
      zh: '用鸡尾酒吸管构建的趣味动感作品——轻松氛围的动画矢量极简主义，链上存储在以太坊上。',
      hi: 'कॉकटेल स्ट्रॉ से निर्मित चंचल गतिज रचनाएँ — हल्के मूड के साथ एनिमेटेड वेक्टर न्यूनतमवाद, Ethereum पर ऑन-चेन संग्रहीत।',
      es: 'Composiciones cinéticas lúdicas construidas con pajitas de cóctel: minimalismo vectorial animado con un tono ligero, almacenado on-chain en Ethereum.',
    },
    marketplaces: {
      rarible: {
        name: 'Rarible',
        link: 'https://og.rarible.com/cocktail-straws-by-kirill-ateev',
        tokenLink:
          'https://og.rarible.com/token/0x871b5048d20505d5e2acc3f9487c674441d297d4:',
      },
    },
    generatesOnChain: true,
    constructorParams: {
      abi: 'string, string, string, string, address, uint96',
      arguments: [
        'COCKTAIL STRAWS',
        'COCKTAIL STRAWS',
        'COCKTAIL STRAWS',
        'COCKTAIL STRAWS',
        DEFAULT_ADDRESS,
        BigInt(0),
      ],
    },
  },
  window: {
    name: 'Window',
    network: 'Ethereum',
    standard: 'ERC-721',
    generationContractBytecode: '',
    contract: '0x4aA41C7C9eCF9cdE5Aa1CC215AAe5d9bB91D0952',
    minIndex: 1,
    maxIndex: 10000,
    padded: true,
    imageExt: 'svg',
    description:
      'A collection of animated vector images in kinetic minimalism style (kinimalism). Images and metadata stored directly on blockchain (on-chain)',
    descriptions: {
      en: 'Windows as a frame for movement: a large series of animated vector works in kinetic minimalism style (kinimalism), stored on-chain on Ethereum.',
      ru: 'Окна как рамка движения: большая серия анимированных векторных работ в стиле кинетического минимализма (кинимализм), хранящихся on-chain в Ethereum.',
      zh: '以窗户为运动之框：动感极简主义风格（kinimalism）的大型动画矢量作品系列，链上存储在以太坊上。',
      hi: 'गति के लिए फ़्रेम के रूप में खिड़कियाँ: गतिज न्यूनतमवाद शैली (किनिमलिज़्म) में एनिमेटेड वेक्टर कृतियों की एक बड़ी श्रृंखला, Ethereum पर ऑन-चेन संग्रहीत।',
      es: 'Ventanas como marco para el movimiento: una gran serie de obras vectoriales animadas en estilo de minimalismo cinético (kinimalismo), almacenadas on-chain en Ethereum.',
    },
    marketplaces: {
      rarible: {
        name: 'Rarible',
        link: 'https://og.rarible.com/window-by-kirill-ateev',
        tokenLink:
          'https://og.rarible.com/token/0x4aa41c7c9ecf9cde5aa1cc215aae5d9bb91d0952:',
      },
    },
    generatesOnChain: true,
    constructorParams: {
      abi: 'string, string, string, address, uint96',
      arguments: ['WINDOW', 'WINDOW', 'WINDOW', DEFAULT_ADDRESS, BigInt(0)],
    },
  },
  crosswalk: {
    name: 'Crosswalk',
    network: 'Ethereum',
    standard: 'ERC-721',
    contract: '0x1a8deb6deb554cf80d8202c169d31538d449c99b',
    minIndex: 1,
    maxIndex: 10000,
    padded: true,
    imageExt: 'svg',
    description:
      'A collection of animated vector images in kinetic minimalism style (kinimalism). Images and metadata stored directly on blockchain (on-chain)',
    descriptions: {
      en: 'The rhythm of crossing the street: animated vector lines of crosswalks in kinetic minimalism style (kinimalism), stored fully on-chain on Ethereum.',
      ru: 'Ритм перехода улицы: анимированные векторные линии пешеходных переходов в стиле кинетического минимализма (кинимализм), полностью хранящиеся on-chain в Ethereum.',
      zh: '过马路的节奏：动感极简主义风格（kinimalism）的斑马线动画矢量线条，完全链上存储在以太坊上。',
      hi: 'सड़क पार करने की लय: गतिज न्यूनतमवाद शैली (किनिमलिज़्म) में क्रॉसवॉक की एनिमेटेड वेक्टर रेखाएँ, पूरी तरह से Ethereum पर ऑन-चेन संग्रहीत।',
      es: 'El ritmo de cruzar la calle: líneas vectoriales animadas de pasos de cebra en estilo de minimalismo cinético (kinimalismo), almacenadas totalmente on-chain en Ethereum.',
    },
    marketplaces: {
      rarible: {
        name: 'Rarible',
        link: 'https://og.rarible.com/crosswalk-by-kirill-ateev',
        tokenLink:
          'https://og.rarible.com/token/0x1a8deb6deb554cf80d8202c169d31538d449c99b:',
      },
    },
    generatesOnChain: true,
    constructorParams: {
      abi: 'string, string, string, address, uint96',
      arguments: [
        'CROSSWALK',
        'CROSSWALK',
        'CROSSWALK',
        DEFAULT_ADDRESS,
        BigInt(0),
      ],
    },
  },
  lanes: {
    name: 'Lanes',
    network: 'Ethereum',
    standard: 'ERC-721',
    contract: '0x580731911b8d5df910b7ed9b776f1b2e70de6752',
    minIndex: 1,
    maxIndex: 10000,
    padded: true,
    imageExt: 'svg',
    description:
      'A collection of animated vector images in kinetic minimalism style (kinimalism). Images and metadata stored directly on blockchain (on-chain)',
    descriptions: {
      en: 'Motion through lanes: kinetic vector abstractions in minimalist style (kinimalism), stored on-chain on Ethereum.',
      ru: 'Движение сквозь полосы: кинетические векторные абстракции в стиле минимализма (кинимализм), хранящиеся on-chain в Ethereum.',
      zh: '穿过车道的运动：极简风格（kinimalism）的动感矢量抽象，链上存储在以太坊上。',
      hi: 'लेनों से गुजरती गति: न्यूनतम शैली (किनिमलिज़्म) में गतिज वेक्टर अमूर्तन, Ethereum पर ऑन-चेन संग्रहीत।',
      es: 'Movimiento a través de carriles: abstracciones vectoriales cinéticas en estilo minimalista (kinimalismo), almacenadas on-chain en Ethereum.',
    },
    marketplaces: {
      rarible: {
        name: 'Rarible',
        link: 'https://og.rarible.com/lanes-by-kirill-ateev',
        tokenLink:
          'https://og.rarible.com/token/0x580731911b8d5df910b7ed9b776f1b2e70de6752:',
      },
    },
    generatesOnChain: true,
    constructorParams: {
      abi: 'string, string, string, address, uint96',
      arguments: ['LANES', 'LANES', 'LANES', DEFAULT_ADDRESS, BigInt(0)],
    },
  },
  attentionless: {
    name: 'Attentionless',
    network: 'Ethereum',
    standard: 'ERC-721',
    contract: '0xa3754152a10a3bbad4c4e0586dbf4a2b8e391f71',
    minIndex: 1,
    maxIndex: 1024,
    padded: false,
    imageExt: 'webp',
    description:
      'A collection of collages of CC0 images in an abstractionist style. Images and metadata stored on IPFS.',
    descriptions: {
      en: 'A collection of collages of CC0 images in an abstractionist style. Images and metadata stored on IPFS.',
      ru: 'Коллекция коллажей из изображений CC0 в абстракционистском стиле. Изображения и метаданные хранятся на IPFS.',
      zh: '抽象主义风格 CC0 图像拼贴收藏。图像与元数据存储在 IPFS 上。',
      hi: 'अमूर्तवादी शैली में CC0 छवियों के कोलाज का संग्रह। छवियाँ और मेटाडेटा IPFS पर संग्रहीत हैं।',
      es: 'Una colección de collages de imágenes CC0 en estilo abstraccionista. Imágenes y metadatos almacenados en IPFS.',
    },
    marketplaces: {
      rarible: {
        name: 'Rarible',
        link: 'https://og.rarible.com/attentionless-by-kirill-ateev',
        tokenLink:
          'https://og.rarible.com/token/0xa3754152a10a3bbad4c4e0586dbf4a2b8e391f71:',
      },
    },
    generatesOnChain: false,
  },
};
