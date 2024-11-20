import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import { OAuth } from "../components/OAuth.jsx";

export const SignIn = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { loading, error: errMessage } = user;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      // console.log("Form validation failed: fields are empty.");
      return dispatch(signInFailure("All Fields are required"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      // console.log(data);

      if (data.status == "Failure") {
        return dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        navigate("/");
        return dispatch(signInSuccess(data));
      }
    } catch (error) {
      return dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-2 mx-auto md:gap-8 px-24 py-20 md:py-0 justify-center md:items-center ">
      {/* left side */}
      <div className="flex-1 flex flex-col gap-3 md:justify-center md:max-w-96">
        <Link className="whitespace-nowrap text-3xl font-bold dark:text-white">
          <span className="px-2 py-1 text-4xl text-white bg-gradient-to-r from-indigo-800 via-violet-900 to-orange-500 rounded-xl">
            Prasad's
          </span>
          Blog
        </Link>
        <p className="text-sm">
          Welcome to my Blog, You can find all the useful content here and you
          will enjoy reading and the content is very knowledgeful and
          entertaining
        </p>
      </div>

      <div className="flex-1 md:max-w-96">
        <form onSubmit={handleSubmit}>
          <div>
            <Label>Your Email</Label>
            <TextInput
              type="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
            ></TextInput>
          </div>
          <div>
            <Label>Your Password</Label>
            <TextInput
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            ></TextInput>
          </div>
          <Button
            className="my-2 w-[100%]"
            gradientDuoTone="purpleToPink"
            type="submit"
          >
            {loading ? (
              <>
                <Spinner size="lg" />
                <span className="px-2">Loading...</span>
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          <OAuth />
        </form>
        <div className="flex gap-2">
          <span>Don't have an Account?</span>
          <Link to="/sign-up" className="text-blue-900">
            Sign Up
          </Link>
        </div>
        {errMessage ? <Alert color="failure">{errMessage}</Alert> : null}
      </div>
    </div>
  );
};
