import { FaGoogle } from "react-icons/fa";
import { Button } from "flowbite-react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";

export const OAuth = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuthSubmit = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resFromGoogle = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resFromGoogle.user.displayName,
          email: resFromGoogle.user.email,
          photoUrl: resFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();
      console.log(data, "data");

      if (res.status === "Failure") {
        console.log("Failure");
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        console.log("Navigating to /");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <Button
        gradientDuoTone="purpleToPink"
        className="w-full"
        outline
        onClick={handleAuthSubmit}
      >
        <FaGoogle className="w-6 h-6 mr-2" />
        <span>Continue with Google</span>
      </Button>
    </div>
  );
};
