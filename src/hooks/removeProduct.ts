import { Product } from '../types'
import { changeAmountOfProductWithId } from './commonCartFunctions'

interface removeProductProps {
    productId: number
    cart: Product[]
    setCart: (cart: Product[]) => void
}

export async function removeProductFromCart({productId, cart, setCart}: removeProductProps) {
    setCart(cart
        .map(product => changeAmountOfProductWithId({product, productId, amount: -1}))
        .filter(product => product.amount >= 1))
    localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart))
}
