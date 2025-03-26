import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun, Activity } from "lucide-react";
import { Button } from "../ui";
import { RootState, themeSwitch } from "../../store";
import { Link } from "react-router-dom";
import { ThemeTypesEnum } from "../../Types";

export function Navbar() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.system.mode);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme =
      theme === ThemeTypesEnum.DARK
        ? ThemeTypesEnum.LIGHT
        : ThemeTypesEnum.DARK;
    dispatch(themeSwitch(newTheme));
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">TransformerIQ</span>
        </Link>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Sun className="h-5 w-5 transition-all" />
          ) : (
            <Moon className="h-5 w-5 transition-all" />
          )}
        </Button>
      </div>
    </header>
  );
}
