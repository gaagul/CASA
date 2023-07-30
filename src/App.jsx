import React from "react";
import ReactDOM from "react-dom/client";
import "./stylesheets/main.scss";
import queryClient from "utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import Main from "./main";

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);
