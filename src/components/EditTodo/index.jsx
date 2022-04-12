import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTodo } from "../../redux/todosSlice";

import styles from "./EditTodo.module.css";
import Input from "../Input";
import Dropdown from "../Dropdown";
import Button from "../Button";
import Alert from "../Alert";

const EditTodo = ({ todo, className, setEdit }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(todo.task);
  const [dropdownValue, setDropdownValue] = useState(todo.userId);
  const users = useSelector((state) => state.users.items);
  const [warningMessage, setWarningMessage] = useState("");

  const buttonHandler = () => {
    if (!inputValue) {
      setWarningMessage("Please provide a task!");
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
    setEdit((prevState) => !prevState);
  };

  return (
    <div className={`${styles.edit} ${className ?? ""}`}>
      {warningMessage && (
        <Alert
          message={warningMessage}
          variant="danger"
          className="w-full mb-1"
        />
      )}
      <Input
        value={inputValue}
        setValue={setInputValue}
        placeholder="Edit todo"
      />
      <Dropdown
        placeholder="Select a user"
        value={dropdownValue}
        setDropdownValue={setDropdownValue}
        items={users.map((user) => ({ key: user.id, value: user.username }))}
      />
      <Button children="Edit" onClick={buttonHandler} />
    </div>
  );
};

export default EditTodo;