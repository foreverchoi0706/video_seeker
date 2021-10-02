import { useRouter } from "next/router";
/**@components */
import DarkModeToogle from "./DarkModeToogle";
import LaguageTooggle from "./LaguageTooggle";

interface LnbProps {
  type: string;
}

const Gnb = () => {
  const router = useRouter();

  return (
    <nav className="flex items-center py-3">
      <ul className="flex w-full text-white">
        <li className="text-center flex-1">
          <strong className="cursor-pointer" onClick={() => router.push("/")}>
            HOME
          </strong>
        </li>
        <li className="relative text-center flex-1">
          <strong
            id="movies"
            className="cursor-pointer"
            onClick={() => router.push("/movies?page=1")}
          >
            MOVIES
          </strong>
        </li>
        <li className="relative text-center flex-1">
          <strong
            id="tvShows"
            className="cursor-pointer"
            onClick={() => router.push("/tvShows?page=1")}
          >
            TV SHOWS
          </strong>
        </li>
        <li className="text-center flex-1">
          <strong
            className="cursor-pointer"
            onClick={() => router.push("/peoples/?page=1")}
          >
            PEOPLES
          </strong>
        </li>
        {/* <li className="flex items-center gap-3">
          <LaguageTooggle />
          <DarkModeToogle />
        </li> */}
      </ul>
    </nav>
  );
};

export default Gnb;
