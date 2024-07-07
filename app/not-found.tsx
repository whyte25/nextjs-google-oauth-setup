"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import NotFoundImg from "@/assests/PNG/404.png";
import { twMerge } from "tailwind-merge";

interface INotFound {
  className?: string;
  title?: string;
  buttonText?: string;
  description?: string;
}

const NotFound = ({ className, title, buttonText, description }: INotFound) => {
  return (
    <div
      className={twMerge(
        "flex items-center h-screen justify-center flex-col space-y-4 ",
        className
      )}
    >
      <Image priority src={NotFoundImg} height={300} width={300} alt="error" />
      <div className="space-y-1 text-center">
        <h2 className=" text-2xl sm:text-3xl mx-auto w-5/6  sm:w-full   font-semibold">
          {title || "Page Not Found"}
        </h2>
        <p className="text-gray-500 text-center w-[350px] text-sm">
          {description}
        </p>
      </div>
      <Button asChild>
        <Link href="/">{buttonText || "Go back"}</Link>
      </Button>
    </div>
  );
};

export default NotFound;
