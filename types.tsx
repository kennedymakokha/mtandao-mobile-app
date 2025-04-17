export type RootStackParamList = {
    Home: undefined;
    Onboarding: undefined;
    Dashboard: undefined
    AddProduct: undefined
    Auth: undefined
    admin: undefined
    Product_detail: {
        product: Product;
    } | undefined | any;
    // Product_detail: { userId: string };
    // Add other routes here
};
export type AdminStackParamList = {
    admin: undefined;
    Businesses: undefined
    Createbusiness: undefined
    ProductsList: undefined
    BusinessesDetails: {
        business: Business;
    } | undefined | any;

};

export type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    shopName: string;
    location: string;
    description?: string;
    lat?: string,
    lng?: string

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