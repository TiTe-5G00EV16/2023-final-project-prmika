
export const getCities = async () => {
    const res = await fetch(
      "http://localhost:5000/api/cities"
    );
    return await res.json();
  };
  
  export const createCity = async ({capital, country, image}) => {
    console.log(capital, country, image);
    const res = await fetch(
      "http://localhost:5000/api/cities", 
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
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