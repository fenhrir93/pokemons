import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import axios, { BASE_URL } from "./axios";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: BASE_URL }
  ): BaseQueryFn<
    {
      url?: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios<AxiosResponse>(`${baseUrl}${url}`, {
        method,
        data,
        params,
        headers,
      });

      if (!result.data) {
        throw new Error("No data found");
      }

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: err,
      };
    }
  };

export default axiosBaseQuery;
