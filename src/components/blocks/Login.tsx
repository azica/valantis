import type { SyntheticEvent } from "react";

import cn from "clsx";
import { Checkbox, Button } from "flowbite-react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { loginValues } from "@/shared/data/login";
const tabs = ["Login", "Registration"];

const Login = () => {
  const [values, setValues] = useState<InputData[]>(loginValues);
  const [activeMenu, setActiveMenu] = useState("Login");

  const valueChange: InputOnChange = (newVal) => {
    const newInputProps = values.map((item) =>
      newVal.field === item.field ? { ...item, value: newVal.value, invalid: false } : item,
    );
    setValues(newInputProps);
  };

  const submitHandle = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div className="px-7 py-12 w-full">
      <ul className="flex w-full">
        {/* {tabs.map((el) => (
          <li
            key={el}
            onClick={() => setActiveMenu(el)}
            className={cn(
              "font-medium text-white  w-6/12 text-center relative pb-4 cursor-pointer text-[1.375rem] font-sans",
              "before:absolute before:w-full before:h-[3px] before:bg-white before:bottom-0 before:left-0",
              "after:absolute after:w-0 after:h-[3px] after:bg-primary after:bottom-0 after:left-0 after:transition-all",
              "hover:after:w-full hover:text-primary",
              el === activeMenu && "text-primary after:w-full",
            )}>
            {el}
          </li>
        ))} */}
      </ul>
      <form className="flex flex-col gap-10 mt-10" onSubmit={submitHandle}>
        {/* <div className="flex flex-col gap-5">
          {values.map((input) => (
            <Fragment key={input.id}>
              {input.type === "checkbox" ? (
                <Checkbox {...input} onChange={valueChange} />
              ) : (
                <Input {...input} onChange={valueChange} />
              )}
            </Fragment>
          ))}
        </div>
        <div>
          <p className="text-lg font-bold text-gray-3 mb-5 font-roboto">Forgot your password? </p>
          <Button variant="primary" isFullWidth type="submit">
            {activeMenu === "Login" ? "Enter" : "Register"}
          </Button>
          {activeMenu === "Registration" ? (
            <p className=" mt-5 text-xs text-gray-4 -tracking-[0.065px] leading-[140%]">
              By pressing Register, you confirm that you are of legal age and accept the terms of{" "}
              <Link to="/" className="text-blue">
                the Service Agreement and Privacy Policy
              </Link>
            </p>
          ) : null}
        </div>
        <div>
          <p
            className={cn(
              "relative text-center",
              "after:absolute after:w-full after:h-px after:bg-white after:right-0 after:top-2/4",
              "before:absolute before:w-full before:h-px before:bg-white before:left-0 before:top-2/4",
            )}>
            <span className="text-lg font-normal text-white inline-block z-10 px-2 bg-black-2 relative font-roboto">
              Or continue with
            </span>
          </p>
          <ul>
            <li></li>
          </ul>
          <p>Don’t have an account? Register</p>
        </div> */}
      </form>
    </div>
  );
};

export default Login;
