import styles from "./Popup.module.scss";

// I want to block clicks behind the popup

type PopupProps = {
	children: React.ReactNode,
	closePopup: () => void,
}

export const Popup: React.FC<PopupProps> = ({ children, closePopup }) => {

  return (
    <>
      <div className={styles["popup__overlay"]}/>
      <div className={styles["popup"]}>
        <button
          className={styles["popup__close"]}
          onClick={closePopup}
        >X</button>
        {children}
      </div>
    </>
  );
};