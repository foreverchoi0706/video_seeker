import { FaBlogger, FaGithub } from "react-icons/fa";
import { GiHumanTarget } from "react-icons/gi";

const Links = () => {
  return (
    <ul className="flex justify-between w-full py-3  text-center text-white">
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
      <li className="cursor-pointer">
        <GiHumanTarget size={33} onClick={() => {}} />
      </li>
    </ul>
  );
};

export default Links;
