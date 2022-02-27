import { memo } from "react";
import { FaBlogger, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="p-0 lg:p-x15vw">
      <ul className="flex justify-around w-full p-3 text-center">
        <li className="cursor-pointer">
          <FaGithub
            size={33}
            onClick={() => window.open("https://github.com/foreverchoi0706")}
          />
        </li>
        <li className="cursor-pointer">
          <FaBlogger
            size={33}
            onClick={() => window.open("https://velog.io/@foreverchoi0706")}
          />
        </li>
      </ul>
    </footer>
  );
};

export default memo(Footer);
