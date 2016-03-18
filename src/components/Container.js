import React, { Component, PropTypes } from 'react'
import ArticleList from './ArticleList'
import { articleStore } from '../stores'

class Container extends Component {
    constructor() {
        super()
        this.state = {
            articles: articleStore.getOrLoadAll(),
            loading: articleStore.loading
        }
    }

    componentDidMount() {
        articleStore.addChangeListener(this.articlesChanged)
    }

    componentWillUnmount() {
        articleStore.removeChangeListener(this.articlesChanged)
    }

    articlesChanged =() => {
        this.setState({
            articles: articleStore.getOrLoadAll(),
            loading: articleStore.loading
        })
    }

    render() {
        const { articles, loading } = this.state
        if (loading) return <h1>Loading...</h1>
        return (
            <div>
                <ArticleList articles = {articles}/>
            </div>
        )
    }
}

export default Container