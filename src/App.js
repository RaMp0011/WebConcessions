import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/home';
import Locate from './pages/locate';
import Login from './pages/login';
import Signup from './pages/signup';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar/>
      <div className='pages'>
      <Routes>
        <Route path='/'
        element={<Home/>}
        // />
        // <Routes path='/'
        // element={<Login/>}
        // />
        // <Routes path='/'
        // element={<Signup/>}
        />
        <Route path='/login'
        element={<Login/>}
        />
        <Route path='/signup'
        element={<Signup/>}
        />
         <Route path='/locate'
        element={<Locate/>}/>
      </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
