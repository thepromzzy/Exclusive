"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import type { CartItem, WishlistItem, User, Product } from "./types"

type Currency = "USD" | "EUR" | "NGN" | "GHS"

interface CurrencyInfo {
  symbol: string
  label: string
}

const currencyMap: Record<Currency, CurrencyInfo> = {
  USD: { symbol: "$", label: "Dollar" },
  EUR: { symbol: "€", label: "Euro" },
  NGN: { symbol: "₦", label: "Naira" },
  GHS: { symbol: "GH₵", label: "Ghana Cedi" },
}

interface AppState {
  cart: CartItem[]
  wishlist: WishlistItem[]
  user: User | null
  isAuthenticated: boolean
  currency: Currency
}

type Action =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_CART_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "ADD_TO_WISHLIST"; payload: WishlistItem }
  | { type: "REMOVE_FROM_WISHLIST"; payload: string }
  | { type: "MOVE_TO_CART"; payload: string }
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<User> }
  | { type: "SET_CURRENCY"; payload: Currency }
  | { type: "LOAD_STATE"; payload: Partial<AppState> }

const initialState: AppState = {
  cart: [],
  wishlist: [],
  user: null,
  isAuthenticated: false,
  currency: "USD", // default currency
}

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        }
      }
      return { ...state, cart: [...state.cart, action.payload] }
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      }
    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      }
    case "CLEAR_CART":
      return { ...state, cart: [] }
    case "ADD_TO_WISHLIST": {
      const exists = state.wishlist.find((item) => item.id === action.payload.id)
      if (exists) return state
      return { ...state, wishlist: [...state.wishlist, action.payload] }
    }
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
      }
    case "MOVE_TO_CART": {
      const wishlistItem = state.wishlist.find((item) => item.id === action.payload)
      if (!wishlistItem) return state
      const cartItem: CartItem = { ...wishlistItem, quantity: 1 }
      const existingCartItem = state.cart.find((item) => item.id === action.payload)
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
        cart: existingCartItem
          ? state.cart.map((item) =>
              item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [...state.cart, cartItem],
      }
    }
    case "LOGIN":
      return { ...state, user: action.payload, isAuthenticated: true }
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false }
    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      }
    case "SET_CURRENCY":
      return { ...state, currency: action.payload }
    case "LOAD_STATE":
      return { ...state, ...action.payload }
    default:
      return state
  }
}

interface AppContextType extends AppState {
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void
  removeFromCart: (id: string) => void
  updateCartQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  addToWishlist: (product: Product) => void
  removeFromWishlist: (id: string) => void
  moveToCart: (id: string) => void
  login: (user: User) => void
  logout: () => void
  updateUser: (data: Partial<User>) => void
  setCurrency: (currency: Currency) => void
  cartTotal: number
  cartCount: number
  isInWishlist: (id: string) => boolean
  isInCart: (id: string) => boolean
  getCurrencyInfo: () => CurrencyInfo
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    const savedState = localStorage.getItem("exclusive-store")
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState)
        dispatch({ type: "LOAD_STATE", payload: parsed })
      } catch (e) {
        console.error("Failed to load state:", e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("exclusive-store", JSON.stringify(state))
  }, [state])

  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    const cartItem: CartItem = {
      ...product,
      quantity,
      selectedColor: color,
      selectedSize: size,
    }
    dispatch({ type: "ADD_TO_CART", payload: cartItem })
  }

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id })
  }

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
    } else {
      dispatch({ type: "UPDATE_CART_QUANTITY", payload: { id, quantity } })
    }
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const addToWishlist = (product: Product) => {
    dispatch({ type: "ADD_TO_WISHLIST", payload: product })
  }

  const removeFromWishlist = (id: string) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id })
  }

  const moveToCart = (id: string) => {
    dispatch({ type: "MOVE_TO_CART", payload: id })
  }

  const login = (user: User) => {
    dispatch({ type: "LOGIN", payload: user })
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
  }

  const updateUser = (data: Partial<User>) => {
    dispatch({ type: "UPDATE_USER", payload: data })
  }

  const setCurrency = (currency: Currency) => {
    dispatch({ type: "SET_CURRENCY", payload: currency })
  }

  const cartTotal = state.cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const cartCount = state.cart.reduce((count, item) => count + item.quantity, 0)

  const isInWishlist = (id: string) => state.wishlist.some((item) => item.id === id)

  const isInCart = (id: string) => state.cart.some((item) => item.id === id)

  const getCurrencyInfo = () => currencyMap[state.currency]

  return (
    <AppContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
        login,
        logout,
        updateUser,
        setCurrency,
        cartTotal,
        cartCount,
        isInWishlist,
        isInCart,
        getCurrencyInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}