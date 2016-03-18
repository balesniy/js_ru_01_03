export default class Model {
    constructor(data, store) {
        Object.assign(this, data)
        this.__store = store
    }
    //articles.getRelation('comments')
    getRelation(rel) {
        const relStore = this.__store.__stores[rel]
        if (!relStore || !this[rel]) return []
        //article.comments -> commentsStore.getById
        return this[rel].map(relStore.getById)
    }
}