import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import auth from "../firebase/firebase.confect";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accpeted = e.target.terms.checked;
    // console.log(email, password);

    // Reset Error
    setRegisterError("");

    // Reset Success
    setSuccess("");

    // if (password.length < 6) {
    //   setRegisterError("Password should be at least 6 characters or longer");
    //   return;
    // }else
     if (!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)){
setRegisterError("Your password shouldhave at least min 8 letter password, with at least a symbol, upper and lower case letters and a number");
return;
    }else if(!accpeted){
        setRegisterError("Please accept our terms and conditions");
        return;
    }


    // Creat User
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("User Created Successfully");

        // update the user profile
        updateProfile(result.user, {displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"})
        .then(()=>{
            console.log("User profile updated");
        })
        .catch((error) => {
            console.log(error);
            // setRegisterError(error.message);
        })  

        // send varification message
        sendEmailVerification(result.user)
        .then(()=>{
            alert("Please check your email and verify your account");
        })
      })
      .catch((err) => {
        console.error(err);
        setRegisterError(err.message);
      });
  };
  return (
    <div className="">
      <div className="mx-auto md:w-1/2">
        <h2 className="text-3xl">Please Register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="bg-slate-200 mb-4 w-3/4 px-2 py-4"
            type="text"
            name="name"
            placeholder="User name"
            id=""
            required
          />{" "}
          <br />
          <br />
          <input
            className="bg-slate-200 mb-4 w-3/4 px-2 py-4"
            type="email"
            name="email"
            placeholder="Email address"
            id=""
            required
          />{" "}
          <br />
          <br />
         <div className="relative border w-3/4 mb-0">
         <input
            className="bg-slate-200 w-full px-2 py-4"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            id=""
            required
          />
          <span onClick={()=>setShowPassword(!showPassword )} className="absolute text-3xl pe-4 top-1/4 right-0">{showPassword ? <IoMdEyeOff /> : <IoEye /> }</span>
         </div>
          <br />
          <br />
          <input type="checkbox" name="terms" id="terms" />
          <label className="ml-2" htmlFor="terms">Accept our terms and condition </label>
          <br /><br />
          <input
            className="mb-4 w-3/4 btn btn-secondary px-2 py-4"
            type="submit"
            value="Register"
          />
          <p>
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </form>
        {registerError && <p className="text-red-800">{registerError}</p>}
        {success && <p className="text-green-800">{success}</p>}
      </div>
    </div>
  );
};

export default Register;
