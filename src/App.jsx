import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import SearchPage from './SearchPage';
import MovieDetailPage from './MovieDetailPage';

function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<SearchPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;

