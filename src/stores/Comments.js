import AppDispatcher from '../dispatcher'
import { ADD_COMMENT } from '../actions/constants'
import SimpleStore from './SimpleStore'

class CommentStore extends SimpleStore {
    constructor(stores, initialState) {
        super(stores, initialState)

        AppDispatcher.register((action) => {
            const { type, data } = action

            switch (type) {
                case ADD_COMMENT:
                    this.__add(data)
                    this.emitChange()
                    break;
            }
        })
    }
}

export default CommentStore