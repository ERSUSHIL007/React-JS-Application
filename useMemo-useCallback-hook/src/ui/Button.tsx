import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <button className="btn btn-primary" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
