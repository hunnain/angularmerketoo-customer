// Products
export interface Product {
    id?: number;
    productId?: number,
    colour?: string;
    size?: string;
    title?: string;
    name?: string;
    description?: string;
    type?: string;
    brand?: string;
    collection?: any[];
    category?: string;
    price?: number;
    unitAmount?: number;
    sale?: boolean;
    discount?: number;
    stock?: number;
    new?: boolean;
    quantity?: number;
    tags?: any[];
    labels?: any[];
    availableSizes?: any[];
    availableColors?: any[];
    customColours?: string;
    customSize?: string;
    isValidForFeedback?: boolean;
    variants?: Variants[];
    images?: Images[];
    image?: string;
}

export interface Variants {
    variant_id?: number;
    id?: number;
    sku?: string;
    size?: string;
    color?: string;
    image_id?: number;
}

export interface Images {
    image_id?: number;
    id?: number;
    alt?: string;
    src?: string;
    variant_id?: any[];
}