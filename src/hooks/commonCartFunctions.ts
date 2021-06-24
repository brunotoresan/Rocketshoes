import { Product } from '../types'
import { api } from '../services/api'

export async function getProductStockAmount(productId: number){
    const amountInStock = await api.get<Product>(`/stock/${productId}`)
                                   .then(response => response.data.amount)
    return amountInStock
}