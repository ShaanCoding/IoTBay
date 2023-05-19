import { t } from '../trpc';
import { authRouterDefinition } from './auth.router';
import { categoryRouterDefinition } from './categories.router';
import { productsRouterDefinition } from './products.router';
import { staffRouterDefinition } from './staff.router';
import { userRouterDefinition } from './user.router';
import { customerRouterDefinition } from './customer.router'



export const appRouter = t.router({
  auth: authRouterDefinition,
  users: userRouterDefinition,
  products: productsRouterDefinition,
  categories: categoryRouterDefinition,
  staff: staffRouterDefinition,
  customer: customerRouterDefinition,
});

// export type definition of API
export type AppRouter = typeof appRouter;