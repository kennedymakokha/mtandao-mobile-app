export type RootStackParamList = {
    Home: undefined;
    Onboarding: undefined;
    Dashboard: undefined
    AddProduct: undefined
    Product_detail: {
        product: Product;
    } | undefined | any;
    // Product_detail: { userId: string };
    // Add other routes here
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