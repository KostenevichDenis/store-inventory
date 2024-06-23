import { InventoryList } from "../../InventoryList/InventoryList";
import { useProductsList } from "@hooks/useProductsList";
import { useInventoryList } from "@hooks/useInventoryList";

import styles from "./InventoryListPage.module.scss";
import { useResetInventoryMutation } from "@/hooks/useResetInventoryMutation";
import { Popup } from "@/components/Popup/Popup";
import { useCallback, useState } from "react";
import { AddProductsForm } from "@/components/AddProductsForm/AddProductsForm";

export const InventoryListPage: React.FC = () => {
  const inventoryList = useInventoryList();
  const productsList = useProductsList();
  const resetIventoryMutation = useResetInventoryMutation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = useCallback(() => setIsPopupOpen(false), [setIsPopupOpen]);

  if(inventoryList.isPending || productsList.isPending) {
    return (
      <div className={styles["container"]}>
        <div className="flex-center text-xl">Loading...</div>
      </div>
    );
  }

  if(inventoryList.error || productsList.error) {
    return (
      <div className={styles["container"]}>
        <div>Error: {inventoryList.error?.message && productsList.error?.message}</div>
      </div>
    );
  }

  if(!inventoryList.data || !productsList.data) {
    return (
      <>
        {isPopupOpen && (
          <Popup closePopup={closePopup}>Popup Content</Popup>
        )}
        <div className={styles["container"]}>
          <div>No data</div>
        </div>
      </>
    );
  }

  return (
    <div className={styles["container"]}>
      <h2 className={styles["title"]}>View and manage the store inventory</h2>
      <InventoryList
        items={inventoryList.data}
        resetIventoryMutation={resetIventoryMutation}
        openPopup={openPopup}
      />
      {isPopupOpen && (
        <Popup closePopup={closePopup}>
          <AddProductsForm productsList={productsList.data} inventoryList={inventoryList.data} closePopup={closePopup} />
        </Popup>
      )}
    </div>
  );
};