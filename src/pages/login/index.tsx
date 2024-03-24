import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../components/maincontent/functions";

type Props = {};

const index = (props: Props) => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validateEmailField = validateEmail(formData.email, setErr);
    const validatePasswordField = validatePassword(formData.password, setErr);
    if (validateEmailField && validatePasswordField) {
      const newUser = {
        email: formData.email,
        password: formData.password,
      };

      const mockResponse = {
        status: "success",
        message: "User login successfully",
      };

      console.log("Mock Response:", mockResponse);

      setFormData({
        email: "",
        password: "",
      });
      setErr({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="h-screen bg-[#fff]">
      <div className="border-[#C1C1C1]-600 relative left-[432px] top-[176px] h-[614px] w-[576px] rounded-[20px] border-2">
        <div className="grid grid-cols-1 gap-4 p-6">
          <div className="text-center text-[32px] font-[600]">Login</div>
          <span className="text-center text-[24px] font-[500]">
            Welcome back to ECOMMERCE
          </span>
          <span className="text-center text-[16px] font-[400]">
            The next gen business marketplace
          </span>
          <form className="m-auto grid w-[456px] gap-1" onSubmit={handleSubmit} autoComplete="off">
            <label htmlFor="email" className="mt-6">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter"
              className="border-[#c1c1c1]-400 h-[48px] w-[456px] rounded-md border p-2"
              value={formData?.email}
              onChange={handleChange}
            />
            {err?.email && (
              <span className="text-[12px] font-[500] text-[red]">
                {err?.email}
              </span>
            )}

            <div className="relative">
              <label htmlFor="password" className="mt-6">
                Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                id="password"
                placeholder="Enter"
                className="border-[#c1c1c1]-400 h-[48px] w-[456px] rounded-md border p-2"
                value={formData?.password}
                onChange={handleChange}
              />
              <div
                className="absolute inset-y-0 right-0  top-4 flex items-center px-2"
                onClick={() => setShowPass(!showPass)}
              >
                <div className="border-#c1c1c1-1 cursor-pointer border-b">
                  Show
                </div>
              </div>
            </div>
            {err?.password && (
              <span className="text-[12px] font-[500] text-[red]">
                {err?.password}
              </span>
            )}

            <button
              type="submit"
              className="mt-6 h-[56px] w-[456px] rounded-md bg-[#000] py-2 text-white hover:bg-[#000]"
            >
              LOGIN
            </button>
          </form>
          <div className="relative top-[37px] w-[456px] m-auto border-t border-[#c1c1c1]-800">
          <div className="relative top-[17px] m-auto flex w-[261px]">
            <span className="pr-2 text-[16px] font-[400] text-[#333]">
              {" "}
              Dont have an account?
            </span>
            <div
              className="cursor-pointer text-[16px] font-[500]"
              onClick={() => router.push("/")}
            >
              SIGN UP
            </div>
          </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};
export default index;
