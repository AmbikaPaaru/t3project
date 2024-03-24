import { useRouter } from "next/router";
import React, { useState } from "react";
import { validateEmail, validateName, validatePassword } from "./functions";

type Props = {};

const index = (props: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState({
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
      const validateNameField = validateName(formData?.name, setErr);
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

        const mockResponse = {
          status: "success",
          message: "User registered successfully",
        };

        console.log("Mock Response:", mockResponse);

        router.push("/emailVerification");
        // try {
        //   const response = await fetch('https://api.neon.tech/v1/2sudo systemctl restart systemd-resolvedsudo systemctl restart systemd-resolvedsudo systemctl restart systemd-resolvedsudo systemctl restart systemd-resolved/registered_users2', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'Authorization': 'Bearer qot5bj65ujdt0unjc9j82ix02jtfp3ri07qvkozx0twewmueoc817k7cb7s2fc8t' // Replace with your Neon.tech API key
        //     },
        //     body: JSON.stringify(formData)
        //   });

        //   if (!response.ok) {
        //     throw new Error('Failed to store form data in Neon.tech');
        //   }

        //   console.log('Form data stored successfully in Neon.tech');
        // } catch (error) {
        //   console.error('Error storing form data in Neon.tech:', error);
        // }
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
      }
    } else {
      setErr({
        name: "Please enter name",
        email: "Please enter email",
        password: "Please enter password",
      });
    }
  };

  return (
    <div className="h-screen bg-[#fff]">
      <div className="border-[#C1C1C1]-600 relative left-[432px] top-[176px] h-[614px] w-[576px] rounded-[20px] border-2">
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
