export interface OrderItem {
    id: string;
    name: string;
    brand: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: string;
    customerName: string;
    phone: string;
    address: string;
    location: string;
    total: number;
    items: OrderItem[];
    status: string;
}