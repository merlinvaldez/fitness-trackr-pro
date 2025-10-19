import { getRoutine, deleteRoutine, deleteSet, addSet } from "../api/routines";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function RoutineDetails({ activities = [] }) {
  const [redirect, setRedirect] = useState(false);
  const [routine, setRoutine] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [setDeleteError, setSetDeleteError] = useState(null);
  const { id: routineId } = useParams();

  useEffect(() => {
    async function fetchRoutine() {
      try {
        const data = await getRoutine(token, id);
        setRoutine(data);
      } catch (e) {
        setError(e.message);
      }
    }
    fetchRoutine();
  }, [id, token]);

  const loadRoutine = async () => {
    try {
      const data = await getRoutine(token, id);
      setRoutine(data); // or data[0] if your API returns an array
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    loadRoutine();
  }, [id, token]);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteRoutine(token, routine.id);
      setRedirect(true);
    } catch (e) {
      setError(e.message);
    }
  };

  const tryDeleteSet = async (setId) => {
    setSetDeleteError(null);
    try {
      await deleteSet(token, setId);
      await loadRoutine();
      setRoutine((prev) => ({
        ...prev,
        sets: prev.sets.filter((s) => s.id !== setId),
      }));
    } catch (e) {
      setSetDeleteError({ id: setId, message: e.message });
    }
  };

  const tryCreateSet = async (formData) => {
    setError(null);

    const activity = formData.get("activity");
    const routineId = routine.id;
    const activityId = Number(formData.get("activity"));
    const count = formData.get("count");

    try {
      await addSet(token, { activity, count, activityId, routineId });
      await loadRoutine();
    } catch (e) {
      setError(e.message);
    }
  };

  if (redirect) return <Navigate to="/routines"></Navigate>;
  if (error) return <p role="alert">{error}</p>;
  if (!routine) return <p>Loading...</p>;

  return (
    <article>
      <h1>{routine.name}</h1>
      <p>👤 By {routine.creatorName}</p>
      <p>
        💪🏿 <b>Goal:</b> {routine.goal}
      </p>
      <h3>Sets</h3>
      <ul>
        {routine.sets.map((set) => (
          <li key={set.id}>
            {set.name} x <b>{set.count}</b>{" "}
            {token && (
              <button onClick={() => tryDeleteSet(set.id)}>Delete set</button>
            )}
            {setDeleteError?.id === set.id && (
              <p role="alert">{setDeleteError.message}</p>
            )}
          </li>
        ))}
      </ul>
      {token && <button onClick={tryDelete}>Delete Routine</button>}
      {error && <p role="alert">{error}</p>}{" "}
      <button onClick={() => navigate("/Routines")}>🔙</button>
      <h2>Add a set</h2>
      <form action={tryCreateSet}>
        <label>
          Activity
          <select name="activity" defaultValue="">
            <option value="" disabled>
              Select an activity
            </option>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Count
          <input type="number" name="count" min="1" />
        </label>

        <button>Add set</button>
      </form>
    </article>
  );
}
