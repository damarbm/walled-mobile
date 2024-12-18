import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import axios from "axios";

function useFetch(url, jwtToken) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
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
    }, [jwtToken])
  );

  return { data, loading, error, fetchData };
}

export default useFetch;
