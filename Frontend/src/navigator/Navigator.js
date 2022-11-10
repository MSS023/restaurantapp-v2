import { Navigate, Route, Routes } from "react-router-dom";
import DineScreen from "../screens/DineScreen/DineScreen";
import MenuScreen from "../screens/MenuScreen/MenuScreen";

export default function Navigator() {
    return <Routes>
        <Route path="/menu" element={<MenuScreen />} />
        <Route path="/dine/:categoryID/:id" element={<DineScreen />} />
        <Route path = "*" element = {<Navigate to="/menu" />} />
    </Routes>
}