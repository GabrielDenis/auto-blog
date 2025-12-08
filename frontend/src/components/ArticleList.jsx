import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../api/client";

function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getArticles()
            .then(setArticles)
            .catch((err) => console.error("Failed to fetch articles:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="loading">Loading articles...</div>;

    return (
        <div className="article-list">
            {articles.map((article) => (
                <div key={article.id} className="article-card">
                    <h2>
                        <Link to={`/article/${article.id}`}>{article.title}</Link>
                    </h2>
                    <p className="summary">{article.content.substring(0, 150)}...</p>
                    <small className="meta">
                        Topic: {article.topic} | Published:{" "}
                        {new Date(article.createdAt).toLocaleDateString()}
                    </small>
                </div>
            ))}
            {articles.length === 0 && <p>No articles found.</p>}
        </div>
    );
}

export default ArticleList;
