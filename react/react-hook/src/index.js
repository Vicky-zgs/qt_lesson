import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Demo1 from './component/demo1';
// import Demo1 from './component/useState/indexHook.js';
// import Demo2 from './component/useEffect/index';
// import Demo2 from './component/useEffect/indexHook.js';
// import Demo2 from './component/useEffect/makeUnmount.js';
// import Demo3 from './component/useContext/index';
// import Demo3 from './component/useContext/indexHook';
// import Demo4 from './component/useReducer/index';
// import Demo5 from './component/useMemo/index';
// import Demo6 from './component/useRef/index';
import Demo6 from './component/useRef/anotherUse';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Demo6 />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
