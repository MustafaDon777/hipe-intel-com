// src/app/stay-up-to-date/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function NewsPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [query, setQuery] = useState("intelligence community");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalArticles, setTotalArticles] = useState(0);

  const presetTopics = [
    "Intelligence Community",
    "CIA",
    "NSA cybersecurity",
    "FBI",
    "Security clearance",
    "Intelligence analyst",
    "National security",
    "Counterterrorism",
    "GEOINT",
    "SIGINT",
    "DIA",
    "NGA careers",
    "Intelligence internships",
    "Defense intelligence",
  ];

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const url = `/api/news?q=${encodeURIComponent(query)}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log("🛰️ News result:", data);
        setArticles(data.articles || []);
        setTotalArticles(data.total || 0);
      } catch (err) {
        console.error("❌ Failed to fetch news articles:", err);
        setArticles([]);
        setTotalArticles(0);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8 text-white">
      <h1 className="text-3xl sm:text-4xl font-bold text-center">
        🗞️ Stay Up to Date
      </h1>

      {/* Show results count */}
      {!loading && totalArticles > 0 && (
        <p className="text-center text-gray-400">
          Showing {articles.length} articles from multiple sources
        </p>
      )}

      {/* 🔍 Search Input */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <input
          type="text"
          placeholder="Search intelligence news..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue.trim()) {
              setQuery(inputValue);
            }
          }}
          className="w-full sm:w-96 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={() => inputValue.trim() && setQuery(inputValue)}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          Search
        </button>
      </div>

      {/* 🎯 Topic Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {presetTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => setQuery(topic)}
            className={`px-4 py-1 rounded transition text-sm ${
              query === topic
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-white hover:bg-blue-500"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center text-gray-400 py-8">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"></div>
          <p>Searching across multiple news sources...</p>
        </div>
      )}

      {/* 📰 Articles Grid - Fixed Height Cards */}
      {!loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-400">
                No articles found for &quot;{query}&quot;. Try a different
                search term.
              </p>
            </div>
          ) : (
            articles.map((article, i) => (
              <div
                key={i}
                className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-blue-500 transition-all flex flex-col h-full"
              >
                {/* Fixed height image */}
                <div className="h-48 bg-gray-800 flex-shrink-0 relative">
                  {article.image && (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  )}
                  {/* Source badge */}
                  <div className="absolute top-2 right-2 bg-black/70 text-xs px-2 py-1 rounded">
                    {article.source?.name || "News"}
                  </div>
                </div>

                {/* Content with fixed heights */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* Title - 2 lines max */}
                  <h2 className="font-semibold text-lg line-clamp-2 mb-2 min-h-[3.5rem]">
                    {article.title}
                  </h2>

                  {/* Description - 3 lines max */}
                  <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-grow min-h-[4.5rem]">
                    {article.description || "No description available."}
                  </p>

                  {/* Footer - stays at bottom */}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm mt-auto inline-flex items-center gap-1"
                  >
                    Read more
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
