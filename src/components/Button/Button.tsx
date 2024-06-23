import cn from "classnames";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: string;
}

export const Button: React.FC<ButtonProps> = ({ children, ...args }) => {
  return (
    <button
      aria-label={children}
      {...args}
      className={cn(styles["button"], args.className)}
    >
      {children}
    </button>
  );
};