import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();

//react --> biblioteca global para construção de interfaces
//react-dom --> biblioteca para criar interface na DOM
//react-native --> biblioteca para criar interface em Mobile
//react-vr --> biblioteca para criar interfaces em realidade virtual 