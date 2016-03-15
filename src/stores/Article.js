import AppDispatcher from '../dispatcher'
import { EventEmitter } from 'events'

class ArticleStore extends EventEmitter {
    constructor(initialState) {
        super()
        this.__items = []
        if (initialState) initialState.forEach(this.__add)

        AppDispatcher.register((action) => {
            const { type, data } = action

            switch (type) {
                case 'DELETE_ARTICLE':
                    this.__delete(data.id)
                    this.emitChange()
                    break;
            }
        })
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

    __add = (data) => {
        this.__items.push(data)
    }

    __delete = (id) => {
        this.__items = this.__items.filter(item => item.id != id)
    }
}

export default ArticleStore