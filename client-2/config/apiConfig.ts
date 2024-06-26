const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com",
  endpoints: {
    login: "/auth/login",
    register: "/users",
    getProfile: "/users",
    getProfileById: (id: string) => `/users/${id}`,
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
