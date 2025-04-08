
import { Manga, Chapter } from "../types/manga";

// Mock data for the app
const mockMangas: Manga[] = [
  {
    id: 1,
    title: "Demon Slayer",
    cover: "https://m.media-amazon.com/images/I/51j5Kkw0lBL._SY445_SX342_.jpg",
    description: "A young boy becomes a demon slayer after his family is slaughtered and his sister is infected with the demon curse.",
    author: "Koyoharu Gotouge",
    rating: 4.8,
    chapters: 205,
    tags: ["Action", "Fantasy", "Historical"],
    isFeatured: true,
    isPopular: true
  },
  {
    id: 2,
    title: "One Piece",
    cover: "https://m.media-amazon.com/images/I/51F-vOJLLRL._SY445_SX342_.jpg",
    description: "Monkey D. Luffy and his pirate crew explore the Grand Line in search of the world's ultimate treasure known as \"One Piece\".",
    author: "Eiichiro Oda",
    rating: 4.9,
    chapters: 1092,
    tags: ["Adventure", "Fantasy", "Action"],
    isFeatured: true,
    isPopular: true
  },
  {
    id: 3,
    title: "My Hero Academia",
    cover: "https://m.media-amazon.com/images/I/51FXs751T0L._SY445_SX342_.jpg",
    description: "In a world where most people have superpowers, a boy without them aims to become the greatest hero.",
    author: "Kohei Horikoshi",
    rating: 4.7,
    chapters: 420,
    tags: ["Superhero", "School", "Action"],
    isNew: true
  },
  {
    id: 4,
    title: "Jujutsu Kaisen",
    cover: "https://m.media-amazon.com/images/I/51QQuVgm4TL._SY445_SX342_.jpg",
    description: "A boy joins a secret organization of Jujutsu Sorcerers to kill a powerful Curse named Ryomen Sukuna.",
    author: "Gege Akutami",
    rating: 4.8,
    chapters: 240,
    tags: ["Supernatural", "Horror", "Action"],
    isNew: true,
    isPopular: true
  },
  {
    id: 5,
    title: "Chainsaw Man",
    cover: "https://m.media-amazon.com/images/I/51L74fVHGRL._SY445_SX342_.jpg",
    description: "A young man with the power to transform parts of his body into chainsaws makes a contract with a devil to hunt other devils.",
    author: "Tatsuki Fujimoto",
    rating: 4.7,
    chapters: 129,
    tags: ["Horror", "Action", "Supernatural"],
    isFeatured: true
  },
  {
    id: 6,
    title: "Attack on Titan",
    cover: "https://m.media-amazon.com/images/I/51Yen52OiAL._SY445_SX342_.jpg",
    description: "Humanity lives within cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans.",
    author: "Hajime Isayama",
    rating: 4.9,
    chapters: 139,
    tags: ["Dark Fantasy", "Post-Apocalyptic", "Action"],
    isPopular: true
  },
  {
    id: 7,
    title: "Spy x Family",
    cover: "https://m.media-amazon.com/images/I/51qSFGPNMNL._SY445_SX342_.jpg",
    description: "A spy has to build a family to execute a mission, not realizing that the girl he adopts is a telepath, and the woman he marries is an assassin.",
    author: "Tatsuya Endo",
    rating: 4.8,
    chapters: 90,
    tags: ["Action", "Comedy", "Slice of Life"],
    isNew: true
  },
  {
    id: 8,
    title: "Tokyo Ghoul",
    cover: "https://m.media-amazon.com/images/I/51QadO7TzlL._SY445_SX342_.jpg",
    description: "A college student is attacked by a ghoul and becomes a half-ghoul who must consume human flesh to survive.",
    author: "Sui Ishida",
    rating: 4.6,
    chapters: 143,
    tags: ["Horror", "Supernatural", "Psychological"],
    isPopular: true
  },
  {
    id: 9,
    title: "Haikyu!!",
    cover: "https://m.media-amazon.com/images/I/510+7x0FPZL._SY445_SX342_.jpg",
    description: "A determined high school student joins his school's volleyball team, hoping to eventually surpass his idol.",
    author: "Haruichi Furudate",
    rating: 4.7,
    chapters: 402,
    tags: ["Sports", "School", "Comedy"]
  },
  {
    id: 10,
    title: "Naruto",
    cover: "https://m.media-amazon.com/images/I/61LjoJNl0dL._SY445_SX342_.jpg",
    description: "A young ninja seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.",
    author: "Masashi Kishimoto",
    rating: 4.8,
    chapters: 700,
    tags: ["Action", "Adventure", "Fantasy"]
  },
  {
    id: 11,
    title: "Berserk",
    cover: "https://m.media-amazon.com/images/I/51fuhG78j6L._SY445_SX342_.jpg",
    description: "A former mercenary, now known as the 'Black Swordsman', seeks revenge.",
    author: "Kentaro Miura",
    rating: 4.9,
    chapters: 363,
    tags: ["Dark Fantasy", "Horror", "Action"]
  },
  {
    id: 12,
    title: "Fullmetal Alchemist",
    cover: "https://m.media-amazon.com/images/I/51ZKSVe7qfL._SY445_SX342_.jpg",
    description: "Two brothers search for the Philosopher's Stone to restore their bodies after a failed alchemical ritual.",
    author: "Hiromu Arakawa",
    rating: 4.9,
    chapters: 116,
    tags: ["Adventure", "Fantasy", "Steampunk"]
  }
];

const mockChapters: Record<number, Chapter[]> = {
  1: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    mangaId: 1,
    number: i + 1,
    title: `Chapter ${i + 1}: The Beginning`,
    pages: 22,
    releaseDate: new Date(2020, 0, i + 1).toISOString(),
    isRead: i < 5
  }))
};

export const getMangaList = (page: number = 1, limit: number = 10): Promise<Manga[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * limit;
      const end = start + limit;
      resolve(mockMangas.slice(start, end));
    }, 800); // Simulate network delay
  });
};

export const getFeaturedManga = (): Promise<Manga[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMangas.filter(manga => manga.isFeatured));
    }, 500);
  });
};

export const getNewManga = (): Promise<Manga[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMangas.filter(manga => manga.isNew));
    }, 500);
  });
};

export const getPopularManga = (): Promise<Manga[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMangas.filter(manga => manga.isPopular));
    }, 500);
  });
};

export const getMangaById = (id: number): Promise<Manga | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMangas.find(manga => manga.id === id));
    }, 300);
  });
};

export const getChaptersByMangaId = (mangaId: number): Promise<Chapter[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockChapters[mangaId] || []);
    }, 500);
  });
};

export const searchManga = (query: string): Promise<Manga[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockMangas.filter(manga => 
        manga.title.toLowerCase().includes(query.toLowerCase()) || 
        manga.author.toLowerCase().includes(query.toLowerCase()) ||
        manga.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      resolve(results);
    }, 500);
  });
};
