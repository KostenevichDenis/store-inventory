import { IInventoryItem } from "@services/InventoryService.type";
import styles from "./InventoryList.module.scss";
import { UseMutationResult } from "@tanstack/react-query";
import React from "react";
import { Table } from "@components/Table/Table";
import { Button } from "../Button/Button";
import { useSubmitInventoryMutation } from "@/hooks/useSubmitInventoryMutation";

type InventoryListProps = {
	items: IInventoryItem[];
	resetIventoryMutation: UseMutationResult<[], Error, void, unknown>
	openPopup: () => void,
}

export const InventoryList: React.FC<InventoryListProps> = React.memo(({ items, resetIventoryMutation, openPopup }) => {
  const submitInventory = useSubmitInventoryMutation();
  
  return (
    <div>
      <h3 className="flex-center">Current Inventory</h3>
      <div className={styles["table-actions"]}>
        <Button 
          className="button"
          onClick={openPopup}
        >Add new item</Button>
        <Button
          className="button"
          onClick={() => resetIventoryMutation.mutate()}
          disabled={resetIventoryMutation.isPending}
        >Reset inventory</Button>
      </div>
      <Table 
        columns={["Product name", "Quantity", "Actions"]}
        rows={items.map((item) => [item.name, item.quantity.toString(), "Remove"])}
        actions={[
          {
            index: 2,
            action: (payload) => {
              submitInventory.mutate(items.filter((item) => item.name !== payload));
            },
            actionPayloadIndex: 0,
            
          },
        ]}
        isSubmitting={submitInventory.isPending}
      />
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.items === nextProps.items;
});