import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/usersSlice";
import Input from "../Input";
import Button from "../Button";
import Alert from "../Alert";
import styles from "./UserInput.module.css";

const UserInput = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const [warningMessage, setWarningMessage] = useState("");

  const buttonHandler = () => {
    if (input === "") {
      setWarningMessage("User field can not be empty!");
      return;
    }
    dispatch(addUser(input));
    setInput("");
    setWarningMessage("");
  };

  const keyHandler = (e) => e.key === "Enter" && buttonHandler();
  return (
    <div>
      <div className={styles["user--input"]}>
        <Input
          className="col-span-3"
          type="text"
          placeholder="User"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={keyHandler}
        />
        <Button onClick={buttonHandler} variant="primary">
          Add
        </Button>
      </div>
      {warningMessage && (
        <Alert message={warningMessage} variant="danger" className="mt-1" />
      )}
    </div>
  );
};

export default UserInput;