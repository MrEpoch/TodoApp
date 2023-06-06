import "./App.css";
import "./AppMobile.css";
import { BrowserRouter } from "react-router-dom";
import MyRouter from "./router";

function App() {
  return (
    <>
      <BrowserRouter>
          <MyRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
