const API = import.meta.env.VITE_API;

export async function getRoutines() {
  try {
    const response = await fetch(API + "/routines");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createRoutine(token, routine) {
  if (!token) {
    throw Error("You must be signed in to create a routine");
  }
  const response = await fetch(API + "/routines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(routine),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

export async function addSet(token, set) {
  if (!token) {
    throw Error("You must be signed in to add a set");
  }
  const response = await fetch(API + "/sets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(set),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

export async function deleteRoutine(token, id) {
  if (!token) {
    throw Error("You must be signed in to delete an activity.");
  }

  const response = await fetch(API + "/routines/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

export async function deleteSet(token, id) {
  if (!token) {
    throw Error("You must be signed in to delete this set.");
  }

  const response = await fetch(API + "/sets/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

export async function getRoutine(token, id) {
  if (!token) {
    throw Error("You must be signed in to an activity's details");
  }
  console.log(token);

  const response = await fetch(API + "/routines/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }

  const result = await response.json();
  console.log(result);
  return result;
}
