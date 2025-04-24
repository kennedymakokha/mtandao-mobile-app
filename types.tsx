// export type RootStackParamList = {
//     Home: undefined;
//     Onboarding: undefined;
//     Splash: undefined
//     Dashboard: undefined
//     AddProduct: undefined

//     Auth: undefined
//     admin: undefined

// };
export type authStackParamList = {
    Onboarding: undefined;
    Splash: undefined
    Auth: undefined
    Home: undefined
    Root: undefined
};
export type clientStackParamList = {
    clientDashboard: undefined;
    Product_detail: {
        product: Product;
    } | undefined | any;

};
export type vendorStackParamList = {
    AdminDashboard: undefined;
    Createbusiness: undefined;
    Businesses: undefined
    BusinessesDetails: {
        product: Product;
    } | undefined | any;
};
export type AdminStackParamList = {
    admin: undefined;
    adminDrawer: undefined
    Businesses: undefined
    Createbusiness: undefined
    ProductsList: undefined
    BusinessesDetails: {
        business: Business;
    } | undefined | any;

};

export type Product = {
    town: string;
    id: string;
    name: string;
    price: number;
    images?: string[] | any;
    shopName?: string;
    location?: string;
    description?: string;
    lat?: any | number,
    lng?: any | number

};

export type Business = {
    _id?: any
    business_name: string;
    description?: string
    town?: any
    category: string;
    lat?: any
    lng?: any
    status?: boolean | any;
};

export type User = {
    id?: any
    confirm_password?: any

    fullname?: string
    role?: "admin" | "superAdmin" | "client";

    phone_number?: string,
    password?: string,
    username?: string,
    otp?: string
    code?: string

}