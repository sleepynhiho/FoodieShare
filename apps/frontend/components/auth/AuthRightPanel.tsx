"use client";

import * as React from "react";

type Props = {
  title?: string;
  imageSrc?: string;
  imageAlt?: string;
  // Cho phép nhét thêm nội dung phụ (badge, bullet, v.v.)
  children?: React.ReactNode;
  className?: string;
};

export function AuthRightPanel({
  title = "Create your account to explore more features!",
  imageSrc = "/auth-illustration.png",
  imageAlt = "Auth illustration",
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`hidden col-span-3 xl:flex flex-col justify-evenly bg-bg-secondary/90 ${className}`}
    >
      {title ? (
        <span className="text-[22px] font-semibold text-white ml-28 uppercase">
          {title}
        </span>
      ) : null}

      {children}

      <img
        src={imageSrc}
        alt={imageAlt}
        className="block w-3/4 aspect-auto object-cover mx-auto -mt-8"
      />
    </div>
  );
}
