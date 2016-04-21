import Article from './Article'
import Comment from './Comment'
import FeedStore from './VK'
import PhotosStore from './Photos'
import FriendsStore from './Friends'
import SimpleStore from './SimpleStore'

const stores = {}

Object.assign(stores, {
    articles: new Article(stores),
    comments: new Comment(stores),
    feeds: new FeedStore(stores),
    friends: new FriendsStore(stores),
    photos: new PhotosStore(stores)
})

window.stores = stores
export const articleStore = stores.articles
export const commentStore = stores.comments
export const feedStore = stores.feeds
export const friendsStore = stores.friends
export const photosStore = stores.photos

export default stores
