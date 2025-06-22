import { useCounter } from "./hooks/useCounter";

function App() {
    const { count, increment } = useCounter();

    return (
        <>
            <h1>Hello Vite + React + TypeScript!</h1>
            <button type="button" onClick={increment}>
                Count is: {count}
            </button>
        </>
    );
}

export default App;
