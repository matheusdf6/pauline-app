import React from 'react';
import './App.css';
import { ToastProvider } from "react-toast-notifications";
import Snack from "./utils/Snack";
import ConnectionListener from "./services/ConnectionListener";
import Routes from "./routes";

function App() {

  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={6000}
      // components={{ Toast: Snack }}
      placement="bottom-center">
        <ConnectionListener />
          <div className="main-container">
            <div className="content">
              <Routes />
            </div>
          </div>
    </ToastProvider>
  );
}

export default App;
