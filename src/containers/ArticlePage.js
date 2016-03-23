import React, { Component, PropTypes } from 'react'
import { articleStore } from '../stores'
import Article from '../components/Article'


class ArticlePage extends Component {
    static propTypes = {

    };
    constructor(props) {
        super(props)
        this.state = {
            article: articleStore.getOrLoadById(props.params.id)
        }
    }

    componentDidMount() {
        articleStore.addChangeListener(this.articlesChanged)
    }

    componentWillUnmount() {
        articleStore.removeChangeListener(this.articlesChanged)
    }

    componentWillReceiveProps(nextProps) {

        this.articlesChanged(nextProps)
    }


    articlesChanged =(props=this.props) => {
        const { id } = props.params
        this.setState({
            article: articleStore.getOrLoadById(id)
        })
    }

    render() {
        return (
            <div>
                article: {this.props.params.id}
                {this.state.article?
                <Article article={this.state.article} />:
                <div>No such article at store</div> }
            </div>
        )
    }
}

export default ArticlePage