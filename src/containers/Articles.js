import React, { Component, PropTypes } from 'react'
import ArticleList from '../components/ArticleList'
import { articleStore } from '../stores'

class Articles extends Component {
    constructor() {
        super()
        this.state = {
            articles: articleStore.getOrLoadAll(),
            loading: articleStore.loading,
            name: ''
        }
    }

    static childContextTypes = {
        user: PropTypes.string
    }
    getChildContext() {
        return {
            user: this.state.user
        }
    }
    static contextTypes = {
        router: PropTypes.object,
        language: PropTypes.object
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
                <input value={this.state.name} onChange = {this.changeName}/>
                <a href="#" onClick = {this.signIn} >{this.context.language.SignIn}</a>
                <h3 onClick = {this.goToNewArticle}>{this.context.language.NewArticle}</h3>
                <ArticleList articles = {articles}/>
                {this.props.children}
            </div>
        )
    }

    changeName = (ev) => {
        this.setState({
            name: ev.target.value
        })
    }

    signIn = (ev) => {
        ev.preventDefault()
        this.setState({
            user: this.state.name
        })
    }
    goToNewArticle = () => {
//        this.context.router.push('/articles/new')
        this.context.router.replace('/articles/new')
    }
}

export default Articles