import { toyService } from "../../services/toy.service.js"


//* Cars
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const UNDO_TOYS = 'UNDO_TOYS'


//* Shopping cart
export const TOGGLE_CART_IS_SHOWN = 'TOGGLE_CART_IS_SHOWN'
export const ADD_TOY_TO_CART = 'ADD_TOY_TO_CART'
export const REMOVE_TOY_FROM_CART = 'REMOVE_TOY_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'


const initialState = {
    toys: [],
    lastCars: [],
    filterBy: toyService.getDefaultFilter(),
    isLoading: false,
    shoppingCart: [],
    isCartShown: false,
}


export function toyReducer(state = initialState, cmd = {}) {
    //* Toys
    switch (cmd.type) {
        case SET_TOYS:
            return {
                ...state,
                toys: cmd.toys
            }
        case REMOVE_TOY:
            return {
                ...state,
                toys: state.toys.filter(toy => toy.id !== cmd.toyId),
                lastToys: [...state.toys]
            }
        case ADD_TOY:
            return {
                ...state,
                toys: [...state.toys, cmd.toy]
            }
        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy.id === cmd.toy.id ? cmd.toy : toy)
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.filterBy }
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }
        case UNDO_TOYS:
            return {
                ...state,
                toys: [...state.lastToys]
            }


        //* Shopping cart
        case TOGGLE_CART_IS_SHOWN:
            return { ...state, isCartShown: !state.isCartShown }


        case ADD_TOY_TO_CART:
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, cmd.toy]
            }


        case REMOVE_TOY_FROM_CART:
            const shoppingCart = state.shoppingCart.filter(toy => toy.id !== cmd.toyId)
            return { ...state, shoppingCart }




        case CLEAR_CART:
            return { ...state, shoppingCart: [] }


        default:
            return state


    }
}


