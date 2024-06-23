import styles from "./SubmitError.module.scss";

type SubmitErrorProps = {
	children: string | null | undefined;
}

export const SubmitError: React.FC<SubmitErrorProps> = ({ children }) => {
  if(!children) {
    return null;
  }
  return (
    <div className={styles["error"]}>
      {children}
    </div>
  );
};