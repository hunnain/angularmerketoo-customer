// Products
export interface Product {
    id?: number;
    productId?: string,
    sellerId?: string;
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
    isInternationalShipping?: boolean;
    markdownPrice?: number;
    customImageUrl?: string;
    isApproved?: boolean;
    creationDate?: string;
    modificationDate?: null;
    discountBuy?: number;
    discountGet?: number;
    subCategory?: string;
    extendedSubCategory?: string;
    rating?: null;
    paymentOptions?: (string)[] | null;
    customMaterial?: string;
    promotions?: string;
    customDesign?: null;
    labels?: (string)[] | null;
    availableSizes?: (string)[] | null;
    availableColors?: (string)[] | null;
    feedbacks?: (FeedbacksEntity)[] | null;
    customColours?: string;
    customSize?: null;
    isValidForFeedback?: boolean;
    images?: (string)[] | null;
    image?: string;
    imageUrl?: string;
    imageUrls?: (string)[] | null;
}

export interface FeedbacksEntity {
    reviewTitle: string;
    review: string;
    rating: number;
    customer: Customer;
    creationTime: string;
    productId: string;
}
export interface Customer {
    username: string;
    image?: null;
}
