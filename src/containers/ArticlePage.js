import React, { Component, PropTypes } from 'react'
import { articleStore } from '../stores'
import Article from '../components/Article'
import { loadArticleById } from '../actions/articles'

class ArticlePage extends Component {
    static propTypes = {

    };
    constructor(props) {
        super(props)
        this.state = {
            article: articleStore.getById(props.params.id)
        }
    }

    componentDidMount() {
        this.checkAndLoad(this.state.article)
        articleStore.addChangeListener(this.articlesChanged)
    }

    componentWillUnmount() {
        articleStore.removeChangeListener(this.articlesChanged)
    }

    componentWillReceiveProps(nextProps) {
        this.checkAndLoad(articleStore.getById(nextProps.params.id))
        this.articlesChanged(nextProps)
    }

    checkAndLoad = (article) => {
        if (!article.loaded && !article.loading) setTimeout(() => loadArticleById({id: article.id}), 0)
    }

    articlesChanged =(props) => {
        const { id } = (props || this.props).params
        this.setState({
            article: articleStore.getById(id)
        })
    }

    render() {
        return (
            <div>
                article: {this.props.params.id}
                <Article article={this.state.article} />
            </div>
        )
    }
}

export default ArticlePage