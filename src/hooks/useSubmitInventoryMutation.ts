import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InventoryService } from "@services/InvertoryService";
import { QUERY_TAGS } from "@/constants/queryTags";
import { IInventoryItem } from "@/services/InventoryService.type";

export const useSubmitInventoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_TAGS.SUBMIT_INVENTORY],
    mutationFn: (payload: IInventoryItem[]) => InventoryService.submitInventory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_TAGS.INVENTORY_LIST] });
    },
  });
};