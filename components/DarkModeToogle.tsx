import {
  LegacyRef,
  MouseEventHandler,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
  RefObject
} from "react";

const DarkModeToogle = () => {
  const refToggle = useRef<HTMLDivElement>(null);

  const [darkMode, setDarkMode] = useState<Boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.querySelector("html")?.classList.add("dark");
      refToggle.current?.classList.add("toggled");
      
    } else {
      document.querySelector("html")?.classList.remove("dark");
      refToggle.current?.classList.remove("toggled");
    }
  }, [darkMode]);

  const toggle = (e: any) => {
    setDarkMode((darkMode) => !darkMode);
  };

  return (
    <div className="w-12 bg-white rounded-xl">
      <div
        ref={refToggle}
        className="bg-green-300 h-5 w-1/2 rounded-xl cursor-pointer"
        onClick={toggle}
      />
    </div>
  );
};

export default DarkModeToogle;
