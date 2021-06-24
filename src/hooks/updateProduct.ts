import { Product } from '../types'
import { toast } from 'react-toastify'
import { getProductStockAmount } from './commonCartFunctions'

interface updateProductProps {
    productId: number
    amountChange: number
    cart: Product[]
    setCart: (cart: Product[]) => void
}

export async function updateProductInCart({productId, amountChange, cart, setCart}: updateProductProps){
    const updatedCart = await Promise.all(
        cart.map(product => updateAmountOfProductWithId(product, productId, amountChange))
    )
    setCart(updatedCart)
}

async function updateAmountOfProductWithId(product: Product, productToUpdateId: number, amountChange: number){
    if (product.id === productToUpdateId) {
        const newProductAmount = await getUpdatedProductAmount(product, amountChange)
        product.amount = newProductAmount
    }
    return product
}

async function getUpdatedProductAmount(product: Product, amountChange: number) {
    const amountInStock = await getProductStockAmount(product.id)
    const newProductAmount = product.amount + amountChange
    if (newProductAmount <= amountInStock){
        return newProductAmount
    } else {
        toast.error('Quantidade solicitada fora de estoque')
        return product.amount
    }
}