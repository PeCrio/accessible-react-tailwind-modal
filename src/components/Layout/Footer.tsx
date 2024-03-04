import React from "react";
import logo from "../../new-day-white-logo.svg";
import { developerEmail, developerWebsite } from "../../utils/constants";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="py-12 text-white bg-black">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
          <img src={logo} alt="logo" className="w-24 md:w-40" />
          <div>
            <h1 className="text-2xl font-bold">Contact Developer</h1>
            <div className="flex flex-col mt-2 space-y-1">
              <a className="hover:underline" href={`mailto:${developerEmail}`}>
                Send a message
              </a>
              <a
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                href={developerWebsite}
              >
                Website
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between pt-6 mt-12 space-y-2 text-sm text-center border-t border-gray-500 md:space-y-0 md:flex-row md:text-base md:text-left">
          <div>
            <p className="text-white">
              © 2024{" "}
              <a
                href={developerWebsite}
                className="font-bold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Precious OSSAI
              </a>
            </p>
          </div>
          <i>Disclaimer: This is a demo site and not a real business.</i>
        </div>
      </div>
    </div>
  );
};

export default Footer;
