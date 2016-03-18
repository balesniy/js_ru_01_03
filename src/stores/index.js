import Article from './Article'
import Comment from './Comment'
import SimpleStore from './SimpleStore'
import {articles, comments} from '../fixtures'

const stores = {}

Object.assign(stores, {
    articles: new Article(stores, articles),
    comments: new Comment(stores, comments)
})

window.stores = stores
export const articleStore = stores.articles
export const commentStore = stores.comments

export default stores

