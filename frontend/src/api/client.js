import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Fetches the list of all articles.
 */
export const getArticles = async () => {
    const response = await apiClient.get("/articles");
    return response.data;
};

/**
 * Fetches a single article by ID.
 * @param {string} id 
 */
export const getArticle = async (id) => {
    const response = await apiClient.get(`/articles/${id}`);
    return response.data;
};

/**
 * Triggers the generation of a new article.
 * @param {string} topic 
 */
export const generateArticle = async (topic) => {
    const response = await apiClient.post("/articles/generate", { topic });
    return response.data;
};

export default apiClient;
