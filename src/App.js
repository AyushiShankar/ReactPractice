import PaginatedBookmarkList from "./components/PaginatedBookmarkList/PaginatedBookmarkList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Accordion from "./components/Accordion/Accordion";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accordion />} />
        <Route
          path="/PaginatedBookmarkList"
          element={<PaginatedBookmarkList />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
