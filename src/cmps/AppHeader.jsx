import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'

import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'


export function AppHeader() {

    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const cartLength = useSelector(storeState => storeState.toyModule.shoppingCart.length)

    const dispatch = useDispatch()

    // TODO: move to storeState
    // const [user, setUser] = useState(userService.getLoggedinUser())

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('Logout successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }


    function onToggleCart(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_CART_IS_SHOWN })
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React toy App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <a className='shopping-cart-link' onClick={onToggleCart} href="#">
                        🛒 Cart
                        {cartLength > 0 && <span className='shopping-cart-count'>{cartLength}</span>}
                    </a>
                </nav>
            </section>
            {
                user ? (
                    <section>
                        <span to={`/user/${user.id}`}>Hello {user.fullname} <span>${user.score.toLocaleString()}</span></span>
                        <button onClick={onLogout}>Logout</button>
                    </section>
                ) : (
                    <section>
                        <LoginSignup />
                    </section>
                )
            }
        </header >
    )
}
