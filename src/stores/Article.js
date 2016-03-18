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
                    //у нас есть .getById метод, а комментов может еще не быть, приведет к ексепшену
                    this.__items.filter(item=>item.id==data.articleId)[0].comments.push(data.id)
                    this.emitChange()
                    break;
            }
        })
    }
}

export default ArticleStore
