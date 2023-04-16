import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Cities from "./cities/pages/Cities";
import AddCity from "./cities/pages/AddCity";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Users from "./users/pages/Users";
import Authenticate from "./users/pages/Authenticate";
import MainNavigation from "./shared/components/navigation/MainNavigation";

import { AuthContext } from "./shared/context/auth-context";
import { useCallback, useEffect, useState } from "react";
import Products from "./products/pages/Products";
import AddProduct from "./products/pages/AddProduct";

const queryClient = new QueryClient();
let logoutTimer;

function App() {
 const [token, setToken] = useState(false);
 const [userId, setUserId] = useState(false);
 const [tokenExpirationDate, setTokenExpirationDate] = useState(false); 

 const login = useCallback((uid, token, expirationDate) => {
  setToken(token);
  setUserId(uid);
  const tokenExpirationDate =
    expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
  localStorage.setItem(
    "userData",
    JSON.stringify({
      userId: uid,
      token,
      expiration: tokenExpirationDate.toISOString(),
    })
  );
}, []);

const logout = useCallback(() => {
  setToken(null);
  setUserId(null);
  setTokenExpirationDate(null);
  localStorage.removeItem("userData");
}, []);

useEffect(() => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  if (
    storedData &&
    storedData.token &&
    new Date(storedData.expiration) > new Date()
  ) {
    login(
      storedData.userId,
      storedData.token,
      new Date(storedData.expiration)
    );
  }
}, [login]);

useEffect(() => {
  if (token && tokenExpirationDate) {
    const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
    logoutTimer = setTimeout(logout, remainingTime);
  } else {
    clearTimeout(logoutTimer);
  }
}, [token, logout, tokenExpirationDate]);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Products />
        </Route>
        <Route path="/cities" exact>
          <Cities />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/cities/new" exact>
          <AddCity />
        </Route>
        <Route path="/products/new" exact>
          <AddProduct />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Products />
        </Route>
        <Route path="/auth">
          <Authenticate />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Router>
          <MainNavigation />
          <main>{routes}</main>
        </Router>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}
export default App;