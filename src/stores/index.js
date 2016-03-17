import Article from './Article'
import CommentStore from './Comments.js'
import {articles, comments} from '../fixtures'

const stores = {}

Object.assign(stores, {
    articles: new Article(stores, articles),
    comments: new CommentStore(stores, comments)
})

window.stores = stores
export const articleStore = stores.articles
export const commentStore = stores.comments

export default stores

