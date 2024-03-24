import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { validateEmail, validateName, validatePassword } from "./functions";

type Props = {};

export interface User {
  name?: string | undefined;
  email?: string| undefined;
  password?: string | undefined;
}
const index = (props: Props) => {
  const router = useRouter();
  const [usersList, setUsersList] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState<User>({
    name: "",
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
    if (
      formData?.name?.length > 0 &&
      formData?.email?.length > 0 &&
      formData?.password?.length > 0
    ) {
      const validateNameField = validateName(formData?.name?formData?.name:"", setErr);
      const validateEmailField = validateEmail(formData?.email, setErr);
      const validatePasswordField = validatePassword(
        formData?.password,
        setErr,
      );

      if (validateEmailField && validateNameField && validatePasswordField) {
        const newUser = {
          username: formData.name,
          email: formData.email,
          password: formData.password,
        };
        const FindEmail = usersList?.find(
          (item) => item?.email === formData?.email,
        );
        if (!FindEmail) {
          setUsersList((prevUsersList) => {
            const updatedUsersList = [...prevUsersList, newUser];
            localStorage.setItem(
              "registeredUsers",
              JSON.stringify(updatedUsersList),
            );
            return updatedUsersList;
          });
          setFormData({
            name: "",
            email: "",
            password: "",
          });
          setErr({
            name: "",
            email: "",
            password: "",
          });
          router.push(`/emailVerification?search=${btoa(formData?.email)}`);
        } else {
          setErr({ email: "Email already registered",password:"",name:"" });
        }
      }
    } else {
      setErr({
        name: "Please enter name",
        email: "Please enter email",
        password: "Please enter password",
      });
    }
  };

  useEffect(() => {
    const storedUsersData = localStorage.getItem("registeredUsers");
    if (storedUsersData) {
      setUsersList(JSON.parse(storedUsersData));
    }
  }, []);

  return (
    <div className="h-screen bg-[#fff]">
      <div className="border-[#C1C1C1]-600 relative top-[176px] h-[614px] w-[576px] rounded-[20px] border-2 m-auto">
        <div className="grid grid-cols-1 gap-4 p-6">
          <div className="text-center text-[32px] font-[600]">
            Create your account
          </div>
          <form
            className="m-auto grid w-[456px] gap-1"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter"
              className="border-[#c1c1c1]-400 focus:border-[#c1c1c1]-400 active:border-[#c1c1c1]-400 h-[48px] w-[456px] rounded-md border p-2"
              value={formData?.name}
              onChange={handleChange}
            />
            {err?.name && (
              <span className="text-[12px] font-[500] text-[red]">
                {err?.name}
              </span>
            )}

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

            <label htmlFor="password" className="mt-6">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter"
              className="border-[#c1c1c1]-400 h-[48px] w-[456px] rounded-md border p-2"
              value={formData?.password}
              onChange={handleChange}
            />
            {err?.password && (
              <span className="text-[12px] font-[500] text-[red]">
                {err?.password}
              </span>
            )}

            <button
              type="submit"
              className="mt-6 h-[56px] w-[456px] rounded-md bg-[#000] py-2 text-white hover:bg-[#000]"
            >
              CREATE ACCOUNT
            </button>
          </form>
          <div className="relative top-[37px] m-auto flex w-[204px]">
            <span className="pr-2 text-[16px] font-[400] text-[#333]">
              {" "}
              Have an account?
            </span>
            <div
              className="cursor-pointer text-[16px] font-[500]"
              onClick={() => router.push("/login")}
            >
              LOGIN
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default index;
