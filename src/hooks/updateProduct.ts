import { Product } from '../types'
import { toast } from 'react-toastify'
import { changeAmountOfProduct, getProductStockAmount } from './commonCartFunctions'

interface updateProductProps {
    productId: number
    amount: number
    cart: Product[]
    setCart: (cart: Product[]) => void
}

interface updateProductAmountProps {
    newAmount: number
    product: Product
    cart: Product[]
    setCart: (cart: Product[]) => void
}

async function updateProductAmountIfAvailable({newAmount, product, cart, setCart}: updateProductAmountProps) {
    let amountInStock = await getProductStockAmount(product.id)
    if (newAmount <= amountInStock){
        setCart(cart.map(product => changeAmountOfProduct(product, newAmount)))
    } else {
        toast.error('Quantidade solicitada fora de estoque')
    }
}

export async function updateProductInCart({productId, amount, cart, setCart}: updateProductProps){
    let product = cart.find(product => product.id === productId)
    if (product){
        let newAmount = product.amount + amount
        await updateProductAmountIfAvailable({newAmount, product, cart, setCart})
    }
}
