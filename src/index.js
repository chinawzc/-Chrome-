
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home';

function App (){
    return (
        <div>
            <Home />
        </div>
    )
}

const root = document.getElementById('root');
ReactDOM.render(<App />,root);