import React, { Component, PropTypes } from 'react'
import ArticleList from '../components/ArticleList'
import { articleStore } from '../stores'

class Articles extends Component {
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
                {this.props.children}
            </div>
        )
    }
}

export default Articles