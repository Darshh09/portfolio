import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import ProjectDetail from './pages/ProjectDetail';
import ProjectsShowcase from './pages/ProjectsShowcase';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import BlogAnalyticsDashboard from './components/BlogAnalyticsDashboard';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import { NavigationProvider } from './contexts/NavigationContext';

function App() {
  // Debug routing
  useEffect(() => {
    console.log('App component mounted');
    console.log('Current location:', window.location.pathname);
  }, []);

  return (
    <ErrorBoundary>
      <NavigationProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsShowcase />} />
            <Route path="/projects/:projectName" element={<ProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/analytics" element={<BlogAnalyticsDashboard />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </NavigationProvider>
    </ErrorBoundary>
  );
}

export default App;
