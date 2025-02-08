import { ComponentPropsWithoutRef } from "react";

export const WeightIcon = ({
    size = 24,
    className = "",
    ...props
}: ComponentPropsWithoutRef<"svg"> & { size?: number }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            version="1.1"
            preserveAspectRatio="xMidYMid"
            className={`stroke-current ${className}`}
            {...props}
        >
            <g id="SVGRepo_bgCarrier"  strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M16.5 5H20.4C20.7314 5 21 5.26863 21 5.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V5.6C3 5.26863 3.26863 5 3.6 5H7.5" stroke="currentColor"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M16.2785 6.3288L16.4836 5.09864C16.4944 5.03333 16.4944 4.96667 16.4836 4.90136L16.2785 3.6712C16.1178 2.70683 15.2834 2 14.3057 2H9.69425C8.71658 2 7.8822 2.70683 7.72147 3.6712L7.51644 4.90136C7.50556 4.96667 7.50556 5.03333 7.51644 5.09864L7.72147 6.3288C7.8822 7.29317 8.71658 8 9.69425 8H14.3057C15.2834 8 16.1178 7.29317 16.2785 6.3288Z" stroke="currentColor"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M12 8L11 5.5" stroke="currentColor"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </g>
        </svg>
    );
};


