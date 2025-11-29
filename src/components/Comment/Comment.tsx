"use client";

import React from "react";
import { CommentTab } from "./CommentTab";

interface CommentProps {
  courseId: string;
}

const Comment: React.FC<CommentProps> = ({ courseId }) => {
  return (
    <div className="w-full flex justify-center mt-10">
      <CommentTab courseId={courseId} />
    </div>
  );
};

export default Comment;
