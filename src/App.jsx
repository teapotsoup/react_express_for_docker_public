import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { SetRoute } from 'seed-ui';
import './index.scss';
import Index from "./Index.jsx";
import {DepthMenuList} from "./assets/DepthMenuList.jsx";

function App() {

    return (
        <Router basename="/">
            <Routes>
                <Route path="/" element={<Index />}>
                    {SetRoute(DepthMenuList, 1)}
                </Route>
                {/*<Route path="*" element={<Error />} />*/}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
