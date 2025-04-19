export type RootStackParamList = {
    Home: undefined;
    Onboarding: undefined;
    Splash: undefined
    Dashboard: undefined
    AddProduct: undefined

    Auth: undefined
    admin: undefined
    Product_detail: {
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
    images?: string[]|any;
    shopName?: string;
    location?: string;
    description?: string;
    lat?: any | number,
    lng?: any | number

};

export type Business = {
    id?: any
    name: string;
    desc?: string
    town?: any
    category: string;
    lat?: any
    lng?: any
    status?: 'Active' | 'Inactive';
};