import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import axios from "axios";

function useFetch(url, jwtToken) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      setData(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (jwtToken) fetchData(url);
    }, [])
  );

  return { data, loading, error };
}

export default useFetch;
