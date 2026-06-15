import React from "react";
import TextBoxComment from "./TextBoxComment";
import SliderForComment from "./SliderForComment";
import { getAllCommentByAdmin } from "../../../services/api/Admin/comment/getAllComment";
import { getAllComment } from "../../../services/api/landing/comment/getAllComment";

async function CommentInLanding() {
  const data = await getAllComment({ page: 1, limit: 10 });
  console.log(data);

  return (
    <div>
      <TextBoxComment />
      <section className="border p-6 sm:p-0 mb-[56px] z-50 h-[500px]">
        <SliderForComment data={data.data} />
      </section>
    </div>
  );
}

export default CommentInLanding;
