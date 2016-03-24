import AppDispatcher from '../dispatcher'
import { ADD_COMMENT,LOAD_COMMENTS,_START,_SUCCESS, LOAD_COMMENTS_PAGE } from '../actions/constants'
import SimpleStore from './SimpleStore'
import { loadCommentsPage } from '../actions/comments.js'


class Comment extends SimpleStore {
    constructor(stores, initialState) {
        super(stores, initialState)
        this.total=999;

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
                    response.filter(i=>!this.getById(i.id)).forEach(this.__add)
                    this.loading=false
                    break;


                case LOAD_COMMENTS_PAGE + _START:
                    this.loading = true
                    break;

                case LOAD_COMMENTS_PAGE + _SUCCESS:
                    this.total=response.total;
                    response.records.filter(i=>!this.getById(i.id)).forEach(this.__add)
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

    getByPage(page){
        const int=[...new Array(10)].map((_,i)=>page*10+i+1).filter(i=>i<=this.total);

        if(!int.every(this.getById)) loadCommentsPage (page)

        return int.map(this.getById)
    }
}

export default Comment