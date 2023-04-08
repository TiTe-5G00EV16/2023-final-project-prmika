
export const getStores = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/stores`
    );
    console.log(res);
  return await res.json();
};


export const createStore = async ({ chain, name, image, token }) => {
  console.log(chain, name, image);
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/stores`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        chain,
        name,
        image
      })
    }
  );
  return await res.json();
}

export const deleteStore = async ({ id, token }) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/stores/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  );

  return await res.json();
};