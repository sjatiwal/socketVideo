import React from "react";
import Link from "next/link";
import { logout } from "@/store/action/user";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <div className="bg-customBlack text-white flex justify-around py-4">
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        <Link href="/video">Video</Link>
      </div>
      <div>User</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
