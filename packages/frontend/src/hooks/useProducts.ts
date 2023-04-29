import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import {
  ApiError,
  ProductsCollectionSchema,
  ProductsSchema,
} from "../api/generated";

const productKey = "product";

// getProduct (GET) /:productId
export function useGetProduct(productId: string) {
  return useQuery<ProductsSchema, ApiError>([productKey], () =>
    api.products.getProduct(productId)
  );
}

// getProducts (GET) /
export function useGetProducts({
  searchFilter,
  categoryFilter,
}: {
  searchFilter?: string;
  categoryFilter?: string[];
}) {
  return useQuery<ProductsCollectionSchema, ApiError>(
    [productKey],
    () => api.products.getProducts(),
    {
      select: (data: ProductsCollectionSchema) => {
        if (searchFilter) {
          data = data.filter((product: ProductsSchema) =>
            product.name.toLowerCase().includes(searchFilter.toLowerCase())
          );
        }
        if (categoryFilter && categoryFilter.length > 0) {
          data = data.filter((product: ProductsSchema) => {
            return categoryFilter.includes(product.category);
          });
        }
        return data;
      },
    }
  );
}

type ICreateProduct = Omit<ProductsSchema, "productId">;

// createProduct (POST) /
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation<ProductsSchema, ApiError, ICreateProduct>(
    ({ name, price, stock, description, image, category }) =>
      api.products.createProduct({
        name,
        price,
        stock,
        description,
        image,
        category,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([productKey]);
      },
    }
  );
}

// deleteProduct (DELETE) /
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation<ProductsSchema, ApiError, string>(
    (productId) => api.products.deleteProduct(productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([productKey]);
      },
      onMutate: async (productId) => {
        await queryClient.cancelQueries([productKey]);
        const previousProducts = queryClient.getQueryData([productKey]);
        queryClient.setQueryData([productKey], (old: any) => {
          return old.filter((product: ProductsSchema) => {
            return product.productId !== productId;
          });
        });
        return { previousProducts };
      },
    }
  );
}

// deleteProducts (DELETE) /
export function useDeleteProducts() {
  const queryClient = useQueryClient();
  return useMutation<ProductsCollectionSchema, ApiError, string[]>(
    (productId) =>
      api.products.deleteProducts({
        products: productId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([productKey]);
      },
      onMutate: async (productId) => {
        await queryClient.cancelQueries([productKey]);
        const previousProducts = queryClient.getQueryData([productKey]);
        queryClient.setQueryData([productKey], (old: any) => {
          return old.filter((product: ProductsSchema) => {
            return !productId.includes(product.productId);
          });
        });
        return { previousProducts };
      },
    }
  );
}

// updateProduct (PUT) /
export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation<ProductsSchema, ApiError, ProductsSchema>(
    ({ productId, name, price, stock, description, image, category }) =>
      api.products.updateProduct(productId, {
        name: name,
        price: price,
        stock: stock,
        description: description,
        image: image,
        category: category,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([productKey]);
      },
    }
  );
}
