import Comment from "../Comment";

import "./CommentList.css";

const CommentList = ({ comments }) => {
    return (
        <div className="comment__list">
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default CommentList;
