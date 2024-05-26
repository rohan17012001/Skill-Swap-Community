import React from "react";
import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Header from "./components/Header";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Fyp from "./pages/FYP";
import Posts from "./pages/Post";
import Notlogin from "./pages/Notlogin";
import Account from "./pages/Account";
import Login from "./pages/Login";
import { auth } from "./firebase/firebase";
import Createpost from "./components/Createpost";
import { context } from "../context/context";
// import { useAuth } from '../context/authContext'
import "./App.css";
// const { userLoggedIn } = useAuth();

export const Context = React.createContext();

function App() {
  const { currentUser } = auth;
  const userLoggedIn = currentUser !== null;
  const [loggedIn, setLoggedIn] = useState(true);
  const router = createBrowserRouter([
    {
      path: "/",
      // element: <Home />,
      children: [
        { path: "", element: userLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />},
        { path: "home", Component: Fyp },
        { path: "post", Component: Posts },
        { path: "invalid", Component: Notlogin },
        { path: "account", Component: Account },
        { path: "login", Component: Login },
        { path: "create", Component: Createpost}
      ],
    },
    {
      path: "*",
      element: <div>404 Not found</div>,
    },
    // {
    //   path: '/home',
    //   element: <Fyp />
    // },
    // {
    //   path: '/post',
    //   element: <Posts />
    // },
    // {
    //   path: '/invalid',
    //   element: <Notlogin />
    // },
    // {
    //   path: '/account',
    //   element: <Account />
    // },
    // {
    //   path: '/login',
    //   element: <Login />
    // }
    // {
    //   path: '/temp',
    //   element: <Temp />
    // }
  ]);
  return (
    <>
      {/* <context.Provider value={{loggedIn, setLoggedIn}}> */}
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      {/* <h1>App</h1> */}
      <Header />
      <RouterProvider router={router} />
      <Footer />
      {/* <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1> */}
      {/* </context.Provider> */}
    </>
  );
}

export default App;
