// PaginatedBookmarkList.js
import React, { useState } from "react";

const ARTICLES_PER_PAGE = 5;

function generateDummyArticles(count) {
  const article = [];
  for (let i = 1; i <= count; i++) {
    article.push({
      id: i,
      content: `This is the content of article ${i}.`,
      title: `Article ${i}`,
      bookmarked: false,
    })
  }
  return article;
}
export default function PaginatedBookmarkList() {
  // TODO: State
  const [articles, setArticles] = useState(generateDummyArticles(23)); // TODO: adjust initial articles if needed
  const [currentPage, setCurrentPage] = useState(1); // current page of pagination
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false); // filter flag

  // TODO: Function toggleBookmark(id)
  function toggleBookmark(id) {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id
          ? { ...article, bookmarked: !article.bookmarked }
          : article
      )
    )
  }


  // TODO: Function getFilteredArticles()
  function getFilteredArticles() {
    return showOnlyBookmarked
      ? articles.filter((article) => article.bookmarked)
      : articles;
  }



  // TODO: Calculate total pages
  const totalPages = Math.ceil(getFilteredArticles().length / ARTICLES_PER_PAGE);

  // TODO: Function getCurrentArticles()
  function getCurrentArticles() {
    const filtered = getFilteredArticles();
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    // TODO: slice filtered array for current page
    return filtered.slice(startIndex, startIndex + ARTICLES_PER_PAGE);
  }

  const currentArticles = getCurrentArticles();

  // TODO: Function goToPage(page)
  function goToPage(page) {
    // TODO: clamp page between 1 and totalPages
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  }

  return (
    <div className="paginated-container" data-testid="paginated-container">
      <div className="header" data-testid="header">
        <h2>Articles</h2>
        <label htmlFor="bookmark-filter" data-testid="bookmark-filter-checkbox">
          <input
            id="bookmark-filter"
            type="checkbox"
            
            checked={showOnlyBookmarked}
            onChange={() => {
              setShowOnlyBookmarked(!showOnlyBookmarked);
              setCurrentPage(1); // reset to first page on filter change
            }}
          />
          Show only bookmarked
        </label>
      </div>

      {currentArticles.length === 0 ? (
        <p data-testid="no-articles-message">No articles to display.</p>
      ) : (
        currentArticles.map((article) => (
          <div
            key={article.id}
            className="article-card"
            data-testid={`article-card-${article.id}`}
          >
            <h3>
              {article.title}
              <span
                className={`bookmark ${article.bookmarked ? "active" : ""}`}
                onClick={() => toggleBookmark(article.id)}
                data-testid={`bookmark-icon-${article.id}`}
                role="button"
                aria-label={`Bookmark toggle for ${article.title}`}
                style={{ cursor: "pointer", marginLeft: "8px" }}
              >
                ★
              </span>
            </h3>
            <p>{article.content}</p>
          </div>
        ))
      )}

      <div className="pagination" data-testid="pagination-controls">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          data-testid="prev-button"
        >
          Prev
        </button>
        <span data-testid="page-info">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          data-testid="next-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
