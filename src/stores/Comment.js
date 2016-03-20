import AppDispatcher from '../dispatcher'
import { ADD_COMMENT,LOAD_COMMENTS,_START,_SUCCESS } from '../actions/constants'
import SimpleStore from './SimpleStore'

class Comment extends SimpleStore {
    constructor(stores, initialState) {
        super(stores, initialState)

        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data,response } = action

            switch (type) {
                case ADD_COMMENT:
                    this.__add({
                        text: data.comment.text,
                        user: data.comment.name,
                        article: data.articleId,
                        id: this.generateId()
                    })
                    break;

                case LOAD_COMMENTS + _START:
                    this.loading = true
                    break;

                case LOAD_COMMENTS + _SUCCESS:
                    response.forEach(this.__add)
                    this.loading=false
                    break;

                default: return
            }
            this.emitChange()
        })
    }
    getByArticleId(id){
        return this.__items.filter(item=>item.article==id)
    }
    getAllById(id){
        return this.__items.filter(item=>id.includes(item.id))
    }
}

export default Comment