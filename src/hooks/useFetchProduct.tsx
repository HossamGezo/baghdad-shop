// --- Libraries
import {useEffect, useState} from "react";
import axios from "axios";

// --- Types
import type {ProductProps} from "../utils/types";

// --- useFetchData (Hook)
const useFetchData = (endPoint: string, id: string) => {
  const [data, setData] = useState<ProductProps>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5100/${endPoint}/${id}`,
        );
        setData(response.data);
      } catch (error) {
        console.error("Something went wrong!", error);
      }
    };
    fetchData();
  }, [endPoint, id]);
  return data;
};

export default useFetchData;
