import React from "react";
import Image from "next/image";

interface AppProps {
  src: string;
  title: string;
  subtitle: string;
  children?: React.ReactElement;
}

export const EmptyState = ({
  src,
  title,
  subtitle,
  children,
}: AppProps): JSX.Element => {
  return (
    <div className="max-w-lg mx-auto flex flex-col justify-center items-center my-5">
      {src && (
        <div className="pt-16 text-center">
          <Image src={src} width={107} height={110} alt="image" />
        </div>
      )}
      <div className="mt-7">
        <h2 className="font-semibold text-3xl text-label text-center text-body mb-1">
          {title}
        </h2>
          <p className="text-base my-5 text-gray-500 text-center">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};

export default EmptyState;
