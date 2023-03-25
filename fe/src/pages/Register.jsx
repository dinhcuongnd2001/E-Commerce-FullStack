import React, { useState } from "react";
import { useForm } from "react-hook-form";
import background from "../asset/img/bg-01.webp";
import { authAction } from "../auth/auth.action";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
function Register() {
  const [error, setError] = useState("");
  const [visibalePass, setVisibalePass] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data :: ", data);
    authAction()
      .register(data)
      .then((successfull) => {
        alert("Register Cuccessfull");
        navigate("/auth/login");
      })
      .catch((err) => {
        console.log("error :: ", err);
        setError(err);
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
          Register
        </p>

        {/* name */}

        <div className="flex  flex-wrap border-b-2 mb-5 pb-[2px] relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-slate-600  after:transition-all after:ease-linear hover:after:w-full after:duration-500">
          <span className="text-sm text-[#333] font-Popins leading-[1.5]">
            Username
          </span>
          <div className="w-full flex justify-start items-center h-[55px]">
            <AccountCircleIcon />
            <input
              {...register("name", {
                required: "This field is required",
                minLength: {
                  value: 4,
                  message: "The name has at least 4 character",
                },
              })}
              placeholder="Type Your Name"
              className="outline-none border-none text-base bg-transparent p-4 placeholder:font-Popins placeholder:font-semibold"
              type="text"
            />
          </div>
        </div>
        <div>
          {errors.name && (
            <span className="mb-2 text-red-600 block text-sm font-Popins tracking-wider">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* username */}

        <div className="flex  flex-wrap border-b-2 mb-5 pb-[2px] relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-slate-600  after:transition-all after:ease-linear hover:after:w-full after:duration-500">
          <span className="text-sm text-[#333] font-Popins leading-[1.5]">
            Username
          </span>
          <div className="w-full flex justify-start items-center h-[55px]">
            <PersonIcon />
            <input
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
            <span className="mb-2 text-red-600 block text-sm font-Popins tracking-wider">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* password */}

        <div className="flex flex-wrap border-b-2 mb-5 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-slate-600  after:transition-all after:ease-linear hover:after:w-full after:duration-500">
          <span className="text-sm text-[#333] font-Popins leading-[1.5]">
            Password
          </span>
          <div className="w-full flex justify-start items-center h-[55px]">
            <LockIcon></LockIcon>
            <input
              {...register("password", {
                required: "This field is required",
                pattern: {
                  value: /^(?=.*?[a-z])(?=.*[@$!%*#?&])(?=.*?[0-9]).{8,}$/,
                  message:
                    "Minimum eight characters, at least one letter, one number and one special character",
                },
              })}
              className="w-[85%] outline-none border-none text-base bg-transparent p-4 placeholder:font-Popins placeholder:font-semibold"
              placeholder="Type Your Password"
              type={visibalePass ? "text" : "password"}
            />
            <div
              className="cursor-pointer"
              onClick={() => setVisibalePass(!visibalePass)}
            >
              {visibalePass ? (
                <RemoveRedEyeOutlinedIcon></RemoveRedEyeOutlinedIcon>
              ) : (
                <VisibilityOffOutlinedIcon></VisibilityOffOutlinedIcon>
              )}
            </div>
          </div>
        </div>
        <div>
          {errors.password && (
            <span className="mb-2 text-red-600 block text-sm font-Popins tracking-wider">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="mt-20 cursor-pointer flex justify-center items-center rounded-[25px] bg-gradient-to-l from-[#00dbde] via-[#fc00ff] to-[#00dbde] bg-200% hover:bg-right transition-all ease-in-out duration-700">
          <button className="uppercase tracking-[2px] w-full p-4" type="submit">
            Register
          </button>
        </div>

        {error && (
          <div className="text-center mt-3 text-red-600">
            <p>{error}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default Register;
