// App.js
import "./BlogPosts.module.css";
import PostCard from "./PostCard";
import postsData from "./postsData";

export default function BlogPosts() {
  return (
    <div className="blog-post">
      <h2>Blog Posts</h2>
      <div className="post-grid">
        {postsData.map((data) => (

          <PostCard key={data.id} {...data} />

        ))}
      </div>
    </div>
  );
}
