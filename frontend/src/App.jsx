import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import "./App.css";

import { useState } from "react";
import { generateArticle } from "./api/client";

/**
 * Main Application Component.
 * Manages the top-level layout, routing, and manual article generation trigger.
 */
function App() {
  const [isGenerating, setIsGenerating] = useState(false);

  /**
   * Triggers the backend AI generation process and refreshes the view.
   */
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const topics = ["React", "Node.js", "AWS", "Docker", "AI"];
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      await generateArticle(randomTopic);
      // Hard refresh to update the list immediately
      window.location.reload();
    } catch (error) {
      console.error("Generation failed:", error);
      alert("Failed to generate article");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Router>
      <div className="container">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>AutoBlog</h1>
          <button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Generate +"}
          </button>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
