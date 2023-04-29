
export const getProducts = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/products`
    );
    console.log(res);
  return await res.json();
};

export const getProductsByOwner = async ({ id }) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/products/owner/${id}`
    );
    console.log(res);
  return await res.json();
};


export const createProduct = async ({ title, description, image,price,owner, token }) => {
  console.log(title, price, image,owner);
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/products`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        title,
        description,
        image,
        price,
        owner
      })
    }
  );
  return await res.json();
}
export const updateProduct = async ({ title,description,image, price, id, token }) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      title,
      description,
      image,
      price,
      id
    }),
  });
  return res;
};

export const deleteProduct = async ({ id, token }) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/products/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  );

  return await res.text();
};