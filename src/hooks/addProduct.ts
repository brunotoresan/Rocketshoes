import { api } from '../services/api'
import { Product } from '../types'
import { toast } from 'react-toastify'

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

function incrementAmountIfIsInStock(product: Product, productToAddId: number){
    if (isProductInStock(product, productToAddId)){
        product = incrementAmountOfProductWithId(product, productToAddId)
    }
    return product
}

async function isProductInStock(product: Product, productId: number) {
    let amounInStock = await api.get<Product>(`/stock/${productId}`)
                                .then(response => response.data.amount)
    if (amounInStock < product.amount){
        return true
    } else {
        toast.error('Quantidade solicitada fora de estoque');
        return false
    }
}

function incrementAmountOfProductWithId(product: Product, addedProductId: number) {
    if (product.id === addedProductId){
        product.amount += 1
    }
    return product
}

async function addNewProductInCart({productId, cart, setCart}: addProductProps) {
    await api.get<Product>(`/products/${productId}`)
             .then(response => {response.data.amount=1
                                return response.data})
             .then(response => {setCart([...cart, response])})
}