import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ROUTES } from "@constants/routes";
 
export const TabTitle: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case ROUTES.INVENTORY_LIST:
        document.title = "Store Inventory Management";
        break;
      case ROUTES.CREATE_PRODUCT:
        document.title = "Create Product - Store Inventory Management";
        break;
      default:
        document.title = "Store Inventory Management";
    }
  }, [location.pathname]);

  return null;
};
