//custom
import Comment from "./Comment";
//third
//css
import "./CommentList.css";

const CommentList = ({ comments }) => {
    return (
        <div className="comment-list">
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default CommentList;
