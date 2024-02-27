import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { SHOP_API_URL } from "./constant";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: SHOP_API_URL,
  }),
  endpoints: () => ({}),
});
