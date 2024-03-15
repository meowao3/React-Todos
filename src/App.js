import logo from './logo.svg';
import './App.css';

// import {Headers, Footers, InputTextBox} from './Blocks.js';
import {Headers, Footers, InputTextBox} from './components/Todos.js';

function App() {
  return (
    <>
    <Headers />

    <InputTextBox />

    <Footers />  
    
    </>
  );
}

export default App;

