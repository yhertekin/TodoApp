import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../redux/usersSlice";
import Input from "../Input";
import Button from "../Button";
import Alert from "../Alert";

import "./UserLogin.css";

const UserLogin = () => {
    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [warningMessage, setWarningMessage] = useState("");

    const loggedInUser = useSelector((state) => state.users.loggedInUser);
    const isLoggedIn = loggedInUser && Object.keys(loggedInUser).length !== 0;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const notInitialRender = useRef(false);
    useEffect(() => {
        if (notInitialRender.current) {
            setWarningMessage("");
            navigate("/");
        } else {
            notInitialRender.current = true;
        }
    }, [isLoggedIn]);

    const onChangeHandler = (e) => {
        setLoginForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmitHandler = () => {
        if (
            Object.keys(loginForm).find((key) => loginForm[key] === "")
                ?.length > 0
        ) {
            setWarningMessage("Please fill in all fields");
            return;
        }

        dispatch(loginUser(loginForm));
        setWarningMessage(
            "Failed to login! Password or email address is wrong!"
        );
    };

    return (
        <div className="login__form">
            {warningMessage && (
                <Alert message={warningMessage} variant="danger" />
            )}
            <Input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={onChangeHandler}
                placeholder="Email"
            />
            <Input
                name="password"
                type="password"
                value={loginForm.password}
                onChange={onChangeHandler}
                placeholder="Password"
            />
            <Button onClick={onSubmitHandler}>Login</Button>
        </div>
    );
};

export default UserLogin;
