
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import CategorySchemes from "../pages/CategorySchemes";
import SchemeDetails from "../pages/SchemeDetails";
import SavedSchemes from "../pages/SavedSchemes";
import WishlistPage from "../pages/WishlistPage";
import SupportPage from "../pages/SupportPage";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import NotFound from '../pages/NotFound';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/category/:categoryId" element={<CategorySchemes />} />
            <Route path="/scheme/:slug" element={<SchemeDetails />}/>
            <Route path="/saved-schemes" element={<SavedSchemes/>}/>
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;