import  { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPosts } from './redux/postsSlice';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Redux Thunk action call on app load
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;