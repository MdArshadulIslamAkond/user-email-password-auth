import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import auth from "../../firebase/firebase.confect";
// import { Result } from "postcss";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [success, setSuccess] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    //reset error & success message
    setLoginError("");
    setSuccess("");

    //add validation
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if (result.user.emailVerified) {
          setSuccess("User Login Successfully");
        } else {
          alert("Please verify your email");
          // send varification message
          sendEmailVerification(result.user).then(() => {
            alert("Please check your email and verify your account");
          });
        }
      })
      .catch((error) => {
        console.error(error);
        setLoginError(error.message);
      });
  };
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("Please provide email", emailRef.current.value);
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      console.log("please write a valid email address");
      return;
    }
    // send validation email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please check your Email");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h2 className="text-3xl">Please Login</h2>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleLogin}>
              {/* <div className="form-control">
                <label className="label">
                  <span className="label-text">User Name</span>
                </label>
                <input
                  type="text"
                  ref={emailRef}
                  placeholder="user name"
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div> */}
                <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  ref={emailRef}
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  className="input input-bordered relative"
                  required
                />
                <span onClick={()=>setShowPassword(!showPassword )} className="absolute text-3xl pe-10 pt-12 right-0">{showPassword ? <IoMdEyeOff /> : <IoEye /> }</span>

                <label className="label">
                  <a
                    onClick={handleForgetPassword}
                    href="#"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                </label>
               </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              {loginError && <p className="text-red-800">{loginError}</p>}
              {success && <p className="text-green-800">{success}</p>}
              <p>
                New to this website? Please <Link to="/register">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
