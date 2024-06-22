import React, { useState } from "react";
import Loginpage from "./loginpage";
import Signuppage from "./signuppage";
const Loginsignup = () => {
  const [loginSignupTab, setLoginSignUpTab] = useState("Login");
  return (
    <div className="flex flex-col items-center h-[100vh] bg-[#5fb8cf]">
      <div className="bg-white mt-[150px] w-[450px]">
        <div className="flex justify-around my-[10px]">
          <button
            onClick={() => setLoginSignUpTab("Login")}
            className={`${
              loginSignupTab === "Login" && "text-[#1d753f]"
            } font-[600] text-[18px]`}
          >
            Login
          </button>
          <button
            onClick={() => setLoginSignUpTab("Register")}
            className={`${
              loginSignupTab === "Register" && "text-[#1d753f]"
            } font-[600] text-[18px]`}
          >
            Register
          </button>
        </div>
        {loginSignupTab === "Login" && <Loginpage />}
        {loginSignupTab === "Register" && <Signuppage />}
      </div>
    </div>
  );
};

export default Loginsignup;
