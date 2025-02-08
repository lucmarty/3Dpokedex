import { ComponentPropsWithoutRef } from "react";

export const HeightIcon = ({
  size = 24,
  className = "",
  ...props
}: ComponentPropsWithoutRef<"svg"> & { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      version="1.1"
      preserveAspectRatio="xMidYMid"
      className={`stroke-current ${className}`} 
      {...props}
    >
      <g id="SVGRepo_iconCarrier">
        <path d="M16 35L10 41L4 35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M16 13L10 7L4 13" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M10 7V41" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M44 9H22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M36 19H22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M44 29H22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M36 39H22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path>
      </g>
    </svg>
  );
};
