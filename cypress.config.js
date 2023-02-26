import { defineConfig } from "cypress";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  env: {
    SERVER_PORT: process.env.SERVER_PORT,
    FIELDSET_INPUT_LIMIT: 6,
  },
  component: {
    devServer: { framework: "react", bundler: "vite" },
    supportFile: "./cypress/support/component.jsx",
    viewportWidth: 1327,
    viewportHeight: 600,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
  },
});
