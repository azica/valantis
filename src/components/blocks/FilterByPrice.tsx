import type { ChangeEvent } from "react";

import { Label, RangeSlider } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterByPrice = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultPrice = Number(searchParams.get("price")) || 1;
  const [price, setPrice] = useState(defaultPrice);

  useEffect(() => {
    if (Number(searchParams.get("price")) === 0) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("price");
      setSearchParams(newSearchParams);
      setPrice(0);
    }
  }, [searchParams, setSearchParams]);

  const handleMouseUp = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (price > 0) {
      newSearchParams.set("price", price.toString());
      newSearchParams.set("page", "1");
    } else {
      newSearchParams.delete("price");
    }
    setSearchParams(newSearchParams);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value));
  };

  return (
    <div className="mb-10">
      <div className="mb-1 flex items-center gap-5">
        <Label htmlFor="default-range" value="Price:" />
        <div className="font-medium">{price} $</div>
      </div>
      <RangeSlider id="default-range" onChange={handleChange} onMouseUp={handleMouseUp} value={price} max={100000} />
    </div>
  );
};

export default FilterByPrice;
