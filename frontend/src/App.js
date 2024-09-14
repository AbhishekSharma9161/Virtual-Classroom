import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import LecturePage from './components/LecturePage';

const App = () => (
  <Router>
    <Header />
    <Route path="/" component={HomePage} exact />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/admin" component={AdminPage} />
    <Route path="/session/:id" component={LecturePage} />
  </Router>
);

export default App;
