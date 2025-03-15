import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy } from '../store/actions/toy.actions.js'
import { ADD_TOY_TO_CART, SET_TOYS, SET_FILTER_BY } from '../store/reducers/toy.reducer.js'

import { useSelector, useDispatch } from 'react-redux'

export function ToyIndex() {


    // const [toys, setToys] = useState(null)
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    const dispatch = useDispatch()



    useEffect(() => {
        loadToys()
            .catch(() => showErrorMsg('Cannot load toys'))
    }, [filterBy])


    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    function onRemoveToy(toyId) {
        // DONE: move to a function and use dispatch/action
        removeToyOptimistic(toyId)
            .then(() => showSuccessMsg('Toy removed'))
            .catch(() => showErrorMsg('Cannot remove toy'))
    }


    function onAddToy() {
        const toyToSave = toyService.getRandomToy()

        // DONE: move to a function and use dispatch/action
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy.id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })


    }

    function onEditToy(toy) {
        const price = +prompt('New price?', toy.price)
        const toyToSave = { ...toy, price }

        // DONE: move to a function and use dispatch/action
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => showErrorMsg('Cannot update toy'))
    }

    function addToCart(toy) {
        console.log(`Adding ${toy.vendor} to Cart`)
        dispatch({ type: ADD_TOY_TO_CART,  toy})
        showSuccessMsg(`Added ${toy.vendor} to Cart`)
    }

    return (
        <div className='toy-index'>
            <h3>Toys App</h3>
            <main>
                <section>
                    <button className='add-btn'><Link to={`/toy/edit`}>Add Toy</Link></button>
                    <button onClick={onAddToy}>Add Random Toy ⛐</button>
                </section>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                        addToCart={addToCart}
                    />
                    : <div>Loading..</div>
                }
                <hr />
            </main>
        </div>
    )

}