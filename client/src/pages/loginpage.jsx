import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginuser } from "@/store/action/user";

const Loginpage = () => {
  //dispatch
  const dispatch = useDispatch();

  //LOGIN
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // LoginValidate
  const validatelogin = () => {
    var valid = true;
    var emailValidation = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    var emptydata = /\s+/;
    if (loginEmail === "" || emptydata.test(loginEmail)) {
      setEmailError("*Please enter EmailId");
      valid = false;
    } else if (!emailValidation.test(loginEmail)) {
      setEmailError("*Please enter a valid EamilId");
    } else if (loginEmail !== "") {
      setEmailError("");
    }
    if (loginPassword === "" || emptydata.test(loginPassword)) {
      setPasswordError("*Please enter your Password");
      valid = false;
    } else if (loginPassword !== "") {
      setPasswordError("");
    }
    return valid;
  };

  //HANDEL LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    if (validatelogin()) {
      dispatch(loginuser({ loginEmail, loginPassword }));
      setLoginEmail(""), setloginPassword("");
    }
  };

  return (
    <form className="flex flex-col px-[25px]" onSubmit={handleLogin}>
      <input
        placeholder="Please enter your emial..."
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
        className="border-[1px] rounded-[7px] px-[10px] py-[5px]"
      />
      {emailError && <div className="text-red-500">{emailError}</div>}
      <input
        placeholder="Please enter your password..."
        type="password"
        value={loginPassword}
        onChange={(e) => setloginPassword(e.target.value)}
        className="border-[1px] rounded-[7px] px-[10px] py-[5px] mt-[20px]"
      />
      {passwordError && <div className="text-red-500">{passwordError}</div>}
      <input
        type="Submit"
        value="Login"
        readOnly
        className="rounded-[7px] px-[10px] py-[5px] my-[20px] bg-buttonbg text-white"
      />
    </form>
  );
};

export default Loginpage;
