import { useEffect, useState } from "react";
import "./App.css";
import {ThemeProvider} from "./context/themeContext";
import ThemeBtn from "./components/ThemeBtn";
import Card from "./components/Card";

function App() {
  const [themeMode, setThemeMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode === "dark" || savedMode === "light" ? savedMode : "light";
  });

  const lightTheme = () => {
    setThemeMode("light");
  };

  const darkTheme = () => {
    setThemeMode("dark");
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(themeMode);
    root.style.colorScheme = themeMode;
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  return (
    <>
      <h1>React Context API In PROD</h1>
      <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
        <div className="flex flex-wrap min-h-screen items-center">
          <div className="w-full">
            <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
              <ThemeBtn />
            </div>

            <div className="w-full max-w-sm mx-auto">
              <Card />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
