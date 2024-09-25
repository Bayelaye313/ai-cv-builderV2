import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";

function Header() {
  const { isSignedIn } = useUser(); // Destructure to make it clear

  return (
    <header className="p-4 px-6 flex justify-between items-center shadow-md bg-white">
      {/* Branding Section */}
      <div className="flex items-center">
        <Link to="/">
          <img
            loading="lazy"
            src="/images/logo.jpg"
            alt="EASE Logo"
            width={80}
            height={80}
            className="hover:opacity-90 transition-opacity duration-300"
          />
        </Link>
        <p className="ml-2 text-2xl font-bold animate-slidein">EASE</p>
      </div>

      {/* User Interaction Section */}
      <nav>
        {isSignedIn ? (
          <div className="flex items-center gap-2">
            <Link to="/dashboard" aria-label="Dashboard">
              <Button variant="outline" className="hover:bg-sky-700">
                Dashboard
              </Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <Link to="/auth/signIn" aria-label="Login">
            <Button>Login</Button>
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
