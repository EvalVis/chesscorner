import { Link } from "react-router";
import { LanguageToggle } from "./LanguageToggle";

interface HeaderProps {
  showNavigation?: boolean;
}

export function Header({ showNavigation = false }: HeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 p-4">
      <div className="flex justify-between items-center">
        {showNavigation ? (
          <Link
            to="/"
            className="px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 hover:text-gray-900 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            ← Back to Home
          </Link>
        ) : (
          <div></div>
        )}
        <LanguageToggle />
      </div>
    </header>
  );
}
