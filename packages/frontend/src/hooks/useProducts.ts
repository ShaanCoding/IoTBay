import { trpcReact } from "../App";
import React from "react";

const productKey = "product";

// getProduct (GET) /:productId
export function useGetProduct(productId: string) {
  return trpcReact.products.product.useQuery(productId);
}

// getProducts (GET) /
export function useGetProducts({
  searchFilter,
  categoryFilter,
}: {
  searchFilter?: string;
  categoryFilter?: string[];
}) {
  const { data, ...rest } = trpcReact.products.products.useQuery();

  const filteredData = React.useMemo(() => {
    if (searchFilter) {
      return data?.filter((product) =>
        product.name.toLowerCase().includes(searchFilter.toLowerCase())
      ) || [];
    }
    if (categoryFilter && categoryFilter.length > 0) {
      return data?.filter((product) => {
        return categoryFilter.includes(product.category || "");
      }) || [];
    }
    return data || [];
  }, [data, searchFilter, categoryFilter]);

  return {
    data: filteredData,
    ...rest,
  };
}

// createProduct (POST) /
export function useCreateProduct() {
  const context = trpcReact.useContext();

  return trpcReact.products.create.useMutation({
    onSuccess: () => {
      context.products.products.invalidate();
    }
  });
}

// deleteProduct (DELETE) /
export function useDeleteProduct() {
  const context = trpcReact.useContext();

  return trpcReact.products.delete.useMutation({
    onSuccess: () => {
      context.products.products.invalidate();
    },
  });
}

// deleteProducts (DELETE) /
export function useDeleteProducts() {
  // const queryClient = useQueryClient();
  // return useMutation<ProductsCollectionSchema, ApiError, string[]>(
  //   (productId) =>
  //     api.products.deleteProducts({
  //       products: productId,
  //     }),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries([productKey]);
  //     },
  //     onMutate: async (productId) => {
  //       await queryClient.cancelQueries([productKey]);
  //       const previousProducts = queryClient.getQueryData([productKey]);
  //       queryClient.setQueryData([productKey], (old: any) => {
  //         return old.filter((product: ProductsSchema) => {
  //           return !productId.includes(product.productId);
  //         });
  //       });
  //       return { previousProducts };
  //     },
  //   }
  // );

  const context = trpcReact.useContext();

  return trpcReact.products.deleteMany.useMutation({
    onSuccess: () => {
      context.products.products.invalidate();
    }
  });
}

// updateProduct (PUT) /
export function useUpdateProduct() {
  const context = trpcReact.useContext();

  return trpcReact.products.update.useMutation({
    onSuccess: () => {
      context.products.products.invalidate();
    }
  });
}
