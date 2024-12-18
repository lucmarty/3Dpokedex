import { useState, useEffect } from "react";

const SwitchButton = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark"); 
      localStorage.setItem("theme", "dark"); 
    } else {
      document.body.classList.remove("dark"); 
      localStorage.setItem("theme", "light"); 
    }
  }, [isDarkMode]); 

  return (
    <label htmlFor="switch" className="flex cursor-pointer items-center">
      <input
        id="switch"
        type="checkbox"
        checked={isDarkMode}
        onChange={() => setIsDarkMode(!isDarkMode)}
        className="hidden"
      />
      <div className="relative">
        <div
          className={`flex h-6 w-12 items-center rounded-full p-1 transition-all duration-300 ${
            isDarkMode ? "bg-primary" : "bg-gray-300"
          }`}
        >
          <div
            className={`size-4 transform rounded-full bg-background shadow-md transition-all duration-300 ${
              isDarkMode ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </div>
      </div>

    </label>
  );
};

export default SwitchButton;
