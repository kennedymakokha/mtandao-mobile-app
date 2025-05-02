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
    clientMainArea: undefined
    Product_detail: {
        product: Product;
    } | undefined | any;
    business_detail: {
        business: Business;
    } | undefined | any;


};
export type vendorStackParamList = {
    AdminDashboard: undefined;
    Createbusiness: undefined;
    Businesses: undefined
    BusinessDetails: {
        product: Product;
    } | undefined | any;
};
export type AdminStackParamList = {
    admin: undefined;
    adminDrawer: undefined
    Businesses: undefined
    Createbusiness: undefined
    ProductsList: undefined
    BusinessDetails: {
        business: Business;
    } | undefined | any;

};

export type Product = {
    business: string | any;
    id: string;
    product_name: string;
    price: number;
    images?: string[] | any;


    description?: string;


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