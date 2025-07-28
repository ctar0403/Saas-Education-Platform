"use client";

import React, { useState } from "react";

const Comments = () => {
  const [newComment, setNewComment] = useState("");

  const comments = [
    {
      id: 1,
      user: "Full Name",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      time: "Posted 2 hours ago",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis, lectus",
      likes: 0,
      replies: [],
    },
    {
      id: 2,
      user: "Full Name",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      time: "Posted 2 hours ago",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis, lectus",
      likes: 0,
      replies: [],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      console.log("New comment:", newComment);
      setNewComment("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-roboto font-bold text-[#032C3D] mb-6">
        Comments
      </h3>

      {/* Comments List */}
      <div className="space-y-6 mb-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-[#032C3D] rounded-full flex items-center justify-center text-white font-medium text-sm">
                FL
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-[#032C3D] text-sm">
                  {comment.user}
                </span>
                <span className="text-xs text-gray-500">{comment.time}</span>
              </div>

              <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                {comment.content}
              </p>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#08AD98] transition-colors">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Like
                </button>

                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#08AD98] transition-colors">
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
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                  Share
                </button>

                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#08AD98] transition-colors">
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
                      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                    />
                  </svg>
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="flex-1 flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a Comment"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#08AD98] focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={!newComment.trim()}
            className="px-6 py-3 bg-[#08AD98] text-white rounded-lg hover:bg-[#078c7d] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comments;
