import { Link } from "react-router";

//add syncActivities funtion later
export default function RoutineList({ routines, syncRoutines }) {
  return (
    <ul>
      {routines.map((routine) => (
        <RoutineListItem
          key={routine.id}
          routine={routine}
          syncRoutines={syncRoutines}
        />
      ))}
    </ul>
  );
}

function RoutineListItem({ routine }) {
  return (
    <li>
      <Link to={`/Routines/${routine.id}`}>{routine.name}</Link>
    </li>
  );
}
