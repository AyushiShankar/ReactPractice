import PaginatedBookmarkList from "./components/PaginatedBookmarkList/PaginatedBookmarkList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Accordion from "./components/Accordion/Accordion";
import UndoRedo from "./components/UndoRedo/UndoRedo";
import ComparePlans from "./components/ComparePlans/ComparePlans";

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<UndoRedo />} />
    //     <Route
    //       path="/PaginatedBookmarkList"
    //       element={<PaginatedBookmarkList />}
    //     />
    //   </Routes>
    // </BrowserRouter>
    <ComparePlans />
  );
}

export default App;
