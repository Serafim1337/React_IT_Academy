import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PageOne, PageTwo } from "./Components/Pages";

import { MainPage } from "./Pages/MainPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}>
          <Route index element={<div>No content.</div>}></Route>
          <Route path="one" element={<PageOne></PageOne>}></Route>
          <Route path="two" element={<PageTwo></PageTwo>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
