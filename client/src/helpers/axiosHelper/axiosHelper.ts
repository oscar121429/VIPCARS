import axios, { AxiosRequestConfig } from "axios";

const apiUrl = import.meta.env.VITE_SERVER_URL;

interface FetchDataProps<B = unknown> {
  url: string;
  method: string;
  data?: B;
  token?: string | null;
}

export const fetchData = async <R = unknown, B = unknown>(
  props: FetchDataProps<B>
): Promise<R> => {

  const { url, method, data, token } = props;

  const headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: AxiosRequestConfig<B> = {  // 👈 IMPORTANTE
    url: apiUrl + url,
    method,
    data,
    headers
  };

  const res = await axios.request<R>(config);

  return res.data;
};