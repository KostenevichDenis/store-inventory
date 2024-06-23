import { NavLink } from "react-router-dom";

import { ROUTES } from "@constants/routes";
import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>Store Inventory Management</h1>
      <nav className={styles.nav} aria-label="Main Navigation">
        <ul>
          <li>
            <NavLink
              to={ROUTES.INVENTORY_LIST}
              aria-label="Inventory List"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Inventory
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.CREATE_PRODUCT}
              aria-label="Create New Product"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Create Product
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
