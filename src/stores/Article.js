import AppDispatcher from '../dispatcher'
import { DELETE_ARTICLE, ADD_COMMENT, LOAD_ALL_ARTICLES_START, LOAD_ALL_ARTICLES_SUCCESS, LOAD_ALL_ARTICLES_FAIL } from '../actions/constants'
import SimpleStore from './SimpleStore'

class ArticleStore extends SimpleStore {
    constructor(stores, initialState) {
        super(stores, initialState)

        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data, response, error } = action

            switch (type) {
                case DELETE_ARTICLE:
                    this.__delete(data.id)
                    break;

                case ADD_COMMENT:
                    AppDispatcher.waitFor([stores.comments.dispatchToken])
                    const article = this.getById(data.articleId)
                    article.comments = (article.comments || []).concat(stores.comments.getCurrentId())
                    break;

                case LOAD_ALL_ARTICLES_START:
                    this.loading = true
                    break;

                case LOAD_ALL_ARTICLES_SUCCESS:
                    response.forEach(this.__add)
                    this.loading = false
                    this.loaded = true
                    break;

                case LOAD_ALL_ARTICLES_FAIL:
                    this.error = error
                    this.loaded = false
                    this.loading = false
                    break;

                default: return
            }
            this.emitChange()
        })
    }
}

export default ArticleStore