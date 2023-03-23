import React,{useEffect} from 'react';
import ReactDOM from 'react-dom';
import './App.module.css';
import App from './App';


function Index() {
  useEffect(() => {
    const root = document.getElementById('root');
    ReactDOM.render(<App />, root);
  }, []);

  return <div id="root"></div>;
}


export default Index;
