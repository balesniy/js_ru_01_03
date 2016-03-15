export default class Model {
    constructor(data, store) {
        Object.assign(this, data)
        this.__store = store
    }

    getRelation(rel) {
        const relStore = this.__store.__stores[rel]
        if (!relStore || !this[rel]) return []
        return this[rel].map(relStore.getById)
    }
}