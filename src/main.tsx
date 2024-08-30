import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./router";
import { ThemeProvider } from "./providers/theme-provider";
import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apollo/config";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>
);
