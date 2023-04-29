import { Static, Type } from "@sinclair/typebox";

export const CategorySchema = Type.Object(
  {
    categoryId: Type.String(),
    name: Type.String(),
  },
  {
    description: "CategorySchema",
    $id: "CategorySchema",
  }
);

export const CategorySchemaRef = Type.Ref(CategorySchema);

export type CategorySchemaType = Static<typeof CategorySchema>;

export const CategoryCollectionSchema = Type.Array(CategorySchemaRef, {
  description: "CategoryCollectionSchema",
  $id: "CategoryCollectionSchema",
});

export const CategoryCollectionSchemaRef = Type.Ref(CategoryCollectionSchema);

export type CategoryCollectionSchemaType = Static<
  typeof CategoryCollectionSchema
>;

// Schema for categories CRUD operations

// getCategory (GET) /:categoryId
export const GetCategoryParamsSchema = Type.Object(
  {
    categoryId: Type.String(),
  },
  {
    description: "GetCategoryParamsSchema",
    $id: "GetCategoryParamsSchema",
  }
);

export const GetCategoryParamsSchemaRef = Type.Ref(GetCategoryParamsSchema);

export type GetCategoryParamsSchemaType = Static<
  typeof GetCategoryParamsSchema
>;

// createCategory (POST) /
export const CreateCategoryBodySchema = Type.Object(
  {
    name: Type.String(),
  },
  {
    description: "CreateCategoryBodySchema",
    $id: "CreateCategoryBodySchema",
  }
);

export const CreateCategoryBodySchemaRef = Type.Ref(CreateCategoryBodySchema);

export type CreateCategoryBodySchemaType = Static<
  typeof CreateCategoryBodySchema
>;

// deleteCategory (DELETE) /:productId
export const DeleteCategoryParamsSchema = Type.Object(
  {
    categoryId: Type.String(),
  },
  {
    description: "DeleteCategoryParamsSchema",
    $id: "DeleteCategoryParamsSchema",
  }
);

export const DeleteCategoryParamsSchemaRef = Type.Ref(
  DeleteCategoryParamsSchema
);

export type DeleteCategoryParamsSchemaType = Static<
  typeof DeleteCategoryParamsSchema
>;

// deleteCategories (DELETE) /
export const DeleteCategoriesBodySchema = Type.Object(
  {
    categoryIds: Type.Array(Type.String()),
  },
  {
    description: "DeleteCategoriesBodySchema",
    $id: "DeleteCategoriesBodySchema",
  }
);

export const DeleteCategoriesBodySchemaRef = Type.Ref(
  DeleteCategoriesBodySchema
);

export type DeleteCategoriesBodySchemaType = Static<
  typeof DeleteCategoriesBodySchema
>;

// updateCategory (PUT) /:productId
export const UpdateCategoryParamsSchema = Type.Object(
  {
    categoryId: Type.String(),
  },
  {
    description: "UpdateCategoryParamsSchema",
    $id: "UpdateCategoryParamsSchema",
  }
);

export const UpdateCategoryParamsSchemaRef = Type.Ref(
  UpdateCategoryParamsSchema
);

export type UpdateCategoryParamsSchemaType = Static<
  typeof UpdateCategoryParamsSchema
>;

export const UpdateCategoryBodySchema = Type.Object(
  {
    name: Type.String(),
  },
  {
    description: "UpdateCategoryBodySchema",
    $id: "UpdateCategoryBodySchema",
  }
);

export const UpdateCategoryBodySchemaRef = Type.Ref(UpdateCategoryBodySchema);

export type UpdateCategoryBodySchemaType = Static<
  typeof UpdateCategoryBodySchema
>;
