import { BrowserRouter, Route, Routes, Navigate  } from 'react-router-dom';
import { App } from '../App';

export const ReactRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <App />
        </Route>
        <Route path="*">
          <Navigate  to="/" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
