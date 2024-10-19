import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './main.css';

// `root` is guaranteed by `index.html` (if it's not there, we have bigger issues!)
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
