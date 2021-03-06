import { createContext, ReactNode, useContext, useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { addProductToCart } from './addProduct'
import { updateProductAmountOrCatchError } from './updateProduct'
import { Product } from '../types';

interface CartProviderProps {
  children: ReactNode
}

interface UpdateProductAmount {
  productId: number
  amount: number
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
    const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart')

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const isInitialRender = useRef(true);

  function storeCartDataOnlyOnUpdate(cart: Product[]){
    if (isInitialRender.current) {
        isInitialRender.current = false;
    } else {
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart))
    }
  }

  useEffect(() => {
    storeCartDataOnlyOnUpdate(cart)
  }, [cart])

  const addProduct = async (productId: number) => {
    try {
      await addProductToCart({productId, cart, setCart})
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    const product = cart.find(product => product.id === productId)
    if (product){
        setCart(cart.filter(product => product.id !== productId))
    } else {
        toast.error('Erro na remoção do produto')
    }    
  };

  const updateProductAmount = async ({
    productId,
    amount
  }: UpdateProductAmount) => {
    updateProductAmountOrCatchError({productId, newAmount: amount, cart, setCart})
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
