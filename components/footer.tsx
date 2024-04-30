import React from "react";
import Socials from "./socials";

const Footer = () => {
  return (
    <div className="relative bottom-0 w-full sm:absolute">
      <div className="flex flex-row items-center justify-center gap-4 py-2 px-4">
        <Socials />
      </div>
    </div>
  );
};

export default Footer;
