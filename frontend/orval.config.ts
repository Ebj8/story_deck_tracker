import { defineConfig } from "orval";

const target = "http://127.0.0.1:8000/openapi.json";

export default defineConfig({
  ReactQuery: {
    input: {
      target: target,
    },
    output: {
      mode: "tags",
      target: "./src/requests/gen/react-query",
      client: "react-query",
      prettier: true,
      override: {
        mutator: {
          path: "./src/requests/Axios.ts",
          name: "customInstance",
        },
      },
    },
  },
});