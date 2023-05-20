import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MyRouter from "./router";
import StorageProvider from "./TodoComponents/tempLocalStorage";

function App() {
  return (
    <>
      <BrowserRouter>
        <StorageProvider>
          <MyRouter />
        </StorageProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
