import { Product } from '../types'
import { toast } from 'react-toastify'

interface updateProductProps {
    productId: number
    newAmount: number
    amountInStock: number
    cart: Product[]
    setCart: (cart: Product[]) => void
}

export async function updateProductInCart({productId, newAmount, amountInStock, cart, setCart}: updateProductProps){
    const updatedCart = cart.map(product => updateAmountOfProductWithId(product, productId, newAmount, amountInStock))
    setCart(updatedCart)
}

function updateAmountOfProductWithId(product: Product, productToUpdateId: number, newAmount: number, amountInStock: number){
    if (product.id === productToUpdateId) {
        const productWithUpdatedAmount = updateAmountIfIsAvailableInStock(product, newAmount, amountInStock)
        return productWithUpdatedAmount
    }
    return product
}

function updateAmountIfIsAvailableInStock(product: Product, newAmount: number, amountInStock: number) {
    if (newAmount <= amountInStock){
        product.amount = newAmount
    } else {
        toast.error('Quantidade solicitada fora de estoque')
    }
    return product
}