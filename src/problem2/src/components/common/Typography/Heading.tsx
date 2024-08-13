import React from "react";
import { twMerge } from "tailwind-merge";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: number;
  className?: string;
}

const headingStyles = "mx-0 my-0 block text-colors-text";
const NUMBER_OF_HEADINGS = 6;

export const Heading: React.FunctionComponent<HeadingProps> = ({
  level = 1,
  className = "",
  children,
  ...rest
}) => {
  const headings = [
    <h1
      className={twMerge("text-2xl font-bold", headingStyles, className)}
      {...rest}
    >
      {children}
    </h1>,
    <h1
      className={twMerge("text-2xl font-bold", headingStyles, className)}
      {...rest}
    >
      {children}
    </h1>,
    <h2
      className={twMerge("text-xl font-medium", headingStyles, className)}
      {...rest}
    >
      {children}
    </h2>,
    <h3
      className={twMerge("text-lg font-medium", headingStyles, className)}
      {...rest}
    >
      {children}
    </h3>,
    <h4
      className={twMerge("text-base font-medium", headingStyles, className)}
      {...rest}
    >
      {children}
    </h4>,
    <h5
      className={twMerge("text-sm font-medium", headingStyles, className)}
      {...rest}
    >
      {children}
    </h5>,
    <h6
      className={twMerge("text-sm font-medium", headingStyles, className)}
      {...rest}
    >
      {children}
    </h6>,
  ];

  return <>{level <= NUMBER_OF_HEADINGS && headings[level]}</>;
};
