const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com",
  endpoints: {
    login: "/auth/login",
    register: "/users",
    getProfile: "/profile",
    updateProfile: "/profile",
    getListConversation: "/conversations",
    createConversation: "/conversations",
    getListMessageInConversation: (id: string) => `/message/${id}`,
    sendMessage: "/message",
    getProfileById: (id: string) => `/stats/profile/${id}`,
    follow: "/friends/follow",
    unfollow: "/friends/unfollow",
    createPost: "/posts",
    getPosts: "/posts",
    getPost: (id: string) => `/posts/${id}`,
    getStickers: "/sticker",
    listManga: "/manga",
    getManga: (id: string) => `/manga/${id}`,
    uploadManga: "manga/upload",
  },
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export default apiConfig;
