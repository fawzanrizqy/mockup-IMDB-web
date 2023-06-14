import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { writeUsers } from "../actions/creator";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
// const baseUrl = "http://localhost:3000";
const baseUrl = "https://movies-ch1-api.ojan.dev";

export const FormUser = ({ typeForm }) => {
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const { userId, access_token, errMessage } = useSelector(
    (state) => state.user
  );
  const [flag, setFlag] = useState(0);

  const input = {
    email: useRef(),
    username: useRef(),
    password: useRef(),
    passwordrepeat: useRef(),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (typeForm === "register") {
        // check password validation
        if (
          input.password.current.value === input.passwordrepeat.current.value
        ) {
          dispatcher(
            writeUsers(
              `${baseUrl}/register`,
              {
                email: input.email.current.value,
                password: input.password.current.value,
                username: input.username.current.value,
              },
              "POST"
            )
          );
          setFlag(flag + 1);
          Swal.fire({
            width: 200,
            icon: "success",
            text: `New User Created Successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `password not match`,
          });
        }
      } else {
        let data = {
          email: input.email.current.value,
          password: input.password.current.value,
        };
        dispatcher(writeUsers(`${baseUrl}/login`, data, "POST"));
        setFlag(flag + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /////////////////check perubahan state di reducer user///////////////////
  useEffect(() => {
    if (access_token === null && flag !== 0) {
      console.log(errMessage);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${errMessage}`,
      });
    } else if (access_token !== null && flag !== 0) {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("id", userId);
      setFlag(0);
      Swal.fire({
        width: 200,
        icon: "success",
        text: `Login Success`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    }
  }, [access_token, userId, errMessage]);

  return (
    <>
      <form id="login-form" onSubmit={handleSubmit}>
        {typeForm === "register" ? (
          <></>
        ) : (
          <>
            <h5 className="h3 mb-3">Log in to your account</h5>
            <span>Log in on your profile to add new movies into database.</span>
          </>
        )}
        <div className="mb-3 mt-3">
          <div className="d-flex justify-content-between">
            <label>Email</label>
            <label className="text-danger text-end fw-bold">*</label>
          </div>
          <input
            ref={input.email}
            type="email"
            className="form-control"
            id="login-email"
            placeholder="Enter email address ..."
            required
          />
        </div>
        {typeForm === "register" ? (
          <>
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <label>Username</label>
                <label className="text-danger text-end fw-bold">*</label>
              </div>
              <input
                ref={input.username}
                type="text"
                className="form-control"
                placeholder="Enter your username ..."
                required
              />
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="mb-3">
          <div className="d-flex justify-content-between">
            <label>Password</label>
            <label className="text-danger text-end fw-bold">*</label>
          </div>
          <input
            ref={input.password}
            type="password"
            className="form-control"
            id="login-password"
            placeholder="Enter your password ..."
            required
          />
        </div>

        {typeForm === "register" ? (
          <>
            <div className="mb-4">
              <div className="d-flex justify-content-between">
                <label>Repeat Password</label>
                <label className="text-danger text-end fw-bold">*</label>
              </div>
              <input
                ref={input.passwordrepeat}
                type="password"
                className="form-control"
                id="login-password"
                placeholder="Repeat your password ..."
                required
              />
            </div>
          </>
        ) : (
          <></>
        )}

        <button
          className="btn btn-lg btn-primary rounded-pill w-100 p-2"
          type="submit"
        >
          Log In
        </button>
      </form>
    </>
  );
};
