import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const getArticles = async () => {
    const response = await apiClient.get("/articles");
    return response.data;
};

export const getArticle = async (id) => {
    const response = await apiClient.get(`/articles/${id}`);
    return response.data;
};

export default apiClient;
