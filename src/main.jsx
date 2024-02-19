import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@emotion/react';
import App from './App.jsx'
import { theme } from './assets/theme.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
)
