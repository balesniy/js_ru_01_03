import { DELETE_ARTICLE } from '../constants'
import { articles as defaultArticles} from '../fixtures'

export default (articles = defaultArticles, action) => {
    const { type, data } = action

    switch (type) {
        case DELETE_ARTICLE: return articles.filter(item=>item.id!=data)
        default: return articles

    }


}