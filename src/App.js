import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../src/Components/Header';
import Login from './Pages/Login';
import Sidebar from '../src/Components/Header';
import Home from './Pages/Home';
import './styles.css'
import Search from './Pages/Search';
import AddNewPlaylist from './Pages/AddNewPlaylist';
import PlaylistDetails from './Pages/PlaylistDetails';
import UserProfile from './Pages/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/home' element={<Home />} />
        <Route path='/home/playlist/addnewplaylist' element={<AddNewPlaylist />} />
        <Route path='/search' element={<Search />} />
        <Route path='/home/playlist/:playlist_id' element={<PlaylistDetails />} />
        <Route path='/profile' element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
