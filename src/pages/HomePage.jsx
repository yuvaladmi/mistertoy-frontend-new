// import { CHANGE_BY, DECREMENT, INCREMENT } from "../store/reducers/user.reducer.js"

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'


export function HomePage() {
    // TODO: move to storeState
    // const [count, setCount] = useState(10)

    // const count = useSelector(storeState => storeState.userModule.count)
    // const dispatch = useDispatch()

    // function onIncrease() {
    //     // setCount(count => count + 1)
    //     dispatch({ type: INCREMENT })
    // }

    // function onDecrease() {
    //     // setCount(count => count - 1)
    //     dispatch({ type: DECREMENT })

    // }

    // function changeBy(diff) {
    //     // setCount(count => count + diff)
    //     dispatch({ type: CHANGE_BY, diff })

    // }

    return (
        <div>
            <KostaComponent data={'crazy data'}>
                <p>Hello im children</p>
            </KostaComponent>
        </div>
    )
}

function KostaComponent ({children, data}) {
    return (
        <div>
            {data}
            {children}
        </div>
    )
}