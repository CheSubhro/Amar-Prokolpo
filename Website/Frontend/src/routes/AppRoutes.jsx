
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import SchemeDetails from "../pages/SchemeDetails";
import SavedSchemes from "../pages/SavedSchemes";
import WishlistPage from "../pages/WishlistPage";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/scheme/:slug" element={<SchemeDetails />}/>
            <Route path="/saved-schemes" element={<SavedSchemes/>}/>
            <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
    );
};

export default AppRoutes;