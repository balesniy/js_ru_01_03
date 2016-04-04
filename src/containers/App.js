import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            language: 'this'
        }
    }
    static childContextTypes = {
        language: PropTypes.object
    }
    getChildContext() {
        return {
            language: this.getControlNames()
        }
    }


    render() {
        return (
            <div>
                <h1>News App Name!</h1>
                <ul>
                    <li><a href="#" onClick = {this.changeLanguage} >{this.state.language}</a></li>
                    <li><Link to="/articles">Articles</Link></li>
                    <li><Link to="/comments/0">Comments</Link></li>
                </ul>

                {this.props.children}
            </div>
        )
    }
    changeLanguage=(ev)=> {
        ev.preventDefault()
        const newLanguage = this.state.language == 'this' ? 'that' : 'this'
        this.setState({
            language: newLanguage
        })
    }

    getControlNames=()=>{
        const currentLanguage=this.state.language=="this"
        return {
            NewArticle:currentLanguage?'New Article':'Новая статья',
            Delete:currentLanguage?'delete':'Удалить',
            SignIn:currentLanguage?'sign in':'Войти',
            Post:currentLanguage?'Post':'Отправить'
        }

    }

}

export default App