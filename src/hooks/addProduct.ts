import { api } from '../services/api'
import { Product } from '../types'
import { toast } from 'react-toastify'
import { getProductStockAmount } from './commonCartFunctions'

interface addProductProps {
    productId: number
    cart: Product[]
    setCart: (cart: Product[]) => void
}

interface incrementProductProps {
    productToAdd: Product
    cart: Product[]
    setCart: (cart: Product[]) => void
}

export async function addProductToCart({productId, cart, setCart}: addProductProps) {
    const product = cart.find(product => product.id === productId)
    if (product){
        await incrementAmountIfIsInStock({productToAdd: product as Product, cart, setCart})
    } else {
        await addNewProductInCart({productId, cart, setCart})
    }
}

async function incrementAmountIfIsInStock({productToAdd, cart, setCart}: incrementProductProps){
    const amountInStock = await getProductStockAmount(productToAdd.id)
    if (isProductInStock(productToAdd, amountInStock)){
        incrementProductAmount({productToAdd, cart, setCart})
    }
}

function isProductInStock(product: Product, amountInStock: number) {
    if (product.amount < amountInStock){
        return true
    } else {
        toast.error('Quantidade solicitada fora de estoque')
        return false
    }
}

function incrementProductAmount({productToAdd, cart, setCart}: incrementProductProps) {
    const updatedCart = cart.map(product => incrementAmount(product, productToAdd.id))
    setCart(updatedCart)
}

export function incrementAmount(product: Product, productId: number) {
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