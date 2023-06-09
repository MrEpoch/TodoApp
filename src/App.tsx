import "./App.css";
import "./AppMobile.css";
import { BrowserRouter } from "react-router-dom";
import MyRouter from "./router";
import { Wrapper } from "./TodoComponents/wrapper";

function App() {
  return (
    <>
      <BrowserRouter>
        <Wrapper>
            <MyRouter />
        </Wrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
