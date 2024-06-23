import { useQuery } from "@tanstack/react-query";
import { InventoryService } from "@services/InvertoryService";
import { IInventoryItem } from "@services/InventoryService.type";
import { QUERY_TAGS } from "@/constants/queryTags";

export const useInventoryList = () => {
  return useQuery<IInventoryItem[]>({
    queryKey: [QUERY_TAGS.INVENTORY_LIST],
    queryFn: InventoryService.getInventoryList,
  });
};