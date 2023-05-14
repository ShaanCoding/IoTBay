import { trpcReact } from "../App";

const categoryKey = "category";

// getCategory (GET) /:categoryId
export function useGetCategory(categoryId: string) {
  return trpcReact.categories.category.useQuery(categoryId);
}

// getCategories (GET) /
export function useGetCategories() {
  return trpcReact.categories.categories.useQuery();
}

export function useCreateCategory() {
  const context = trpcReact.useContext();

  return trpcReact.categories.create.useMutation({
    onSuccess: () => {
      context.categories.categories.invalidate();
    },
  });
}

// deleteCategory (DELETE) /
export function useDeleteCategory() {
  const context = trpcReact.useContext();
  return trpcReact.categories.delete.useMutation({
    onSuccess: () => {
      context.categories.categories.invalidate();
    },
  });
}

// deleteCategories (DELETE) /
export function useDeleteCategories() {
  const context = trpcReact.useContext();
  return trpcReact.categories.deleteMany.useMutation({
    onSuccess: () => {
      context.categories.categories.invalidate();
    }
  });
}

// export function useUpdateCategory() {
//   const context = trpcReact.useContext();

//   return trpcReact.categories.update.useMutation({
//     onSuccess: () => {
//       context.categories.categories.invalidate();
//     }
//   });
// }
