import { Product } from '../types'
import { api } from '../services/api'

interface commonCartFunctionsProps {
    product: Product
    productId: number
    amount: number
}

export function changeAmountOfProductWithId({product, productId, amount}: commonCartFunctionsProps) {
    if (product.id === productId){
        product.amount += amount
    }
    return product
}

export function changeAmountOfProduct(product: Product, newAmount: number) {
    product.amount += newAmount
    return product
}

export async function getProductStockAmount(productId: number){
    let amountInStock = await api.get<Product>(`/stock/${productId}`)
                                 .then(response => response.data.amount)
    return amountInStock
}