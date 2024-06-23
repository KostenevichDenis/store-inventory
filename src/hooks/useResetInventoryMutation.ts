import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InventoryService } from "@services/InvertoryService";
import { QUERY_TAGS } from "@/constants/queryTags";

export const useResetInventoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<[]>({
    mutationKey: [QUERY_TAGS.RESET_INVENTORY],
    mutationFn: InventoryService.resetInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_TAGS.INVENTORY_LIST] });
    },
	
  });
};