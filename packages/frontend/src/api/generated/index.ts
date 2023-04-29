/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { IoTBayClient } from './IoTBayClient';

export { ApiError } from './core/ApiError';
export { BaseHttpRequest } from './core/BaseHttpRequest';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { CategoryCollectionSchema } from './models/CategoryCollectionSchema';
export type { CategorySchema } from './models/CategorySchema';
export type { CreateCategoryBodySchema } from './models/CreateCategoryBodySchema';
export type { CreateProductBodySchema } from './models/CreateProductBodySchema';
export type { DeleteCategoriesBodySchema } from './models/DeleteCategoriesBodySchema';
export type { DeleteCategoryParamsSchema } from './models/DeleteCategoryParamsSchema';
export type { DeleteProductParamsSchema } from './models/DeleteProductParamsSchema';
export type { DeleteProductsBodySchema } from './models/DeleteProductsBodySchema';
export type { GetCategoryParamsSchema } from './models/GetCategoryParamsSchema';
export type { GetProductParamsSchema } from './models/GetProductParamsSchema';
export type { LoginSchema } from './models/LoginSchema';
export type { ProductsCollectionSchema } from './models/ProductsCollectionSchema';
export type { ProductsSchema } from './models/ProductsSchema';
export type { RegisterSchema } from './models/RegisterSchema';
export type { UpdateCategoryBodySchema } from './models/UpdateCategoryBodySchema';
export type { UpdateCategoryParamsSchema } from './models/UpdateCategoryParamsSchema';
export type { UpdateProductBodySchema } from './models/UpdateProductBodySchema';
export type { UpdateProductParamSchema } from './models/UpdateProductParamSchema';
export type { UserCollectionSchema } from './models/UserCollectionSchema';
export { UserSchema } from './models/UserSchema';

export { AuthenticationService } from './services/AuthenticationService';
export { CategoriesService } from './services/CategoriesService';
export { ProductsService } from './services/ProductsService';
export { UsersService } from './services/UsersService';
