export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviews: number
  image: string
  category: string
  isNew?: boolean
  colors?: string[]
  sizes?: string[]
  description?: string
  inStock?: boolean
}

export interface CartItem extends Product {
  quantity: number
  selectedColor?: string
  selectedSize?: string
}

export interface WishlistItem extends Product {}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  address?: string
}

export interface Category {
  id: string
  name: string
  icon: string
}
