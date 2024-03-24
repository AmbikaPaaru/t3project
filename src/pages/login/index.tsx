import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  validateEmail,
  validatePassword,
} from "../../components/maincontent/functions";
import { User } from "~/components/maincontent";

interface Type {
  email?:string|undefined,
  password?:string|undefined
}
const Index = () => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState<Type>({
    email: "",
    password: "",
  });
  const [err, setErr] = useState<Type>({
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
    if (formData?.email  && formData?.password ) {
      const validateEmailField = validateEmail(formData.email, setErr);
      const validatePasswordField = validatePassword(formData.password, setErr);
      if (validateEmailField && validatePasswordField) {
        const usersListString = localStorage.getItem("registeredUsers");
        const usersList = usersListString ? JSON.parse(usersListString) : [];

        const FindEmail = usersList?.find(
          (item: User) => item?.email === formData?.email,
        );
        const FindPassword = usersList?.find(
          (item: User) => item?.password === formData?.password,
        );
        if (FindEmail && FindPassword) {
          setFormData({
            email: "",
            password: "",
          });
          setErr({
            email: "",
            password: "",
          });
          router.push("/home")
        } else {
          if (!FindEmail) {
            setErr({ email: "Email not found",password:"" });
          } else {
            setErr({ password: "Password is invalid",email:"" });
          }
        }
      }
    } else {
      setErr({
        email: "Please enter email",
        password: "Please enter password",
      });
    }
  };

  return (
    <div className="h-screen bg-[#fff]">
      <div className="border-[#C1C1C1]-600 relative top-[176px] h-[614px] w-[576px] rounded-[20px] border-2 m-auto">
        <div className="grid grid-cols-1 gap-4 p-6">
          <div className="text-center text-[32px] font-[600]">Login</div>
          <span className="text-center text-[24px] font-[500]">
            Welcome back to ECOMMERCE
          </span>
          <span className="text-center text-[16px] font-[400]">
            The next gen business marketplace
          </span>
          <form
            className="m-auto grid w-[456px] gap-1"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
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

            <div className="relative my-4">
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
          <div className="border-[#c1c1c1]-800 relative top-[37px] m-auto w-[456px] border-t">
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
export default Index;
