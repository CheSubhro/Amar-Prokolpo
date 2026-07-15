
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SchemeDetails from "../pages/SchemeDetails";
import SavedSchemes from "../pages/SavedSchemes";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/scheme/:slug" element={<SchemeDetails />}/>
            <Route path="/saved-schemes" element={<SavedSchemes/>}/>
        </Routes>
    );
};

export default AppRoutes;