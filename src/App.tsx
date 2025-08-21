import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import StatusGrid from './components/StatusGrid';
import StatusViewer from './components/StatusViewer';
import StatusEditor from './components/StatusEditor';
import { setStatuses } from './store/slices/statusSlice';
import { mockStatuses } from './data/data';

const HomePage: React.FC = () => {
  useEffect(() => {
    // Load mock data
    store.dispatch(setStatuses(mockStatuses));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryFilter />
      <StatusGrid />
      <StatusViewer />
      <StatusEditor />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;