
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './AppContent'; 
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <AppContent />
            </Router>
        </Provider>
    );
}
export default App;