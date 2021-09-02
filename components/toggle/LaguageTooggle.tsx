import {
  LegacyRef,
  MouseEventHandler,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
  RefObject,
} from "react";

const LaguageTooggle = () => {
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
    <select className="h-5 rounded-xl">
      <optgroup>
        <option>A</option>
        <option>B</option>
        <option>C</option>
        <option>D</option>
      </optgroup>
    </select>
  );
};

export default LaguageTooggle;
