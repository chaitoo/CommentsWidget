import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import ActionCreators from "../../actions/ActionCreators";
import Comments from "../Comments";
import Button from "../Button";
import style from "./MainComment.module.css";

const { addComment } = ActionCreators;
const mapStateToProps = (state: CommonState) => ({
  comments: state.comments,
});
const mapDispatchToProps = { addComment };
const connector = connect(mapStateToProps, mapDispatchToProps);
const MainComment: React.FC<ConnectedProps<typeof connector>> = ({
  addComment,
  comments,
}) => {
  const [commentText, setCommentText] = useState("");
  const onAddComment = () => {
    addComment(commentText);
    setCommentText("");
  };
  return (
    <div className={style.wrapper}>
      <div className={style.mainComment}>
        <textarea
          className={style.textArea}
          type="text"
          placeholder="Add Comment"
          autoFocus={true}
          onChange={(e) => setCommentText(e.target.value)}
          value={commentText}
        />
        <Button
          text={"Add Comment"}
          onClick={onAddComment}
          customClass={"DEFAULT"}
        />
      </div>
      <Comments />
    </div>
  );
};

export default connector(MainComment);
