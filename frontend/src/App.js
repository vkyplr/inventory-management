import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import StockForm from './components/StockForm';
import { Box } from '@mui/material';
import StockList from './components/StockList';
import Context from './Context';


function App() {
  return (
    <Router>
      <Context>
        <Header />
        <Box
        // sx={{ height: 'calc(100vh - 48px)' }}
        >
          <Routes>
            <Route path='/' element={<StockList />} />
            <Route path='/add-stock' element={<StockForm />} />
            <Route path='/edit-stock/:id' element={<StockForm />} />
            <Route path='/stock' element={<StockList />} />
          </Routes>
        </Box>
      </Context>
    </Router>
  );
}

export default App;
