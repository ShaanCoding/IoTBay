/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * UserCollectionDto
 */
export type UserCollectionDto = Array<{
userId: string;
email: string;
name: string;
userType: 'staff' | 'customer';
shippingAddress?: string;
billingAddress?: string;
dob?: string;
}>;
