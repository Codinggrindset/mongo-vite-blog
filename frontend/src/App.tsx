import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostDetail from './pages/postDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-lg sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight">My Blog</h1>
            <a href="/" className="text-sm text-gray-400 hover:text-white">Home</a>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;