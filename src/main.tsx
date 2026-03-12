import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import LandingPage from './components/LandingPage';
import App from './App';
import CreateTask from './components/CreateTask';
import MyTasks from './components/MyTasks';
import Leaderboard from './components/Leaderboard';
import Docs from './components/Docs';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<App />}>
          <Route path="/app" element={<div className="text-center text-3xl text-indigo-400 mt-20">Welcome to Dashboard</div>} />
          <Route path="/create" element={<CreateTask creatorAddress="placeholder" />} />
          <Route path="/my-tasks" element={<MyTasks />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/docs" element={<Docs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);