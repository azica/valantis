import type { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes } from "react";

declare global {
  namespace Model {
    type Product = {
      id: string;
      product: string;
      price: number;
      brand: string | null;
      image: string;
    };

    type ShopParams = {
      limit: number;
      offset: number;
    };
  }

  type ObjectTypeGeneric<T> = {
    id: number;
    key: string;
    value: keyof T;
  };
}
