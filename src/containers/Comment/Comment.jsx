//custom
import { FindUserById } from "../../selectors";
//third
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
//css
import "./Comment.css";

const Comment = ({ comment }) => {
    const user = FindUserById(comment.userId);

    return (
        <div className="comment">
            <Link to={`/profile/${user?.id}`}>
                <div className="comment__profile">
                    <FaUserAlt className="comment__profile__icon" />
                    <span>{user?.username}</span>
                </div>
            </Link>
            <div className="comment__text">{comment.text}</div>
        </div>
    );
};

export default Comment;
