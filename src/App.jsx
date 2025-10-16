import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import Layout from "./layout/Layout.jsx";
import Error404 from "./Error404.jsx";
import { Route, Routes } from "react-router";

/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ActivitiesPage></ActivitiesPage>}></Route>
        <Route path="/Register" element={<Register></Register>}></Route>
        <Route path="/Login" element={<Login></Login>}></Route>
        <Route path="*" element={<Error404></Error404>}></Route>
      </Route>
    </Routes>
  );
}
