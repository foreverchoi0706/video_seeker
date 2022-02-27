import { FC, memo } from "react";
import Link from "next/link";

const Header: FC = () => {
  console.log("HEADER");

  return (
    <header className="p-0">
      <nav className="flex items-center py-3">
        <ul className="flex w-full">
          <li className="text-center flex-1">
            <Link href="/">HOME</Link>
          </li>
          <li className="text-center flex-1">
            <Link href="/movies?page=1">MOVIES</Link>
          </li>
          <li className="text-center flex-1">
            <Link href="/tvShows?page=1"> TV SHOWS</Link>
          </li>
          <li className="text-center flex-1">
            <Link href="/peoples/?page=">PEOPLES</Link>
          </li>
          {/* <li className="flex items-center gap-3">
          <LaguageTooggle />
          <DarkModeToogle />
        </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default memo(Header);
