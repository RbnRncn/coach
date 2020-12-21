const getActivities = async () => {
  const response = await fetch("https://demos.inbonis.com/api-coach-es-informa/activities");
  const activities = await response.json();

  return activities;
}

const getResults = async (nif, activity_sector) => {
  const response = await fetch("https://demos.inbonis.com/api-coach-es-informa/diagnosis/anon", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'nif': nif,
      'activity_sector': activity_sector,
    })
  });
  const results = await response.json();

  return results;
}

export {
  getActivities,
  getResults
}