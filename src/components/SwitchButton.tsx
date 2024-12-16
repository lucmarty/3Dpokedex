import { useState, useEffect } from "react";

const SwitchButton = () => {
  // Récupérer l'état du thème depuis le localStorage ou utiliser un thème par défaut
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark"; // Vérifier si un thème est déjà sauvegardé
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
    <label htmlFor="switch" className="flex items-center cursor-pointer">
      <input
        id="switch"
        type="checkbox"
        checked={isDarkMode}
        onChange={() => setIsDarkMode(!isDarkMode)} // Inverser l'état du mode sombre
        className="hidden"
      />
      <div className="relative">
        <div
          className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${
            isDarkMode ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-300 ${
              isDarkMode ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </div>
      </div>

    </label>
  );
};

export default SwitchButton;
