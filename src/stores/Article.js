import AppDispatcher from '../dispatcher'
import { DELETE_ARTICLE, ADD_COMMENT} from '../actions/constants'
import SimpleStore from './SimpleStore'

class ArticleStore extends SimpleStore {
    constructor(stores, initialState) {
        super(stores, initialState)

        AppDispatcher.register((action) => {
            const { type, data } = action

            switch (type) {
                case DELETE_ARTICLE:
                    this.__delete(data.id)
                    this.emitChange()
                    break;
                case ADD_COMMENT:

                    this.__items.find(item=>item.id==data.articleId).comments.push(data.id)
                    this.emitChange()
                    break;
            }
        })
    }
}

export default ArticleStore