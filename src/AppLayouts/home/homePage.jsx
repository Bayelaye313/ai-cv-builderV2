import Header from "@/components/customs/header";
import BodyPage from "@/components/customs/BodyPage";
import { UserButton } from "@clerk/clerk-react";

function HomePage() {
  return (
    <div>
      <Header />
      <BodyPage />
    </div>
  );
}

export default HomePage;
