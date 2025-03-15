import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TOY_KEY = 'toyDB'
_createToys()

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams,
    getById
}
// For Debug (easy access from console):
window.cs = toyService

function getById(toyId) {
    return storageService.get(TOY_KEY, toyId)
}

function query(filterBy = {}) {
    return storageService.query(TOY_KEY)
        .then(toys => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }

            if (filterBy.price) {
                toys = toys.filter(toy => toy.price >= filterBy.price)
            }

            if (filterBy.instock !== 'All') {
                const inStockParam = filterBy.instock === 'false' ? false : true;
                toys = toys.filter(toy => toy.inStock === inStockParam)
            }
            
            if(filterBy.toylabel){
                toys = toys.filter(toy => filterBy.toylabel.includes(toy.name));

            }

            if (filterBy.sortBy) {
                const sortField = filterBy.sortBy // "name" or "price"
                const order = filterBy.order === 'desc' ? -1 : 1 // Ascending (default) or Descending
                
                toys.sort((a, b) => {
                    if (typeof a[sortField] === 'string') {
                        return a[sortField].localeCompare(b[sortField]) * order
                    } else {
                        return (a[sortField] - b[sortField]) * order
                    }
                })
            }
            return toys
        })
}

function get(toyId) {
    return storageService.get(TOY_KEY, toyId)
        .then(toy => {
            toy = _setNextPrevToyId(toy)
            return toy
        })
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy.id) {
        return storageService.put(TOY_KEY, toy)
    } else {
        return storageService.post(TOY_KEY, toy)
    }
}

function getEmptyToy(name = '', price = '', inStock = false, imgUrl = '') {
    return { name, price, inStock, imgUrl }
}

function getDefaultFilter() {
    return { txt: '', price: 0, instock : 'All'}
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}


// function getSpeedStats() {
//     return storageService.query(TOY_KEY)
//         .then(toys => {
//             const toyCountBySpeedMap = _getToyCountBySpeedMap(toys)
//             const data = Object.keys(toyCountBySpeedMap).map(speedName => ({ title: speedName, value: toyCountBySpeedMap[speedName] }))
//             return data
//         })

// }

// function getVendorStats() {
//     return storageService.query(TOY_KEY)
//         .then(toys => {
//             const toyCountByVendorMap = _getToyCountByVendorMap(toys)
//             const data = Object.keys(toyCountByVendorMap)
//                 .map(vendor =>
//                 ({
//                     title: vendor,
//                     value: Math.round((toyCountByVendorMap[vendor] / toys.length) * 100)
//                 }))
//             return data
//         })
// }

function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        const labels= ['On wheels','Box game','Art','Baby','Doll','Puzzle','Outdoor','Battery Powered'];
        for (let i = 0; i < 20; i++) {
            const label = labels[utilService.getRandomIntInclusive(0, labels.length - 1)]
            toys.push(_createToy(label, utilService.getRandomIntInclusive(80, 300)))
        }
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy(name, price = 250, inStock = false, imgUrl = 'https://media.istockphoto.com/id/909772478/photo/brown-teddy-bear-isolated-in-front-of-a-white-background.jpg?s=2048x2048&w=is&k=20&c=s8PFeQP9u2IWjER7hy2bXN55DZl3MlL-Ue37AkWB8Jk=') {
    const toy = getEmptyToy(name, price, inStock, imgUrl)
    toy._id = utilService.makeId()
    return toy
}

function _setNextPrevToyId(toy) {
    return storageService.query(TOY_KEY).then((toys) => {
        const toyIdx = toys.findIndex((currToy) => currToy.id === toy.id)
        const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
        const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
        toy.nextToyId = nextToy.id
        toy.prevToyId = prevToy.id
        return toy
    })
}

// function _getToyCountBySpeedMap(toys) {
//     const toyCountBySpeedMap = toys.reduce((map, toy) => {
//         if (toy.price < 120) map.slow++
//         else if (toy.price < 200) map.normal++
//         else map.fast++
//         return map
//     }, { slow: 0, normal: 0, fast: 0 })
//     return toyCountBySpeedMap
// }

// function _getToyCountByVendorMap(toys) {
//     const toyCountByVendorMap = toys.reduce((map, toy) => {
//         if (!map[toy.vendor]) map[toy.vendor] = 0
//         map[toy.vendor]++
//         return map
//     }, {})
//     return toyCountByVendorMap
// }

