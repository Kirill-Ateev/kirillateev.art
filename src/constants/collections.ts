type CollectionData = {
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
};

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
