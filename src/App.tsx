import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Index from './pages/index';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import BlogAnalyticsDashboard from './components/BlogAnalyticsDashboard';
import NotFound from './pages/NotFound';

function App() {
  // Debug routing
  useEffect(() => {
    console.log('App component mounted');
    console.log('Current location:', window.location.pathname);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/analytics" element={<BlogAnalyticsDashboard />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
