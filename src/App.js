import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './default/Header';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Main from './Pages/Main';
import Todo from './Pages/Todo';
import Notfound from './Pages/Notfound';
import "./css/layout.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/todo' element={<Todo />}></Route>
          <Route path='*' element={<Notfound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
