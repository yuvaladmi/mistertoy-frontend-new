import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {

    return (
        <article>
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {/* {toy.owner && <p>Owner: {toy.owner.fullname}</p>} */}
            <hr />
            <Link to={`/toy/edit/${toy.id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy.id}`}>Details</Link>
        </article>
    )
}
