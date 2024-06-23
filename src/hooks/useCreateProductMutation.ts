import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InventoryService } from "@services/InvertoryService";
import { QUERY_TAGS } from "@/constants/queryTags";
import { IProduct } from "@/services/InventoryService.type";

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_TAGS.CREATE_PRODUCT],
    mutationFn: (payload: IProduct) => InventoryService.createProduct({ ...payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_TAGS.PRODUCTS_LIST] });
    },
  });
};