import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Register from './pages/Register'; // (Asumsi halaman register dibuat mirip login)
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';
import SearchUsers from './pages/SearchUsers';
import PrivateRoute from './components/PrivateRoute';


// Tambahkan import
import SavedPosts from './pages/SavedPosts';
import PostDetail from './pages/PostDetail';

// Di dalam <Route element={<Layout />}> ...


export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Feed />} />
          <Route path="/search" element={<SearchUsers />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/saved" element={<SavedPosts />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          
          {/* Profile Route: Bisa handle '/me' atau '/users/:username' */}
          <Route path="/me" element={<Profile />} />
          <Route path="/users/:username" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}