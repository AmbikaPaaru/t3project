import React from "react";
import Image from "next/image";
import Cart from "../../icons/Cart.svg";
import Search from "../../icons/Search.svg";
import back from "../../icons/back.svg";
import forward from "../../icons/forward.svg";

type Props = {};

const navItems = [
  {
    id: 1,
    title: "Categories",
  },
  {
    id: 2,
    title: "Sale",
  },
  {
    id: 3,
    title: "Clearance",
  },
  {
    id: 4,
    title: "New Stock",
  },
  {
    id: 5,
    title: "Trending",
  },
];
const index = (props: Props) => {
  return (
    <>
      <div className="h-[100px] w-full bg-white px-6">
        <div className="font-400] align-center flex h-[36px] items-center justify-end text-[12px] text-[#333333]">
          <span className="px-4">Help</span>
          <span>Orders & Returns</span>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="text-center text-[32px] font-[700] text-[#000]">
            ECOMMERCE
          </div>
          <div>
            {navItems?.map((item: { id: number; title: string }) => (
              <span
                className="px-4 text-[16px] font-[600] text-[#000]"
                key={item?.id}
              >
                {item?.title}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-end">
            <Image src={Cart} alt="noimg" className="mx-4" />
            <Image src={Search} alt="noImg" />
          </div>
        </div>
      </div>
      <div className="align-center flex h-[36px] items-center justify-center  bg-[#F4F4F4]">
        <Image src={back} alt="npimg" />
        <span className="text[14px] mx-4 font-[500] text-[#000]">
          Get 10% off on business sign up
        </span>
        <Image src={forward} alt="noimg" />
      </div>
    </>
  );
};

export default index;
