import { api } from '../services/api'
import { Product } from '../types'
import { toast } from 'react-toastify'
import { getProductStockAmount } from './commonCartFunctions'

interface addProductProps {
    productId: number
    cart: Product[]
    setCart: (cart: Product[]) => void
}

export async function addProductToCart({productId, cart, setCart}: addProductProps) {
    if (isProductInCart(cart, productId)){
        await incrementProductAmount({productId, cart, setCart})
    } else {
        await addNewProductInCart({productId, cart, setCart})
    }
}

function isProductInCart(cart: Product[], productId: number) {
    if (cart.find(product => product.id === productId)){
      return true
    }
    return false
}

async function incrementProductAmount({productId, cart, setCart}: addProductProps) {
    const updatedCart = await Promise.all(
        cart.map(product => incrementAmountIfIsInStock(product, productId))
    )
    setCart(updatedCart)
}

async function incrementAmountIfIsInStock(product: Product, productId: number){
    if (await isProductInStock(product, productId)){
        product = incrementAmountOfProductWithId(product, productId)
    }
    return product
}

async function isProductInStock(product: Product, productId: number) {
    const amountInStock = await getProductStockAmount(productId)
    if (product.amount < amountInStock){
        return true
    } else {
        toast.error('Quantidade solicitada fora de estoque')
        return false
    }
}

export function incrementAmountOfProductWithId(product: Product, productId: number) {
    if (product.id === productId){
        product.amount += 1
    }
    return product
}

async function addNewProductInCart({productId, cart, setCart}: addProductProps) {
    const product = await api.get<Product>(`/products/${productId}`)
    const newProduct = {
        ...product.data,
        amount: 1
    }
    setCart([...cart, newProduct])
}