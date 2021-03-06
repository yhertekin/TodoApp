import { useState } from "react";
//custom
import Input from "../../components/Input";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import IconButton from "../../components/IconButton";
import Modal from "../../components/Modal";
import DialogBox from "../../components/Modal/DialogBox";
import LabelPicker from "../Label/LabelPicker";
import { formatDate } from "../../functions";
import { editTodo, removeTodo } from "../../redux/todosSlice";
import { FindUserById, GetAllUsers, GetLoggedInUser } from "../../selectors";
//third
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaEdit, FaTrashAlt } from "react-icons/fa";
//css
import "./TodoEditForm.css";

const TodoEditForm = ({ todo }) => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState(todo.task);
    const [dropdownValue, setDropdownValue] = useState(todo.userId);
    const [warningMessage, setWarningMessage] = useState("");
    const [showTodoRemoveAlert, setShowTodoRemoveAlert] = useState(false);

    const users = GetAllUsers();
    // const user = useMemo(() => FindUserById(todo.userId), [users, todo]);
    const user = FindUserById(todo.userId);
    console.log(user);
    const loggedInUser = GetLoggedInUser();

    const dropdownChangeHandler = (e) => setDropdownValue(e.target.value);
    const inputChangeHandler = (e) => setInputValue(e.target.value);
    const buttonHandler = () => {
        if (todo.status !== "review") {
            setWarningMessage("Status must be review");
            return;
        }
        if (!inputValue) {
            setWarningMessage("Input field can not be empty!");
            return;
        }
        if (!dropdownValue) {
            setWarningMessage("Please select a user!");
            return;
        }
        dispatch(
            editTodo({
                id: todo.id,
                task: inputValue,
                userId: dropdownValue,
            })
        );
        setWarningMessage("");
    };

    const dropdownItems = users.map((user) => ({
        key: user.id,
        value: user.username,
    }));

    const TrashIcon = () => (
        <IconButton
            Icon={FaTrashAlt}
            onClick={() => setShowTodoRemoveAlert(true)}
        />
    );

    return (
        <div className="todo-edit-form">
            <div className="todo-edit-form__content">
                <div className="flex flex-col justify-center items-start">
                    <div className="flex justify-start items-center mr-10">
                        <FaUser className="mr-1" /> Task for
                        <Link
                            to={`/profile/${user?.id}`}
                            className="font-bold ml-1"
                        >
                            {user?.username}
                        </Link>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex justify-center items-center opacity-50">
                            <FaCalendarAlt className="mr-1" />
                            Created at {formatDate(todo.createdAt)}
                        </div>

                        <div className="ml-5">
                            {todo.status === "review" &&
                            loggedInUser?.userType === "admin" ? (
                                <>
                                    <TrashIcon />
                                    {showTodoRemoveAlert && (
                                        <Modal
                                            showModal={setShowTodoRemoveAlert}
                                        >
                                            <DialogBox
                                                text={`Are you sure to remove ${todo.task}?`}
                                                setCancelButton={
                                                    setShowTodoRemoveAlert
                                                }
                                                setConfirmButton={() =>
                                                    dispatch(
                                                        removeTodo(todo.id)
                                                    )
                                                }
                                            />
                                        </Modal>
                                    )}
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="grid gap-1 mt-1">
                    {warningMessage && (
                        <Alert message={warningMessage} variant="danger" />
                    )}
                    <LabelPicker todo={todo} />

                    <Input
                        value={inputValue}
                        onChange={inputChangeHandler}
                        placeholder="Edit todo"
                    />
                    <Dropdown
                        placeholder="Select a user"
                        value={dropdownValue}
                        onChange={dropdownChangeHandler}
                        items={dropdownItems}
                    />
                    <Button
                        variant="primary"
                        onClick={buttonHandler}
                        className="flex justify-center items-center "
                    >
                        <FaEdit className="mr-1" />
                        Edit
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TodoEditForm;
