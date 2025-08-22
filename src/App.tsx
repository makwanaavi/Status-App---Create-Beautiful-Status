import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./store/store";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import StatusGrid from "./components/StatusGrid";
import StatusViewer from "./components/StatusViewer";
import StatusEditor from "./components/StatusEditor";
import { setStatuses } from "./store/slices/statusSlice";
import { mockStatuses } from "./data/data";
import About from "./About";
import FAQ from "./FQA";
import Contact from "./Contact";
import LikedStatuses from "./pages/LikedStatuses";
import BookmarkedStatuses from "./pages/BookmarkedStatuses";

const HomePage: React.FC = () => {
  useEffect(() => {
    // Load mock data
    store.dispatch(setStatuses(mockStatuses));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
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
        <Header />
        <CategoryFilter />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/liked" element={<LikedStatuses />} />
          <Route path="/bookmarked" element={<BookmarkedStatuses />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
