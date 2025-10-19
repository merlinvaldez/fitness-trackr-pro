import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import ActivityDetails from "./activities/ActivityDetails.jsx";
import Layout from "./layout/Layout.jsx";
import RoutinesPage from "./routines/RoutinesPage.jsx";
import Error404 from "./Error404.jsx";
import { Route, Routes } from "react-router";
import RoutineDetails from "./routines/RoutinesDetails.jsx";
import { useEffect, useState } from "react";
import { getActivities } from "./api/activities";
import { useAuth } from "./auth/AuthContext";

/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {
  const [activities, setActivities] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    getActivities(token).then(setActivities).catch(console.error);
  }, [token]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={<ActivitiesPage activities={activities}></ActivitiesPage>}
        ></Route>
        <Route path="/Routines" element={<RoutinesPage></RoutinesPage>}></Route>
        <Route
          path="/Routines/:id"
          element={<RoutineDetails activities={activities}></RoutineDetails>}
        ></Route>
        <Route path="/Register" element={<Register></Register>}></Route>
        <Route path="/:id" element={<ActivityDetails />}></Route>
        <Route path="/Login" element={<Login></Login>}></Route>
        <Route path="*" element={<Error404></Error404>}></Route>
      </Route>
    </Routes>
  );
}
