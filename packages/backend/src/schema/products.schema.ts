import { Static, Type } from "@sinclair/typebox";

export const ProductsSchema = Type.Object(
  {
    productId: Type.String(),
    name: Type.String(),
    price: Type.Number(),
    stock: Type.Number(),
    description: Type.String(),
    image: Type.String(),
    category: Type.String(),
    // OrderLineItems: Type.Array(Type.String()),
    // Category: Type.String(),
    categoryId: Type.Optional(Type.String({ format: "uuid" })),
    lastUpdated: Type.Optional(Type.String({ format: "date-time" })),
  },
  {
    description: "ProductsSchema",
    $id: "ProductsSchema",
  }
);

export const ProductSchemaRef = Type.Ref(ProductsSchema);

export type ProductsSchemaType = Static<typeof ProductsSchema>;

export const ProductsCollectionSchema = Type.Array(ProductSchemaRef, {
  description: "ProductsCollectionSchema",
  $id: "ProductsCollectionSchema",
});

export const ProductsCollectionSchemaRef = Type.Ref(ProductsCollectionSchema);

export type ProductsCollectionSchemaType = Static<
  typeof ProductsCollectionSchema
>;

// Schema for products CRUD operations

// getProduct (GET) /:productId
export const GetProductParamsSchema = Type.Object(
  {
    productId: Type.String(),
  },
  {
    description: "GetProductParamsSchema",
    $id: "GetProductParamsSchema",
  }
);

export const GetProductParamsSchemaRef = Type.Ref(GetProductParamsSchema);

export type GetProductParamsSchemaType = Static<typeof GetProductParamsSchema>;

// createProduct (POST) /

export const CreateProductBodySchema = Type.Object(
  {
    name: Type.String(),
    price: Type.Number(),
    stock: Type.Number(),
    image: Type.String(),
    description: Type.String(),
    category: Type.String(),
  },
  {
    description: "CreateProductBodySchema",
    $id: "CreateProductBodySchema",
  }
);

export const CreateProductBodySchemaRef = Type.Ref(CreateProductBodySchema);

export type CreateProductBodySchemaType = Static<
  typeof CreateProductBodySchema
>;

// deleteProduct (DELETE) /:productId

export const DeleteProductParamsSchema = Type.Object(
  {
    productId: Type.String(),
  },
  {
    description: "DeleteProductParamsSchema",
    $id: "DeleteProductParamsSchema",
  }
);

export const DeleteProductParamsSchemaRef = Type.Ref(DeleteProductParamsSchema);

export type DeleteProductParamsSchemaType = Static<
  typeof DeleteProductParamsSchema
>;

// deleteProducts (DELETE) /

export const DeleteProductsBodySchema = Type.Object(
  {
    products: Type.Array(Type.String()),
  },
  {
    description: "DeleteProductsBodySchema",
    $id: "DeleteProductsBodySchema",
  }
);

export const DeleteProductsBodySchemaRef = Type.Ref(DeleteProductsBodySchema);

export type DeleteProductsBodySchemaType = Static<
  typeof DeleteProductsBodySchema
>;

// updateProduct (PUT) /

export const UpdateProductParamSchema = Type.Object(
  {
    productId: Type.String(),
  },
  {
    description: "UpdateProductParamSchema",
    $id: "UpdateProductParamSchema",
  }
);

export const UpdateProductParamSchemaRef = Type.Ref(UpdateProductParamSchema);

export type UpdateProductParamSchemaType = Static<
  typeof UpdateProductParamSchema
>;

export const UpdateProductBodySchema = Type.Object(
  {
    name: Type.Optional(Type.String()),
    price: Type.Optional(Type.Number()),
    stock: Type.Optional(Type.Number()),
    image: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    category: Type.Optional(Type.String()),
  },
  {
    description: "UpdateProductBodySchema",
    $id: "UpdateProductBodySchema",
  }
);

export const UpdateProductBodySchemaRef = Type.Ref(UpdateProductBodySchema);

export type UpdateProductBodySchemaType = Static<
  typeof UpdateProductBodySchema
>;
