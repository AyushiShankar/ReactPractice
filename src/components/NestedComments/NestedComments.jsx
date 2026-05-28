import React, { useState } from "react";
import "./styles.css";

const mockComments = [
  {
    id: 1,
    text: "Happy New Year folks! What are your resolutions this year?",
    replies: [
      {
        id: 2,
        text: "Same to you. I am planning to join a gym.",
        replies: [
          {
            id: 3,
            text: "I tried last year and gave up.",
            replies: [
              {
                id: 4,
                text: "Good on you, nothing is more important than good health.",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

// Counter for generating unique IDs
let idCounter = 4;

export default function CommentApp() {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");

  const addReply = (parentId, val) => {
    const newReply = {
      id: Date.now(),
      text: val,
      replies: [],

    };

    const addNestedReply = (commentList) => {
      return commentList.map((comment) => {
        if (comment.id === parentId) {

          return { ...comment, replies: [...comment.replies, newReply] }
        }
        return { ...comment, replies: addNestedReply(comment.replies) }

      });
    };

    setComments(prev => addNestedReply(prev))
  };

  const addComment = (val) => {
    if (!val) return;
    setComments((prev) =>
      [...prev,
      {
        id: Date.now(),
        text: val.trim(),
        replies: [],
      }]);

    setNewComment("");
  };

  const Comment = ({ comment }) => {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyText, setReplyText] = useState("");

    const handleReply = (data, id) => {
      if (data.trim()) {
        addReply(id, data);
        setReplyText("");
        setShowReplyInput(false);
      }

    };

    return (
      <div className="comment" data-testid={`comment-${comment.id}`}>
        <div>{comment.text}</div>
        <button onClick={() => setShowReplyInput(!showReplyInput)}
          className="reply-btn"
          data-testid={`reply-btn-${comment.id}`}>
          Add a reply
        </button>

        {
          showReplyInput && (
            <div className="reply-box">
              <input
                type="text"
                data-testid={`reply-input-${comment.id}`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply..."
              />
              <button
                data-testid={`submit-reply-${comment.id}`}
                onClick={() => handleReply(replyText, comment.id)}>Submit</button>
            </div>
          )
        }

        <div className="replies">
          {comment.replies?.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      </div >
    );
  };

  return (
    <div className="App">
      <h2>Comment Section</h2>
      <div className="new-comment">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          data-testid="new-comment-input"
          placeholder="Type a comment..."
        />
        <button data-testid="add-comment-btn"
          onClick={() => addComment(newComment)}>Add Comment</button>
      </div>

      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>

  );
}
