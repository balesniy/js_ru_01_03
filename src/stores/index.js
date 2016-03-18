import Article from './Article'
import Comment from './Comment'
import SimpleStore from './SimpleStore'

const stores = {}

Object.assign(stores, {
    articles: new Article(stores),
    comments: new Comment(stores)
})

window.stores = stores
export const articleStore = stores.articles
export const commentStore = stores.comments

export default stores

