import React, { Component, PropTypes } from 'react'
import {loadFeeds,loadFeedsByCity} from '../actions/VK.js'
import {feedStore}  from '../stores'
import FeedText from '../components/FeedText.js'

class NewArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            feeds: feedStore.getAll().slice(0,5),
            query:'',
            cities:[],
            offset:0
        }
    }

    componentDidMount() {
        feedStore.addChangeListener(this.feedsChanged)
    }

    componentWillUnmount() {
        feedStore.removeChangeListener(this.feedsChanged)
    }

    feedsChanged =()=>{
        this.setState({
            feeds:feedStore.getAll().slice(this.state.offset,this.state.offset+5),
            cities:feedStore.cities,
            offset:0
        })
    }

    queryChanged=(ev)=>{
        this.setState({
            query: ev.target.value
        })
    }

    handleCity=(city)=>(ev)=>{
        ev.preventDefault()

        loadFeedsByCity(Object.assign(city, {q:this.state.query}))

    }

    render() {
        return (
            <div>
                <h2>Feed line</h2>
                <ul>{this.state.cities.map(city=>{
                    return <li key={city.cid}>
                        <a onClick={this.handleCity(city)} href='#'>{city.name}</a></li>
                })}</ul>
                <input onChange={this.queryChanged}/>
                <button onClick={()=>loadFeeds(this.state.query)}>search</button>

                    <ul>
                    {this.state.feeds.map(feed=>{
                        return <li key={feed.id}>
                            <h4>{feed.group?feed.group.name:feed.user.first_name}</h4>
                            <h5>{feed.group?feed.group.status:feed.user.status}</h5>
                            <img src={feed.attachment.photo.src_small} />
                            <FeedText text={feed.text}/>


                        </li>
                    })}
                </ul>
                {this.state.offset>=feedStore.getAll().length-5?null:<button
                    onClick={()=>this.setState({offset:this.state.offset+5, feeds:feedStore.getAll().slice(this.state.offset+5,this.state.offset+10)})}>
                    more feeds...</button>
                }

            </div>
        )
    }


}

export default NewArticle