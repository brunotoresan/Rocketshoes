import { Product } from '../types'
import { toast } from 'react-toastify'
import { getProductStockAmount } from './commonCartFunctions'

interface updateProductProps {
    productId: number
    newAmount: number
    cart: Product[]
    setCart: (cart: Product[]) => void
}

export async function updateProductInCart({productId, newAmount, cart, setCart}: updateProductProps){
    const updatedCart = await Promise.all(
        cart.map(product => updateAmountOfProductWithId(product, productId, newAmount))
    )
    setCart(updatedCart)
}

async function updateAmountOfProductWithId(product: Product, productToUpdateId: number, newAmount: number){
    if (product.id === productToUpdateId) {
        const productWithUpdatedAmount = await updateAmountIfIsAvailableInStock(product, newAmount)
        return productWithUpdatedAmount
    }
    return product
}

async function updateAmountIfIsAvailableInStock(product: Product, newAmount: number) {
    const amountInStock = await getProductStockAmount(product.id)
    if (newAmount <= amountInStock){
        product.amount = newAmount
    } else {
        toast.error('Quantidade solicitada fora de estoque')
    }
    return product
}