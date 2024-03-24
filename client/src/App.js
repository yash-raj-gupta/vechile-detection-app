import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadPage from "./components/UploadPage";


function App() {
  return(
<>
<BrowserRouter>
<Routes>
  <Route path="/" element={<UploadPage/>}/>
</Routes>
</BrowserRouter>


</>
  ) ;
}

export default App;
