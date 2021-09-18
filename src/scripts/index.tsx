import * as React from 'react';
import { render } from 'react-dom';
import "./index.scss";
import Header from './Header/Header';

const App = () => {
    return (
        <div id="App">
            <Header />
            <h1 className="app-header">Hello world!</h1>
        </div>
    )
}

render(<App />, document.getElementById("root"))