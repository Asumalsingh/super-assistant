import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import CreateForm from "./components/CreateForm";
import FormPreview from "./components/FromPreview"
import FormEdit from "./components/FormEdit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:formId" element={<CreateForm />} />
      <Route path="/preview/:formId" element={<FormPreview />} />
      <Route path="/edit/:formId" element={<FormEdit />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
