import axios from "axios";
import md5 from "md5";

import { SHOP_API_URL } from "@/store/services/constant";

const password = "Valantis";

function generateXAuth(password: string): string {
  const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
  return md5(`${password}_${timestamp}`);
}

const authHeader = {
  "Content-Type": "application/json",
  "X-Auth": generateXAuth(password),
};

export const ShopService = {
  async getIds({ offset, limit }: Model.ShopParams): Promise<{ result: string[] } | { error?: ErrorResponse }> {
    try {
      const response = await axios.post<{ result: string[] } | { error?: ErrorResponse }>(
        SHOP_API_URL,
        {
          action: "get_ids",
          params: { offset, limit },
        },
        {
          headers: authHeader,
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error();
      }
    } catch (error: any) {
      return { error: { message: error.message, status: error.response?.status } };
    }
  },
  async getItems({ ids }: { ids: string[] }): Promise<{ result: Model.Product[] } | { error?: ErrorResponse }> {
    try {
      const response = await axios.post(
        SHOP_API_URL,
        {
          action: "get_items",
          params: { ids },
        },
        {
          headers: authHeader,
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error();
      }
    } catch (error: any) {
      return { error: { message: error.message, status: error.response?.status } };
    }
  },
  async getBrands(): Promise<{ result: string[] } | { error?: ErrorResponse }> {
    try {
      const response = await axios.post(
        SHOP_API_URL,
        {
          action: "get_fields",
          params: { field: "brand", offset: 3, limit: 100 },
        },
        {
          headers: authHeader,
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error();
      }
    } catch (error: any) {
      return { error: { message: error.message, status: error.response?.status } };
    }
  },
  async filterItems({
    price,
    brand,
    title,
  }: {
    price?: number;
    brand?: string;
    title?: string;
  }): Promise<{ result: string[] } | { error?: ErrorResponse }> {
    try {
      const response = await axios.post(
        SHOP_API_URL,
        {
          action: "filter",
          params: { price, brand, title },
        },
        {
          headers: authHeader,
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error();
      }
    } catch (error: any) {
      return { error: { message: error.message, status: error.response?.status } };
    }
  },
};
