import { EventEmitter } from 'events'
import Model from './Model'

class SimpleStore extends EventEmitter {
    constructor(stores, initialState) {
        super()
        this.__stores = stores
        this.__items = []
        if (initialState) initialState.forEach(this.__add)
        this.__incrementalId = Math.max(...this.__items.map(el => el.id)) + 1000
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

    getSorted() {
        return this.getAll().sort((a,b) => a.id - b.id)
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

    __update = (data) => {
        Object.assign(this.getById(data.id), data)
    }

    __delete = (id) => {
        this.__items = this.__items.filter(item => item.id != id)
    }

    generateId() {
        return ++this.__incrementalId
    }

    getCurrentId() {
        return this.__incrementalId
    }
}

export default SimpleStore