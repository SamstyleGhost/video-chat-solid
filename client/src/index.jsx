/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from "@solidjs/router";
import { SocketContextProvider } from './context';

import './index.css'
import App from './App'

const root = document.getElementById('root')

render(() => (
    <Router>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </Router>
  ), root)
