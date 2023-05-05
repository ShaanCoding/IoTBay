/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * UserSchema
 */
export type UserSchema = {
    userId: string;
    email: string;
    name: string;
    userType: UserSchema.userType;
    shippingAddress?: string;
    billingAddress?: string;
    dob?: string;
};

export namespace UserSchema {

    export enum userType {
        STAFF = 'staff',
        CUSTOMER = 'customer',
    }


}

