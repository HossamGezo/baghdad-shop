// --- Libraries
import {useEffect, useState} from "react";
import axios from "axios";

// --- Types
import type {ProductProps} from "../utils/types";

// --- useFetchData (Hook)
const useFetchData = (endPoint: string) => {
  const [data, setData] = useState<ProductProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5100/${endPoint}`);
        setData(response.data);
      } catch (error) {
        console.error("Something went wrong!", error);
      }
    };
    fetchData();
  }, [endPoint]);
  return data;
};

export default useFetchData;
