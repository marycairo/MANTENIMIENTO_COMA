import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import ReportForm from "./Pages/ReportForm";
import AppLayout from "./Layout/AppLayout";
import Home from "./Pages/Home";
import Historial from "./Pages/History";

function App() {

  return (

    <AppLayout>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/reportar" element={<ReportForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/historial" element={<Historial />} />

      </Routes>

    </AppLayout>

  );

}

export default App;