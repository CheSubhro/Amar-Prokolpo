
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './AppContent'; 
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from "sonner";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Toaster richColors closeButton />
                <AppContent />
            </Router>
        </Provider>
    );
}
export default App;