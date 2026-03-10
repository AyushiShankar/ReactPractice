// PostCard.js
//👍 likes | 👎 dislikes | 👁️ views   
export default function PostCard({ title, body, tags, reactions, views }) {
  return (
    <div className="post-card">
      <h2>{title}</h2>
      <p>{body}</p>
      <div className="post-tag">
        {tags.map((tag, id) => (
          <span key={id} className="tags">#{tag}
          </span>
        ))}
      </div>
      <div className="reaction">
        <p>👍 {reactions.likes} | 👎 {reactions.dislikes} | 👁️ {views} </p>
      </div>
    </div>
  );
}
