import "./App.css";
import SignIn from "./SignIn";
import {
  Route,
  Routes,
  BrowserRouter,
  Redirect,
  Navigate,
  Switch,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import MainPage from "./MainPage";
import NoDataFound from "./NoDataFound";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    // <div className="main-container">
    //   <SignIn />
    // </div>

    <Routes>
      <Route exact path="/" element={<SignIn />} />

      <Route exact path="/home" element={<MainPage />} />

      <Route exact path="/viewTickets" element={<NoDataFound />} />
      <Route exact path="/modifyTickets" element={<NoDataFound />} />
      <Route exact path="/cancelTickets" element={<NoDataFound />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
