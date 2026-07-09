
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Router>
            <MainLayout>
                <Routes>
                <Route path="/" element={
                    <h1 className="text-2xl font-bold">Welcome to CheSubhro's App</h1>
                } />
                
                <Route path="*" element={<NotFound />} />
                </Routes>
            </MainLayout>
        </Router>
    );
}

export default App;