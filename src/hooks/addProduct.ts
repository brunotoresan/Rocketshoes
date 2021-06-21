import { api } from '../services/api'
import { Product } from '../types'
import { toast } from 'react-toastify'
import { changeAmountOfProductWithId, getProductStockAmount } from './commonCartFunctions'

interface addProductProps {
    productId: number
    cart: Product[]
    setCart: (cart: Product[]) => void
}

export async function addProductToCart({productId, cart, setCart}: addProductProps) {
    if (isProductInCart(cart, productId)){
        incrementProductAmount({productId, cart, setCart})
    } else {
        await addNewProductInCart({productId, cart, setCart})
    }
    localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart))
}

function isProductInCart(cart: Product[], productId: number) {
    if (cart.find(product => product.id === productId)){
      return true
    }
    return false
}

function incrementProductAmount({productId, cart, setCart}: addProductProps) {
    setCart(cart.map(product => incrementAmountIfIsInStock(product, productId)))
}

function incrementAmountIfIsInStock(product: Product, productId: number){
    if (isProductInStock(product, productId)){
        product = changeAmountOfProductWithId({product, productId, amount: 1})
    }
    return product
}

async function isProductInStock(product: Product, productId: number) {
    let amountInStock = await getProductStockAmount(productId)
    if (product.amount < amountInStock){
        return true
    } else {
        toast.error('Quantidade solicitada fora de estoque')
        return false
    }
}

async function addNewProductInCart({productId, cart, setCart}: addProductProps) {
    await api.get<Product>(`/products/${productId}`)
             .then(response => {response.data.amount=1
                                return response.data})
             .then(response => {setCart([...cart, response])})
}