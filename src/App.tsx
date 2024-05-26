import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>markwiemer.com</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
        <p>
          Hello, world! If you're reading this, it's because you're a cool
          person. There isn't much here yet, just wanted to show you my little
          corner of the internet. I'll let you know when there's more to see 😊
        </p>
        <p>
          <a href="https://github.com/mark-wiemer/mark-wiemer-com">
            View on GitHub
          </a>
        </p>
        <p>
          Built with <a href="https://bun.sh">Bun</a>
        </p>
        <p>
          "Smiling face with sunglasses" graphic{" "}
          <a href="https://favicon.io/emoji-favicons/smiling-face-with-sunglasses">
            copyright 2020 X Corp.
          </a>
          , licensed under{" "}
          <a href="https://creativecommons.org/licenses/by/4.0">CC-BY 4.0</a>
        </p>
      </div>
    </>
  );
}

export default App;
