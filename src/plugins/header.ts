import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Zodios } from "../zodios";
import {
  AxiosRetryRequestConfig,
  TokenProvider,
  ZodiosEnpointDescriptions,
} from "../zodios.types";

export function pluginHeader<Api extends ZodiosEnpointDescriptions>(
  key: string,
  valueFn: () => Promise<string>
) {
  return (zodios: Zodios<Api>) => {
    zodios.axios.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        config.headers = {
          ...config.headers,
          [key]: await valueFn(),
        };
        return config;
      }
    );
  };
}