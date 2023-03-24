import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import background from "../asset/img/bg-01.webp";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import { authAction } from "../auth/auth.action";
function LoginComponent() {
  console.log("re-render");
  const RefEmail = useRef();
  const RefPassword = useRef();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    authAction()
      .login(data)
      .then((result) => {
        console.log(result);
        // navigate
      })
      .catch((e) => {
        setError(e);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="w-full h-full flex justify-center items-center p-4"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] rounded-[10px] bg-black h-[90%] sm:px-[55px] sm:pt-[65px] sm:pb-[54px]"
      >
        <p className="font-Popins font-bold text-[39px] text-[#333] leading-[1.2] text-center pb-[49px]">
          Login
        </p>

        <div className="flex  flex-wrap border-b-2 mb-5 pb-[2px] relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-slate-600  after:transition-all after:ease-linear hover:after:w-full after:duration-500">
          <span className="text-sm text-[#333] font-Popins leading-[1.5]">
            Username
          </span>
          <div className="w-full flex justify-start items-center h-[55px]">
            <PersonIcon />
            <input
              ref={RefEmail}
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Must be an Email",
                },
              })}
              placeholder="Type Your Email"
              className="outline-none border-none text-base bg-transparent p-4 placeholder:font-Popins placeholder:font-semibold"
              type="text"
            />
          </div>
        </div>
        <div>
          {errors.email && (
            <span className="block text-sm font-Popins tracking-wider">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-wrap border-b-2 mb-5 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-slate-600  after:transition-all after:ease-linear hover:after:w-full after:duration-500">
          <span className="text-sm text-[#333] font-Popins leading-[1.5]">
            Password
          </span>
          <div className="w-full flex justify-start items-center h-[55px]">
            <LockIcon></LockIcon>
            <input
              ref={RefPassword}
              {...register("password", {
                required: "This field is required",
                pattern: {
                  value: /^(?=.*?[a-z])(?=.*[@$!%*#?&])(?=.*?[0-9]).{8,}$/,
                  message:
                    "Minimum eight characters, at least one letter, one number and one special character",
                },
              })}
              className="outline-none border-none text-base bg-transparent p-4 placeholder:font-Popins placeholder:font-semibold"
              placeholder="Type Your Password"
              type="password"
            />
          </div>
        </div>
        <div>
          {errors.password && (
            <span className="block text-sm font-Popins tracking-wider">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="text-right pt-2 pb-8 w-full font-Popins">
          Forgot password ?
        </div>

        <div className="cursor-pointer flex justify-center items-center rounded-[25px] bg-gradient-to-l from-[#00dbde] via-[#fc00ff] to-[#00dbde] bg-200% hover:bg-right transition-all ease-in-out duration-700">
          <button className="uppercase tracking-[2px] w-full p-4" type="submit">
            Login
          </button>
        </div>

        {error && (
          <div className="text-center mt-3 text-red-600">
            <p>{error}</p>
          </div>
        )}

        <div className="pt-[54px] pb-[20px] text-center">
          <p className="text-sm text-[#666666] font-Popins">Or Sign Up Using</p>
        </div>
        <div className="flex justify-center items-center">
          <div className="m-2 cursor-pointer">
            <FacebookIcon className="w-10 h-10 text-white"></FacebookIcon>
          </div>
          <div className="m-2 cursor-pointer">
            <TwitterIcon className="w-10 h-10 text-white"></TwitterIcon>
          </div>
          <div className="m-2 cursor-pointer">
            <GoogleIcon className="w-10 h-10 text-white"></GoogleIcon>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginComponent;
