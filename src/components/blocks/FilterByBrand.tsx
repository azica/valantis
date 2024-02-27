import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useGetBrandsQuery } from "@/store/services/shopQuery";

const FilterByBrand = () => {
  const [brands, setBrands] = useState<string[]>([]);
  const fetchedBrands = useGetBrandsQuery();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (fetchedBrands.isSuccess && fetchedBrands.data) {
      const newBrands = (fetchedBrands.data as { result: string[] }).result;
      newBrands && setBrands(newBrands?.filter((el) => el !== null));
    }
  }, [fetchedBrands]);

  const clickHandle = (val: string) => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({ ...currentParams, brand: `${val}`, page: "1" });
  };
  return (
    <div className="flex md:items-center gap-4 mb-5 mt-10 max-[580px]:flex-col md:flex-row max-[580px]items-stretch">
      {brands.map((el, idx) => (
        <Button
          key={idx}
          size="sm"
          gradientDuoTone="purpleToPink"
          outline={searchParams.get("brand") === el}
          onClick={() => clickHandle(el)}>
          {el}
        </Button>
      ))}
    </div>
  );
};

export default FilterByBrand;
