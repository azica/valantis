import type { ChangeEvent } from "react";

import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { SearchIcon } from "@/assets/icons";

const SearchByTitle = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [value, setValue] = useState(searchParams.get("product") || "");

  useEffect(() => {
    const titleParam = searchParams.get("product");
    if (titleParam === null || titleParam.length < 0) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("product");
      setSearchParams(newSearchParams);
      setValue("");
    } else {
      setValue(titleParam);
    }
  }, [searchParams, setValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    const newSearchParams = new URLSearchParams(searchParams);
    if (e.target.value.trim().length > 0) {
      newSearchParams.set("product", e.target.value);
      newSearchParams.set("page", "1");
    } else {
      newSearchParams.delete("product");
      newSearchParams.set("page", "1"); // Resetting page to 1 if the title length is sufficient
    }

    setSearchParams(newSearchParams);
  };

  return (
    <div className="my-9">
      <TextInput
        type="text"
        icon={SearchIcon}
        placeholder="Вводите название товара"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default SearchByTitle;
