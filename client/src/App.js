import {Routes,Route} from 'react-router-dom'
import Homepage from './pages/Homepage';
import Aboutpage from './pages/Aboutpage';
import Policypage from './pages/Policypage';
import Pagenotfound from './pages/Pagenotfound';
import Newnotes from './pages/Newnotes';
import Detailpage from './pages/detailpage';
import UpdateNotes from './pages/updateNote'
import Search from './pages/search';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import PrivateRoute from './components/Routes/Private';



function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='' element={<PrivateRoute/>}>
      <Route path='/newnotes' element={<Newnotes/>}/>
      </Route> 
      <Route path='/about' element={<Aboutpage/>}/>
      <Route path='/policy' element={<Policypage/>}/>
      <Route path='/*' element={<Pagenotfound/>}/>
      <Route path='/notes/:slug' element={<Detailpage/>}/>
      <Route path='/note/:slug' element={<UpdateNotes/>}/>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
     
    </>
  );
}

export default App;
