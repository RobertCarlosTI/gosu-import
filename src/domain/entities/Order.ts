export interface OrderItem {
    id: string;
    perfumeId: string;
    name: string;
    brand: string;
    image: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: string;
    userId: string;
    status: string;
    paymentStatus: string;
    total: number;
    shippingType: string;
    shippingCost: number;
    address?: string;
    district?: string;
    isFinalized: boolean;
    createdAt: string;
    items: OrderItem[];
}