import { ShopService } from "@/services/ShopService";

import { api } from "./api";

const apiWithTag = api.enhanceEndpoints({ addTagTypes: ["Shop"] });

const extendedApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getIds: builder.query<{ result: string[] } | { error?: ErrorResponse }, Model.ShopParams>({
      queryFn: async ({ offset, limit }) => {
        try {
          const res = await ShopService.getIds({ offset, limit });
          if ("error" in res) {
            return { error: res.error, status: res?.error?.status };
          } else {
            return { data: res };
          }
        } catch (error: any) {
          return { error: error?.message, status: error?.response?.status };
        }
      },
      providesTags: ["Shop"],
    }),

    getItems: builder.query<{ result: Model.Product[] } | { error?: ErrorResponse }, { ids: string[] }>({
      queryFn: async (ids) => {
        try {
          const res = await ShopService.getItems(ids);
          return { data: res };
        } catch (error: any) {
          return { error: error.message, status: error.status };
        }
      },
      providesTags: ["Shop"],
    }),
    getBrands: builder.query<{ result: string[] } | { error?: ErrorResponse }, void>({
      queryFn: async () => {
        try {
          const res = await ShopService.getBrands();
          return { data: res };
        } catch (error: any) {
          return { error: error.message, status: error.status };
        }
      },
      providesTags: ["Shop"],
    }),
    filterItems: builder.query<
      { result: string[] } | { error?: ErrorResponse },
      { price?: number; brand?: string; product?: string; offset?: number }
    >({
      queryFn: async ({ price, brand, product, offset }) => {
        try {
          const res = await ShopService.filterItems({ price, brand, product, offset });
          return { data: res };
        } catch (error: any) {
          return { error: error.message, status: error.status };
        }
      },
      providesTags: ["Shop"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetIdsQuery, useGetItemsQuery, useGetBrandsQuery, useLazyFilterItemsQuery, useLazyGetItemsQuery } =
  extendedApi;
