import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Auth from './components/auth/Auth.js'
import NoteAdd from './components/NoteAdd';
import NotFound from './components/NotFound.js';

function App() {
  const [authentificated, setAuthentificated] = useState(false)
  const [result, setResult] = useState(null)
  const token = localStorage.getItem('token');
  useEffect(()=>{
     axios.get('http://localhost:3030/notes',{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
     setResult(resp.data.listOfNotes);
     setAuthentificated(resp.data.token === token)
     }).catch(err =>{
      console.log(err);
     });
     
  },[])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={authentificated ? <NoteAdd notes={result} /> : <Auth />} />
        <Route path='/notFound' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
  </div>
  );
}

export default App;
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IiIsImVtYWlsIjoidGhlYW1hemluZzIwMThAZ21haWwuY29tIiwicGFzc3dvcmQiOiJuYW1lIG15IHNheSIsImlhdCI6MTcwMzE3NDkzNSwiZXhwIjoxNzA0MjU0OTM1fQ.cGSR_yWEoX2q8cEC1Csu1VbSm5IThWvpVxADpAJbF_4"