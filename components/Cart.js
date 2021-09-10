import React, {
  useReducer,
  useContext,
  createContext,
  useState,
  useEffect,
} from 'react'

const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()

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
    items
  }, [items])

  const updateItems = (id, action) => {
    let product = products.filter((data) => data.id === id)
    console.log('in update items,', product, product[0].incart)

    console.log('this is the items state in ccart', items)
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

      console.log('found product', foundProduct)
      if (!foundProduct) {
        let origItems = items

        origItems.push(product[0])
        setItems(origItems)

        console.log(
          'product not found push in array this is origitem with the push of product',
          origItems,
        )
      } else {
        console.log('products is found')
      }

      /*else {
        let updatedAmt = product[0].incart + 1
        const updateProduct = items.map((element) =>
          element.id === id ? { ...element, incart: updatedAmt } : element,
        )

        console.log('lets update the product', updateProduct)
      }*/
      /*let productExists = items.find((element) => element.id === id)
      console.log('this is the product exitst length', productExists, items)
      if (!productExists) {
        console.log(' product does not exist', productExists)
        product[0].incart = product[0].incart + 1

        items.push(product)
      }*/
    }
  }

  return (
    <ThemeContext.Provider value={items}>
      <ThemeUpdateContext.Provider value={updateItems}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
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
