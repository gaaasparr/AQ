
import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

async function traerProductos () {
  const prod = await axios.get('http://localhost:3001/')
  return prod.data
}

function App() {
  const [productos, setProductos] = useState(traerProductos)
  console.log(productos);

  return (
    <div className="App">
      <header className="App-header">
        {
          
        }
        
      </header>
    </div>
  );
}

export default App;
