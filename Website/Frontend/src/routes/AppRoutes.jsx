
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SchemeDetails from "../pages/SchemeDetails";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scheme/:slug" element={<SchemeDetails />}/>
        </Routes>
    );
};

export default AppRoutes;