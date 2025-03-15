import { utilService } from "../services/util.service.js"

import { useState, useEffect, useRef } from 'react'



export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter)).current

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : 
                type === 'select-multiple' ? Array.from(target.selectedOptions).map(option => option.value) : 
                value

        if(value === 'none') value = undefined;
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="toyName">Name:</label>
                <input type="text"
                    id="toyName"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="price">Max price:</label>
                <input type="number"
                    id="price"
                    name="price"
                    placeholder="By max price"
                    value={filterByToEdit.price || ''}
                    onChange={handleChange}
                />
                <label htmlFor="instock">In Stock:</label>
                <select id="instock" name="instock" onChange={handleChange}>
                    <option value="All" selected>All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Not In Stock</option>
                </select>

                <label htmlFor="toylabel">Toy Label:</label>
                <select id="toylabel" name="toylabel" onChange={handleChange} multiple>
                    <option value="On wheels">On wheels</option>
                    <option value="Box game">Box game</option>
                    <option value="Art">Art</option>
                    <option value="Baby">Baby</option>
                    <option value="Doll">Doll</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Battery Powered">Battery Powered</option>
                </select>

                {/* Sorting Fields */}
                <label htmlFor="sortBy">Sort By:</label>
                <select id="sortBy" name="sortBy" onChange={handleChange}>
                <option value="none">None</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                </select>

                <label htmlFor="order">Order:</label>
                <select id="order" name="order" onChange={handleChange}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </form>
        
        </section>
    )
}