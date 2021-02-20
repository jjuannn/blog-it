import "./App.css";
import "./styles/breakpoints.css";
import NavigationBar from "./components/nav/nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/landing/landing";
import PageFooter from "./components/footer/footer";
import AboutPage from "./pages/about/about";
function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="/about" exact>
            <AboutPage />
          </Route>
        </Switch>
        <PageFooter />
      </Router>
    </>
  );
}
export default App;
