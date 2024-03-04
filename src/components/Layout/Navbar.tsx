import React from "react";
import logo from "../../new-day-white-logo.svg";

type Props = {};
const Navbar = (props: Props) => {
  return (
    <div className="py-24 from-[#D796FE] to-[#8F8FF7] bg-gradient-to-r ">
      <div className="relative text-white border-b-2 border-white">
        <img
          src={logo}
          className="absolute left-[50%] -translate-x-[50%] bottom-0 translate-y-[55%]"
          alt="logo"
        />
      </div>
    </div>
  );
};

export default Navbar;
