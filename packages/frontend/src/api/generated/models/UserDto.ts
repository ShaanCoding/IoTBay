/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * UserDto
 */
export type UserDto = {
    userId: string;
    email: string;
    name: string;
    userType: UserDto.userType;
    shippingAddress?: string;
    billingAddress?: string;
    dob?: string;
};

export namespace UserDto {

    export enum userType {
        STAFF = 'staff',
        CUSTOMER = 'customer',
    }


}
