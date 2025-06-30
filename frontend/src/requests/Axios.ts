// This file contains the custom Axios instance that is used to make requests to the backend.
// Code copied from Orval examples:
// https://github.com/orval-labs/orval/blob/master/samples/react-query/basic/src/auth.context.tsx
// https://github.com/orval-labs/orval/blob/master/samples/react-query/custom-client/src/api/mutator/custom-client.ts

import Axios, { AxiosError, AxiosRequestConfig } from "axios";

const getBaseUrl = () => {
  switch (import.meta.env.VITE_ENV) {
    case "prod":
      return "https://story-deck-api-691053305129.us-west3.run.app";
    default:
      return "http://localhost:8000";
  }
};

export const AXIOS_INSTANCE = Axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
});

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const promise = (async () => {
    const headers = {
      ...config.headers,
    };

    // Make the request
    const { data } = await AXIOS_INSTANCE({
      ...config,
      headers,
    });

    return data;
  })();

  return promise;
};

export default customInstance;

export interface ErrorType<Error> extends AxiosError<Error> {}
