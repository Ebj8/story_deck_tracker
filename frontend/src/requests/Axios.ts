// This file contains the custom Axios instance that is used to make requests to the backend.
// Code copied from Orval examples:
// https://github.com/orval-labs/orval/blob/master/samples/react-query/basic/src/auth.context.tsx
// https://github.com/orval-labs/orval/blob/master/samples/react-query/custom-client/src/api/mutator/custom-client.ts

import Axios, { AxiosError, AxiosRequestConfig } from "axios";

const getBaseUrl = () => {
  switch (import.meta.env.VITE_ENV) {
    case "production":
      return "https://nomp-prod-150239024349.us-west1.run.app";
    case "staging":
      return "https://nomp-staging-856431008964.us-west1.run.app";
    case "demo":
      return "https://nomp-619048117804.us-central1.run.app";
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
