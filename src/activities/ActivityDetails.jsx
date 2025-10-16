import { getActivity, deleteActivity } from "../api/activities";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function ActivityDetails() {
  const [redirect, setRedirect] = useState(false);
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchActivity() {
      try {
        const data = await getActivity(token, id);
        setActivity(data);
      } catch (e) {
        setError(e.message);
      }
    }
    fetchActivity();
  }, [id, token]);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteActivity(token, activity.id);
      setRedirect(true);
    } catch (e) {
      setError(e.message);
    }
  };
  if (redirect) return <Navigate to="/"></Navigate>;
  if (error) return <p role="alert">{error}</p>;
  if (!activity) return <p>Loading...</p>;

  return (
    <article>
      <h1>{activity.name}</h1>
      <p>👤 By {activity.creatorName}</p>
      <p>
        💪🏿 <b>Description:</b> {activity.description}
      </p>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}{" "}
      <button onClick={() => navigate("/")}>go back</button>
    </article>
  );
}
