import { useRouter } from "next/router";
import React, { useRef, useState, RefObject, useEffect } from "react";

type Props = {};
export const codeLength = 8;
export const generateCodeArray = () =>
  Array.from({ length: codeLength + 1 }, (_, index) => index + 1);

const index = (props: Props) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const inputRefs: RefObject<HTMLInputElement | null>[] = Array.from(
    { length: codeLength + 1 },
    () => useRef<HTMLInputElement | null>(null),
  );
  const convertRef = <T extends HTMLInputElement>(
    ref: RefObject<HTMLInputElement | null>,
  ): RefObject<T> => ref as RefObject<T>;

  const [code, setCode] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ]);

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
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(router.asPath.split("?")[1]);
    const searchParam = urlParams.get("search");
    if (searchParam) {
      const decodedEmail = Buffer.from(searchParam, "base64").toString("utf-8");
      setEmail(decodedEmail);
    }
  }, []);

  const addStars = (str: string | undefined) => {
    if (str) {
      let modifiedString = str.slice(0, 3);
      for (let i = 3; i < str.length; i++) {
        modifiedString += "*";
      }
      return modifiedString;
    }
  };
  return (
    <div className="h-screen bg-[#fff]">
      <div className="border-[#C1C1C1]-600 relative top-[176px] m-auto h-[453px] w-[576px] rounded-[20px] border-2">
        <div className="grid grid-cols-1 gap-4 p-6">
          <div className="text-center text-[32px] font-[600]">
            {" "}
            Verify your email
          </div>

          <div className=" m-auto h-[42px] w-[334px] text-center text-[16px] font-[400]">
            {`Enter the 8 digit code you have received on ${addStars(email?.split("@")[0] ? email?.split("@")[0] : "")}@${email?.split("@")[1]}`}
          </div>
          <form className="m-auto grid w-[456px] gap-1" onSubmit={handleSubmit}>
            <label htmlFor="email" className="mt-6">
              Code
            </label>
            <div className="align-center flex h-[74px] w-[452px] items-center justify-between">
              {generateCodeArray()
                .slice(0, generateCodeArray().length - 1)
                .map((index) => (
                  <input
                    key={index}
                    // type="number"
                    maxLength={1}
                    pattern="[0-9]"
                    value={
                      code?.length > 0 && code[index - 1] ? code[index - 1] : ""
                    }
                    className="border-[#c1c1c1]-2 h-[48px] w-[46px] rounded-[5px] border text-center"
                    onInput={(e) => handleInput(index, e)}
                    onKeyDown={(e) => handleBackspace(index, e)}
                    ref={
                      inputRefs[index]
                        ? convertRef<HTMLInputElement>(inputRefs[index]!)
                        : null
                    }
                  />
                ))}
            </div>

            <button
              type="submit"
              className="mt-6 h-[56px] w-[456px] rounded-md bg-[#000] py-2 text-white hover:bg-[#000]"
              onClick={() => router.push("/login")}
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
