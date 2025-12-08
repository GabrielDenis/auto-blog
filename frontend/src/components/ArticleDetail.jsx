import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticle } from "../api/client";

function ArticleDetail() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getArticle(id)
            .then(setArticle)
            .catch((err) => {
                console.error("Failed to fetch article:", err);
                setError("Article not found.");
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="loading">Loading article...</div>;
    if (error) return <div className="error">{error} <Link to="/">Go Back</Link></div>;

    return (
        <div className="article-detail">
            <Link to="/" className="back-link">← Back to Articles</Link>
            <article>
                <h1>{article.title}</h1>
                <div className="meta">
                    <span>Topic: {article.topic}</span>
                    <time>{new Date(article.createdAt).toLocaleDateString()}</time>
                </div>
                <div className="content">
                    {article.content.split("\n").map((para, i) => (
                        <p key={i}>{para}</p>
                    ))}
                </div>
            </article>
        </div>
    );
}

export default ArticleDetail;
