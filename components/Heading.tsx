import React from "react";

interface HeadingProps {
  title: string;
  description?: string;
  center?: boolean;
}

const Heading = ({ title, description, center }: HeadingProps) => {
  return (
    <div>
      <h1
        className={`text-2xl font-bold ${
          center ? "text-center" : "text-initial"
        }`}
      >
        {title}
      </h1>

      <div className="text-neutral-500 font-light">{description}</div>
    </div>
  );
};

export default Heading;
