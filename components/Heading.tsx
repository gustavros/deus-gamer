import React from "react";

interface HeadingProps {
  title: string;
  description?: string;
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>

      <div className="text-neutral-500 font-light">{description}</div>
    </div>
  );
};

export default Heading;
