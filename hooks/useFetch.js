import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

function useFetch(url, jwtToken) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();

      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (jwtToken) fetchData(url);
      [jwtToken];
    })
  );

  return { data, loading, error };
}

export default useFetch;
