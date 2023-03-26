
export const getCities = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/cities`
  );
  return await res.json();
};


export const createCity = async ({ capital, country, image, token }) => {
  console.log(capital, country, image);
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/cities`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        capital,
        country,
        image
      })
    }
  );
  return await res.json();
}

export const deleteCity = async ({ id, token }) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/cities/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  );

  return await res.json();
};