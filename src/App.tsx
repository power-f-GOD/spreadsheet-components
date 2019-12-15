import React from 'react';

import DataGrid from './components/DataGrid';
import DataSheet from './components/DataSheet';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='App'>
      <h3>Adazzle React Data Grid Component Presentation</h3>
      <DataGrid />
      <br />
      <br />
      <h3>Nadbm React Data Sheet Component Presentation</h3>
      <DataSheet />
    </div>
  );
};

export default App;
