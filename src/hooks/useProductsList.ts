import { useQuery } from "@tanstack/react-query";
import { InventoryService } from "@services/InvertoryService";
import { IProduct } from "@services/InventoryService.type";
import { QUERY_TAGS } from "@/constants/queryTags";

export const useProductsList = () => {
  return useQuery<IProduct[]>({ queryKey: [QUERY_TAGS.PRODUCTS_LIST], queryFn: InventoryService.getProductsList });
};