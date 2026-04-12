export interface IOrderRepository {
    // Definimos que cualquier base de datos debe poder guardar una orden
    saveOrder(orderId: string, data: any): Promise<void>;
    getLatestOrder(userId: string): Promise<any>;
}