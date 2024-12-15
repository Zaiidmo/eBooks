import { useState } from "react";
import vlphaLogo from "/vlpha.png";
import "../App.css";
function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex h-screen w-screen justify-center flex-col items-center">
        <a href="https://www.vlpha.tech" target="_blank">
          <img
            src={vlphaLogo}
            className="w-64 bg-black dark:bg-transparent rounded-full animate-logo-spin"
            alt="Vlpha logo"
          />
        </a>
        <div className="card">
          <button
            className="text-white bg-black p-3 px-4 mt-4 rounded-xl"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </button>
        </div>
      </div>
    </>
  );
}
export default Home;
