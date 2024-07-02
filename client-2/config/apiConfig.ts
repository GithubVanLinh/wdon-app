const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com",
  endpoints: {
    login: "/auth/login",
    register: "/users",
    getProfile: "/profile",
    getListConversation: "/conversations",
    getListMessageInConversation: (id: string) => `/message/${id}`,
    getProfileById: (id: string) => `/stats/profile/${id}`,
    follow: "/friends/follow",
    unfollow: "/friends/unfollow",
    createPost: "/posts",
    getPosts: "/posts",
    getPost: (id: string) => `/posts/${id}`,
  },
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export default apiConfig;
