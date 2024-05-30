import React from "react";
import { useEffect, useContext, createContext, useState } from "react";
import { auth } from "../../src/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

// const AuthContext = React.createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [userLoggedIn, setUserLoggedIn] = useState(false);
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, initializeUser);
//     return unsubscribe;
//   }, []);

//   async function initializeUser(user) {
//     if (user) {
//       setCurrentUser({ ...user });
//       setUserLoggedIn(true);
//     } else {
//       setCurrentUser(null);
//       setUserLoggedIn(false);
//     }
//     setLoading(false);
//   }

//   const value = {
//     currentUser,
//     userLoggedIn,
//     loading,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

// const UserContext = createContext();

// // Create a custom hook to use the UserContext
// const useAuth = () => {
//   return useContext(UserContext);
// };

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export { AuthProvider, useAuth };

// Create the context
const UserContext = createContext();

// Create a custom hook to use the UserContext
const useUser = () => {
  return useContext(UserContext);
};

// Create the provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        //   console.log(user.getIdToken())
        const helper = async () => {

          await user.getIdToken().then((idToken) => {
            //   console.log(idToken);
            localStorage.setItem("token", idToken);
          });
        }
        helper();
        //   localStorage.setItem('user', JSON.stringify(user));
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };
