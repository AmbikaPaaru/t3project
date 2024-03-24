import { useRouter } from "next/router";
import React, { useRef, useState,RefObject } from "react";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../components/maincontent/functions";

type Props = {};
export const codeLength = 8;
export const generateCodeArray = () =>
  Array.from({ length: codeLength + 1 }, (_, index) => index + 1);

const index = (props: Props) => {
  const router = useRouter();
  const inputRefs: RefObject<HTMLInputElement | null>[] = Array.from({ length: codeLength + 1 }, () => useRef<HTMLInputElement | null>(null));
  const convertRef = <T extends HTMLInputElement>(ref: RefObject<HTMLInputElement | null>): RefObject<T> => ref as RefObject<T>;



  const [code, setCode] = useState<string[]>([]);

  const handleInput = (index: any, e: any) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length === 1) {
      const updatedCode = [...code];
      updatedCode[index - 1] = value;
      setCode(updatedCode);
      if (index === inputRefs?.length) {
        inputRefs[index]?.current?.focus();
      } else {
        inputRefs[index + 1]?.current?.focus();
      }
    }
  };

  const handleBackspace = (index: any, e: any) => {
    if (e.keyCode === 8 && index > 0) {
      e.preventDefault();
      const updatedCode = [...code];
      updatedCode[index - 1] = "";
      setCode(updatedCode);
      if (index <= 5 && index === inputRefs?.length) {
        inputRefs[index]?.current?.focus();
      } else {
        inputRefs[index - 1]?.current?.focus();
      }
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   
      const mockResponse = {
        status: "success",
        message: "User login successfully",
      };

      console.log("Mock Response:", mockResponse);

     
  };

  return (
    <div className="h-screen bg-[#fff]">
      <div className="border-[#C1C1C1]-600 relative left-[432px] top-[176px] h-[453px] w-[576px] rounded-[20px] border-2">
        <div className="grid grid-cols-1 gap-4 p-6">
          <div className="text-center text-[32px] font-[600]">
            {" "}
            Verify your email
          </div>

          <div className=" w-[334px] h-[42px] m-auto text-center text-[16px] font-[400]">
            Enter the 8 digit code you have received on anu***@gmail.com
          </div>
          <form className="m-auto grid w-[456px] gap-1" onSubmit={handleSubmit}>
            <label htmlFor="email" className="mt-6">
              Code
            </label>
            <div className="w-[452px] h-[74px] flex justify-between align-center items-center">
              {generateCodeArray()
                .slice(0, generateCodeArray().length - 1)
                .map((index) => (
                  <input
                    key={index}
                    type="number"
                    maxLength={1}
                    pattern="[0-9]"
                    value={
                      code?.length > 0 && code[index - 1] ? code[index - 1] : ""
                    }
                    className="border border-[#c1c1c1]-2 w-[46px] h-[48px] rounded-[5px] flex"
                    onInput={(e) => handleInput(index, e)}
                    onKeyDown={(e) => handleBackspace(index, e)}
                    ref={inputRefs[index] ? convertRef<HTMLInputElement>(inputRefs[index]!) : null}
                  />
                ))}
            </div>

            <button
              type="submit"
              className="mt-6 h-[56px] w-[456px] rounded-md bg-[#000] py-2 text-white hover:bg-[#000]"
              onClick={()=>router.push("/login")}
            >
              VERIFY
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default index;
