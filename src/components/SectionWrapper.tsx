// src/components/SectionWrapper.tsx

import { ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  bgColor?: string;
  children: ReactNode;
}

export default function SectionWrapper({ id, bgColor = "white", children }: SectionWrapperProps) {
  const bgClass = bgColor === "transparent" 
    ? "bg-transparent" 
    : bgColor === "white-coffee" 
      ? "bg-[#E8E2D6]" 
      : "bg-white";

  return (
    <section 
      id={id} 
      className={`${bgClass} py-20 sm:py-32`}
    >
      {children}
    </section>
  );
}