import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@emotion/react';
import { LicenseManager } from 'ag-grid-enterprise';
import { Diagram } from 'gojs';
import App from './App.jsx'
import { theme } from './assets/theme.jsx';
import 'ag-grid-enterprise/styles/ag-grid.css';
import 'ag-grid-enterprise/styles/ag-theme-alpine.css';

LicenseManager.setLicenseKey(import.meta.env.VITE_LICENSE_MANAGER_KEY);

Diagram.licenseKey =import.meta.env.VITE_DIAGRAM_LICENSE_KEY

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
)
