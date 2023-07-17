import React from "react";

interface HeadingProps {
  title: string;
  description: string;
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div>
      <h1>{title}</h1>

      <p>{description}</p>
    </div>
  );
};

export default Heading;
