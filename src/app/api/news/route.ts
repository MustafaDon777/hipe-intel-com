// src/app/api/news/route.ts
import { NextResponse } from "next/server";

interface Article {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "intelligence community";

  const allArticles: Article[] = [];

  try {
    // 1. Fetch from GNews
    if (process.env.GNEWS_API_KEY) {
      try {
        const gnewsUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
          query
        )}&lang=en&max=10&sortby=publishedAt&token=${
          process.env.GNEWS_API_KEY
        }`;

        const gnewsRes = await fetch(gnewsUrl);
        const gnewsData = await gnewsRes.json();

        if (gnewsData.articles) {
          allArticles.push(...gnewsData.articles);
        }
        console.log("✅ GNews fetched:", gnewsData.articles?.length || 0);
      } catch (err) {
        console.error("❌ GNews error:", err);
      }
    }

    // 2. Fetch from NewsAPI
    if (process.env.NEWSAPI_KEY) {
      try {
        const newsApiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          query
        )}&language=en&pageSize=20&sortBy=publishedAt&apiKey=${
          process.env.NEWSAPI_KEY
        }`;

        const newsApiRes = await fetch(newsApiUrl);
        const newsApiData = await newsApiRes.json();

        if (newsApiData.articles) {
          const formattedArticles = newsApiData.articles.map((article: any) => ({
            title: article.title,
            description: article.description,
            url: article.url,
            image: article.urlToImage,
            publishedAt: article.publishedAt,
            source: article.source,
          }));
          allArticles.push(...formattedArticles);
        }
        console.log(
          "✅ NewsAPI fetched:",
          newsApiData.articles?.length || 0
        );
      } catch (err) {
        console.error("❌ NewsAPI error:", err);
      }
    }

    // Remove duplicates based on URL
    const uniqueArticles = removeDuplicates(allArticles);

    // Sort by date (most recent first)
    uniqueArticles.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    console.log(
      `📊 Total unique articles: ${uniqueArticles.length} from ${allArticles.length} fetched`
    );

    return NextResponse.json({
      articles: uniqueArticles.slice(0, 30), // Return top 30 most recent
      total: uniqueArticles.length,
    });
  } catch (err) {
    console.error("❌ News fetch failed:", err);
    return NextResponse.json({ articles: [], total: 0 }, { status: 500 });
  }
}

// Helper function to remove duplicate articles
function removeDuplicates(articles: Article[]): Article[] {
  const seen = new Set<string>();
  const unique: Article[] = [];

  for (const article of articles) {
    // Skip articles without essential data
    if (!article.title || !article.url) continue;

    // Create a unique key based on URL
    const key = article.url.toLowerCase();

    if (!seen.has(key)) {
      seen.add(key);
      unique.push(article);
    }
  }

  return unique;
}