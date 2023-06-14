import { useEffect, useState } from "react";

export const UseFetch = (url) => {
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch(url);
      const jsonData = await response.json();

      setData(jsonData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { data };
};
