import { EventEmitter } from 'events'
import Model from './Model'

class SimpleStore extends EventEmitter {
    constructor(stores, initialState) {
        super()
        this.__stores = stores
        this.__items = []
        if (initialState) initialState.forEach(this.__add)
    }

    addChangeListener(callback) {
        this.on('CHANGE_EVENT', callback)
    }

    emitChange() {
        this.emit('CHANGE_EVENT')
    }

    removeChangeListener(callback) {
        this.removeListener('CHANGE_EVENT', callback)
    }

    getAll() {
        return this.__items.slice()
    }

    getById = (id) => {
        return this.__items.filter(item => item.id == id)[0]
    }

    __add = (data) => {
        this.__items.push(new Model(data, this))
    }

    __delete = (id) => {
        this.__items = this.__items.filter(item => item.id != id)
    }
}

export default SimpleStore