import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import {
  ApiError,
  CategoryCollectionSchema,
  CategorySchema,
} from "../api/generated";

const categoryKey = "category";

// getCategory (GET) /:categoryId
export function useGetCategory(categoryId: string) {
  return useQuery<CategorySchema, ApiError>([categoryKey, categoryId], () =>
    api.categories.getCategory(categoryId)
  );
}

// getCategories (GET) /
export function useGetCategories() {
  return useQuery<CategoryCollectionSchema, ApiError>([categoryKey], () =>
    api.categories.getCategories()
  );
}

// createCategory (POST) /
interface ICreateCategory {
  name: string;
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation<CategorySchema, ApiError, ICreateCategory>(
    (data) => api.categories.createCategory(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([categoryKey]);
      },
    }
  );
}

// deleteCategory (DELETE) /
export function useDeleteCategory(categoryId: string) {
  const queryClient = useQueryClient();
  return useMutation<unknown, ApiError, string>(
    (categoryId) => api.categories.deleteCategory(categoryId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([categoryKey]);
      },
    }
  );
}

// deleteCategories (DELETE) /
export function useDeleteCategories() {
  const queryClient = useQueryClient();
  return useMutation<unknown, ApiError, string[]>(
    (categoryIds) =>
      api.categories.deleteCategories({
        categoryIds: categoryIds,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([categoryKey]);
      },
    }
  );
}

interface IUpdateCategory {
  categoryId: string;
  requestBody: {
    name: string;
  };
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation<CategorySchema, ApiError, IUpdateCategory>(
    (data) => api.categories.updateCategory(data.categoryId, data.requestBody),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([categoryKey]);
      },
    }
  );
}
