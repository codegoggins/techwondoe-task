import React , {FC} from 'react';
import './App.css';
import Table from './Table';
import AddNew from './components/AddNew';

const App:FC = () => {
  return (
    <div className="App">
         <Table/>
         {/* <AddNew/> */}
    </div>
  );
}

export default App;
