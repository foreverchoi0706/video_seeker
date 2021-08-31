import { FaBlogger, FaGithub } from "react-icons/fa";
import { GiHumanTarget } from "react-icons/gi";

const Links = () => {
  return (
    <ul className="flex justify-around text-center">
      <li className="cursor-pointer">
        <FaGithub size={33} onClick={() => (window.location.href = "")} />
      </li>
      <li className="cursor-pointer">
        <FaBlogger size={33} onClick={() => (window.location.href = "")} />
      </li>
      <li className="cursor-pointer">
        <GiHumanTarget size={33} onClick={() => (window.location.href = "")} />
      </li>
    </ul>
  );
};

export default Links;
