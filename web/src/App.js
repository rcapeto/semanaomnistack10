import React, { useEffect, useState } from 'react';
import './global.css';
import './app.css';
import './sidebar.css';
import './main.css';
import api from './services/api';
import DevItem from './Components/DevItem';
import DevForm from './Components/DevForm';

function App() {

  const [devs, setDevs] = useState([]);

  useEffect(()=>{
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    loadDevs();

  }, [devs]);

  async function handleAddDev(data){
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem dev={dev} key={dev._id}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
