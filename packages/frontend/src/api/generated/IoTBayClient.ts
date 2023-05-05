/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';

import { AuthenticationService } from './services/AuthenticationService';
import { CategoriesService } from './services/CategoriesService';
import { ProductsService } from './services/ProductsService';
import { UsersService } from './services/UsersService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class IoTBayClient {

    public readonly authentication: AuthenticationService;
    public readonly categories: CategoriesService;
    public readonly products: ProductsService;
    public readonly users: UsersService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'http://localhost:3000',
            VERSION: config?.VERSION ?? '0.1.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.authentication = new AuthenticationService(this.request);
        this.categories = new CategoriesService(this.request);
        this.products = new ProductsService(this.request);
        this.users = new UsersService(this.request);
    }
}

