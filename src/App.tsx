import { BrowserRouter, Routes, Route } from "react-router-dom";

// compoents
import AuthProvider from './components/authProvider';
import PrivateRoute from "./components/privateRoute";

// pages
import Home from "./pages/home";
import Login from "./pages/login";
import Logout from "./pages/logout";
import Profile from "./pages/profile";
import CreateUser from "./pages/createUser";
import Blog from "./pages/blog";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/login/`} element={<Login />} />
          <Route path={`/logout/`} element={<Logout />} />
          <Route path={`/createUser/`} element={<CreateUser />} />
          <Route path={`/blog/`} element={<Blog />} />
          <Route path={`/profile`} element={<PrivateRoute element={<Profile />} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
