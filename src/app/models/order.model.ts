export interface OrderModel {
    id: number;
    userId: string;     
    toyId: number;       
    toyName: string;     
    quantity: number;
    totalPrice: number;
    address: string;
    phone: string;
    note?: string;
    date: string;        
    status: 'ordered' | 'arrived' | 'cancelled'; 
}