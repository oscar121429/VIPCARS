import axios from "axios";

const apiUrl = import.meta.env.VITE_SERVER_URL;



interface FetchDataProps<T = unknown> {
  url: string;
  method: string;
  data?: T;
  token?: string | null;
}

export const fetchData = async <T = unknown, R = unknown>({
  url,
  method,
  data,
  token,
}: FetchDataProps<T>): Promise<R> => {

  const headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

   const config = {
      url: apiUrl + url,
      method,
      data,
      headers
    }

  const res = await axios(config);
  
  return res.data;
};