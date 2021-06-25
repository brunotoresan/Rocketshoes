import { Product } from '../types'
import { toast } from 'react-toastify'
import { getProductStockAmount } from './commonCartFunctions'

interface updateProductProps {
    productId: number
    newAmount: number
    cart: Product[]
    setCart: (cart: Product[]) => void
}

export async function updateProductAmountOrCatchError({productId, newAmount, cart, setCart}: updateProductProps) {
    try {
        await updateProductAmount({productId, newAmount, cart, setCart})
    } catch {
        toast.error('Erro na alteração de quantidade do produto');
    }
}

async function updateProductAmount({productId, newAmount, cart, setCart}: updateProductProps) {
    const amountInStock = await getProductStockAmount(productId)
    if (isValidAmount(newAmount, amountInStock)) {
        updateProductInCart({productId, newAmount, cart, setCart})
    } else {
        toast.error('Quantidade solicitada fora de estoque')
    }
}

function isValidAmount(newAmount: number, amountInStock: number){
    return (newAmount <= amountInStock) && (newAmount > 0)
}

function updateProductInCart({productId, newAmount, cart, setCart}: updateProductProps){
    const updatedCart = cart.map(product => updateAmountOfProductWithId(product, productId, newAmount))
    setCart(updatedCart)
}

function updateAmountOfProductWithId(product: Product, productToUpdateId: number, newAmount: number){
    if (product.id === productToUpdateId) {
        product.amount = newAmount
    }
    return product
}