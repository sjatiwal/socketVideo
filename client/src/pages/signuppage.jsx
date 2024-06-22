import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registeruser } from "@/store/action/user";
const Signuppage = () => {
  //dispatch
  const dispatch = useDispatch();

  //REGISTER
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhoneNo, setRegisterPhoneNo] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerNameError, setRegisterNameError] = useState("");
  const [registerEmailError, setRegisterEmailError] = useState("");
  const [registerPhoneNoError, setRegisterPhoneNoError] = useState("");
  const [registerPasswordError, setRegisterPasswordError] = useState("");

  //Register Validate
  const validateRegister = () => {
    var valid = true;
    var emailValidation = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    var phonenoValidation = /^\d{10,}$/;
    var emptydata = /\s+/;

    if (registerName === "" || emptydata.test(registerName)) {
      setRegisterNameError("*Please enter yours Name");
      valid = false;
    } else if (registerName !== "") {
      setRegisterNameError("");
    }

    if (registerEmail === "" || emptydata.test(registerEmail)) {
      setRegisterEmailError("*Please enter your Email");
      valid = false;
    } else if (!emailValidation.test(registerEmail)) {
      setRegisterEmailError(
        "*Please enter a valid email @gmail.com or @yahoo.com"
      );
      valid = false;
    } else if (registerEmail !== "") {
      setRegisterEmailError("");
    }

    if (registerPhoneNo === "" || emptydata.test(registerPhoneNo)) {
      setRegisterPhoneNoError("*Please enter your PhoneNo.");
      valid = false;
    } else if (!phonenoValidation.test(registerPhoneNo)) {
      setRegisterPhoneNoError("*Please enter a Valid PhoneNo");
      valid = false;
    } else if (registerPhoneNo.length !== 10) {
      setRegisterPhoneNoError("*Please enter a valid PhoneNo");
    } else if (registerPhoneNo !== "") {
      setRegisterPhoneNoError("");
    }

    if (registerPassword === "" || emptydata.test(registerPassword)) {
      setRegisterPasswordError("*Please Enter your Password");
      valid = false;
    } else if (registerPassword !== "") {
      setRegisterPasswordError("");
    }

    return valid;
  };

  // HANDLE REGISTER
  const handleSignup = (e) => {
    e.preventDefault();
    if (validateRegister()) {
      dispatch(
        registeruser({
          registerName,
          registerEmail,
          registerPassword,
          registerPhoneNo,
        })
      );

      setRegisterEmail(""),
        setRegisterName(""),
        setRegisterPassword(""),
        setRegisterPhoneNo("");
    }
  };

  return (
    <form className="flex flex-col px-[25px]" onSubmit={handleSignup}>
      <input
        placeholder="Please enter your name..."
        value={registerName}
        onChange={(e) => setRegisterName(e.target.value)}
        className="border-[1px] rounded-[7px] px-[10px] py-[5px]"
      />
      {registerNameError && (
        <div className="text-red-500">{registerNameError}</div>
      )}
      <input
        placeholder="Please enter your email..."
        value={registerEmail}
        onChange={(e) => setRegisterEmail(e.target.value)}
        className="border-[1px] rounded-[7px] px-[10px] py-[5px] mt-[20px]"
      />
      {registerEmailError && (
        <div className="text-red-500">{registerEmailError}</div>
      )}
      <input
        placeholder="Please enter your phoneNo..."
        type="number"
        value={registerPhoneNo}
        onChange={(e) => setRegisterPhoneNo(e.target.value)}
        className="border-[1px] rounded-[7px] px-[10px] py-[5px] mt-[20px]"
      />
      {registerPhoneNoError && (
        <div className="text-red-500">{registerPhoneNoError}</div>
      )}
      <input
        placeholder="Please enter your password..."
        type="password"
        value={registerPassword}
        onChange={(e) => setRegisterPassword(e.target.value)}
        className="border-[1px] rounded-[7px] px-[10px] py-[5px] mt-[20px]"
      />
      {registerPasswordError && (
        <div className="text-red-500">{registerPasswordError}</div>
      )}
      <input
        type="Submit"
        value="Register"
        readOnly
        className="rounded-[7px] px-[10px] py-[5px] my-[20px] bg-buttonbg text-white"
      />
    </form>
  );
};

export default Signuppage;
