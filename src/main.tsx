import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { testFirestoreConnection } from './services/firebase';

// Test connection on boot per Firebase guidelines
testFirestoreConnection().catch(() => {});

createRoot(document.getElementById('root')!).render(<App />);

