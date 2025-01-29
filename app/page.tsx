import Image from "next/image";
import { Profile } from "./user/components/Profile";

export default function Home() {
  return (
    <div className="">
      <main className="flex justify-center items-center min-h-screen px-4">
        <Profile />
      </main>
    </div>
  );
}
