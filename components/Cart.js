import React, {
  useReducer,
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react'

import Amplify from 'aws-amplify'
import { DataStore } from '@aws-amplify/datastore'
import { Products as apiProducts } from '../src/models'

import awsmobile from '../src/aws-exports'

Amplify.configure(awsmobile)

export const ThemeContext = React.createContext()
export const ThemeUpdateContext = React.createContext()

/*
const products = [
  {
    id: 1,
    name: 'Bounce House A',
    category: 'Bounce House',
    img: 'test',
    height: 12,
    width: 10,
    length: 24,
    shortdesc: 'Fantastic bounce house just the perfect size',
    longdesc: `This bounce house is sure to please. Fits at least 6 kids comfortably at a time.`,
    incart: 0,
    qty: 2,
    increment: 1,
    price: 25,
  },
  {
    id: 2,
    name: 'Bounce House B',
    category: 'Bounce House',
    img: 'test',
    height: 12,
    width: 10,
    length: 24,
    shortdesc: 'Fantastic bounce house just the perfect size',
    longdesc: `This bounce house is sure to please. Fits at least 6 kids comfortably at a time.`,
    incart: 0,
    qty: 5,

    increment: 1,
    price: 50,
  },
  {
    id: 3,
    name: 'Bounce House C',
    category: 'Bounce House',
    img: 'test',
    height: 12,
    width: 10,
    length: 24,
    shortdesc: 'Fantastic bounce house just the perfect size',
    longdesc: `This bounce house is sure to please. Fits at least 6 kids comfortably at a time.`,
    incart: 0,
    qty: 5,
    increment: 1,
    price: 100,
  },
  {
    id: 4,
    name: 'Bounce House D',
    category: 'Bounce House',
    img: 'test',
    height: 12,
    width: 10,
    length: 24,
    shortdesc: 'Fantastic bounce house just the perfect size',
    longdesc: `This bounce house is sure to please. Fits at least 6 kids comfortably at a time.`,
    incart: 0,
    qty: 4,
    increment: 1,
    price: 35,
  },
  {
    id: 5,
    name: 'Bounce House E',
    category: 'Bounce House',
    img: 'test',
    height: 12,
    width: 10,
    length: 24,
    shortdesc: 'Fantastic bounce house just the perfect size',
    longdesc: `This bounce house is sure to please. Fits at least 6 kids comfortably at a time.`,
    incart: 0,
    qty: 20,
    increment: 1,
    price: 25,
  },
  {
    id: 6,
    name: 'Bounce House F',
    category: 'Bounce House',
    img: 'test',
    height: 12,
    width: 10,
    length: 24,
    shortdesc: 'Fantastic bounce house just the perfect size',
    longdesc: `This bounce house is sure to please. Fits at least 6 kids comfortably at a time.`,
    incart: 0,
    qty: 2,
    increment: 1,
    price: 60,
  },
]
*/
var products = null

const getData = async () => {
  const data = await DataStore.query(apiProducts)
  console.log('this is the products data in product search', data)
  products = [...data]
}

getData()

export function useItems() {
  return useContext(ThemeContext)
}

export function useItemsUpdate() {
  return useContext(ThemeUpdateContext)
}

export function ThemeProvider({ children }) {
  const [items, setItems] = useState([])
  //const [cartQty, setCartQty] = useState(0)
  useEffect(() => {
    return items
  }, [items])

  const updateItems = (id, action) => {
    let productUpdated = products.filter((data) => data.id === id)
    let product = { ...productUpdated[0] }

    console.log('this is the product', product)
    //console.log('in update items,', product, product[0].incart)

    //console.log('this is the items state in ccart', items)
    /*
    if (action === 'remove' && product[0].incart !== 0) {
      let updatedAmt = product[0].incart - 1
      console.log(product, updatedAmt)

      let newDataQty = products.map((element) =>
        element.id === id ? { ...element, incart: updatedAmt } : element,
      )

      console.log('this is new data qty', newDataQty)

      //dispatch({ product, type: 'remove' })
      setItems(newDataQty.filter((data) => data.incart !== 0))
    }
*/
    if (action === 'add') {
      /*look to see if item exists in the items array if not push and use spread operator*/

      let foundProduct = items.find((item) => item.id === id)

      if (!foundProduct) {
        // let origItems = items

        // origItems.push(product[0])
        product.incart = +1
        console.log('this is the product', product)
        setItems((prev) => {
          return [product, ...prev]
        })

        console.log(
          'product not found push in array this is origitem with the push of product',
          items,
        )
      } else {
        console.log('products is found')
        foundProduct.incart = foundProduct.incart + 1

        let orig = items
        let filtered = orig.filter((orig) => orig.id !== foundProduct.id)
        // filtered = filtered.push(foundProduct)

        filtered = [foundProduct, ...filtered]
        console.log(
          'this is filtered',
          filtered,
          'this is found product',
          foundProduct,
        )
        setItems(filtered)
      }
    }
  }

  return (
    <ThemeUpdateContext.Provider value={{ updateItems, setItems }}>
      <ThemeContext.Provider value={items}>{children}</ThemeContext.Provider>
    </ThemeUpdateContext.Provider>
  )
}
/*
const CartStateContext = createContext()
const CartDispatchContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [...state, action.item]

    case 'remove':
      const newArr = [...state]
      newArr.splice(action.index, 1)
      console.log('this is the new array', newArr)
      return newArr
    default:
      throw new Error(`unknown action ${action.type}`)
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [])

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)
*/
