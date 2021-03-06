import { useState } from "react";
//custom
import IconButton from "../../components/IconButton";
import CommentSection from "../Comment/CommentSection";
import { useUser } from "../../context/UserContext";
//third
import { Link } from "react-router-dom";
import { FaCommentAlt } from "react-icons/fa";
//css
import "./TodoFooter.css";

const TodoFooter = ({ todo }) => {
    const [toggleCommentSection, setToggleCommentSection] = useState(false);
    const { getUserById } = useUser();

    const commentSectionHandler = () =>
        setToggleCommentSection((prevState) => !prevState);

    const user = getUserById(todo.participant);

    const formattedUsername = user?.username.slice(0, 2).toUpperCase();

    return (
        <>
            <div className={`todo-footer`}>
                <div className="todo-footer__username__container">
                    <Link
                        to={`/profile/${user?.id}`}
                        className="todo-footer__username"
                    >
                        {formattedUsername}
                    </Link>
                </div>
                <IconButton
                    onClick={commentSectionHandler}
                    Icon={FaCommentAlt}
                    variant="gray"
                    className="text-md"
                />
            </div>
            {toggleCommentSection ? <CommentSection todoId={todo.id} /> : null}
        </>
    );
};

export default TodoFooter;
