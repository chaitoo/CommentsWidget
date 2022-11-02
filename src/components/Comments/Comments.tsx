import React, { useState } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import ActionCreators from "../../actions/ActionCreators";
import Button from "../Button";
import style from "./Comments.module.css";

const { addReply, deleteComment, editComment } = ActionCreators;
const mapStateToProps = (state: CommonState) => ({
  allComments: state.allComments,
});

const mapDispatchToProps = { addReply, deleteComment, editComment };
const connector = connect(mapStateToProps, mapDispatchToProps);

const CommentText = ({ comment, index, deleteComment, editComment }) => {
  const dispatch = useDispatch();
  const [showReply, setShowReply] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [editText, setEditText] = useState(comment.text);
  const onSendreply = () => {
    const action = addReply({ replyText, msgLevel: index });
    dispatch(action);
    setShowReply(false);
    setReplyText("");
  };
  const onEditReply = () => {
    editComment({ editText, msgLevel: index });
    setShowEdit(false);
  }
  const onDeleteComment = () => {
    deleteComment({ msgLevel: index });
  };
  const commentDate = new Date(comment.timestamp);
  return (
    <div key={`${index}${comment.timestamp}`}>
      <div
        className={style.commentTextWrapper}
        style={{ paddingLeft: `${index.length * 8}px` }}
      >
        <span className={style.commentText}>{comment.text}</span>
        <span className={style.dateText}>{`${commentDate.getDate()}/${
          commentDate.getMonth() + 1
        }/${commentDate.getFullYear()}`}</span>
        <span>
          <Button
            onClick={onDeleteComment}
            text={"Delete"}
            customClass="ACTION"
          />
          <Button
            onClick={() => setShowReply(true)}
            text={"Reply"}
            customClass="ACTION"
          />
          <Button
            onClick={() => setShowEdit(true)}
            text={"Edit"}
            customClass="ACTION"
          />
        </span>
        {showReply && (
          <div className={style.replyWrapper}>
            <input
              type="text"
              placeholder="Add reply"
              autoFocus={true}
              onChange={(e) => setReplyText(e.target.value)}
              value={replyText}
            />
            <button onClick={onSendreply}>Add reply</button>
          </div>
        )}
        {showEdit && (
          <div className={style.replyWrapper}>
            <input
              type="text"
              placeholder="Add reply"
              autoFocus={true}
              onChange={(e) => setEditText(e.target.value)}
              value={editText}
            />
            <button onClick={onEditReply}>Edit Comment</button>
          </div>
        )}
      </div>
      <div>
        {comment.replies?.map((replies, repliesIndex) => (
          <CommentText
            key={`${index}^${comment.timestamp}`}
            comment={replies}
            index={`${index}-${repliesIndex}`}
            deleteComment={deleteComment}
            editComment={editComment}
          />
        ))}
      </div>
    </div>
  );
};

const Comments: React.FC<ConnectedProps<typeof connector>> = ({
  addReply,
  allComments,
  deleteComment,
  editComment
}) => {
  return (
    <div className={style.commentsWrapper}>
      {allComments?.data?.map((comment, index) => (
        <CommentText
          key={`${index}-${comment.timestamp}`}
          comment={comment}
          index={`${index}`}
          deleteComment={deleteComment}
          editComment={editComment}
        />
      ))}
    </div>
  );
};

export default connector(Comments);
