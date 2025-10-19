import { useState, useEffect } from "react";
import { getRoutines } from "../api/routines";

import RoutineList from "./RoutinesList";
import RoutineForm from "./RoutinesForm";
// import RoutinesForm from "./RoutinesForm";

export default function RoutinesPage() {
  const [routines, setRoutines] = useState([]);

  const syncRoutines = async () => {
    const data = await getRoutines();
    setRoutines(data);
  };

  useEffect(() => {
    syncRoutines();
  }, []);

  return (
    <>
      <h1>Routines</h1>
      <RoutineList routines={routines} syncRoutines={syncRoutines} />
      <RoutineForm syncRoutines={syncRoutines} />
    </>
  );
}
