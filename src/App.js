import "./App.css";
import React from "react"
import "./styles/breakpoints.css";
import NavigationBar from "./components/nav/nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/landing/landing";
import PageFooter from "./components/footer/footer";
import AboutPage from "./pages/about/about";
import UserForm from "./pages/form/userForm"
import UserContextProvider from "./context/userContext"

function App() {
  return (
    <>
    <UserContextProvider>
        <Router>
          <NavigationBar />
          <Switch>
            <Route path="/" exact>
              <LandingPage />
            </Route>
            <Route path="/about" exact>
              <AboutPage />
            </Route>
            <Route path="/users/:action" exact>
              <UserForm/>
            </Route>
          </Switch>
          <PageFooter />
        </Router>
      </UserContextProvider>
    </>
  );
}
export default App;
