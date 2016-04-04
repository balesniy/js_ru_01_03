import React, { Component, PropTypes } from 'react'
import {loadFeeds,loadFeedsByCity, loadCityCoords} from '../actions/VK.js'
import {feedStore}  from '../stores'
import FeedText from '../components/FeedText.js'

class NewArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            feeds: feedStore.getAll(),
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
            feeds:feedStore.getAll(),
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
        loadCityCoords(Object.assign(city, {q:this.state.query}))

        //loadFeedsByCity(Object.assign(city, {q:this.state.query}))

    }

    render() {
        return (
            <div>
                <h2>Feed line</h2>
                <ul>{this.state.cities
                    .map(city=>{
                    return <li key={city.cid}>
                        <a onClick={this.handleCity(city)} href='#'>{city.name}</a>
                    {this.state.cities.length>1?this.state.feeds.filter(i=>i.group.city==city.cid).length:null}
                    </li>
                })}</ul>
                <input onChange={this.queryChanged}/>
                <button onClick={()=>loadFeeds(this.state.query)}>search</button>
                {feedStore.loading?<h2>is loading now</h2>:null}

                    <ul>
                    {this.state.feeds.slice(this.state.offset,this.state.offset+5).map(feed=>{
                        return <li key={feed.id}>
                            <h4>{feed.group?feed.group.name:feed.user.first_name}</h4>
                            <h5>{feed.group?feed.group.status:feed.user.status}</h5>
                            <FeedText text={feed.text}
                                      srcBig={feed.attachment.photo.src_big}
                                      srcSmall={feed.attachment.photo.src_small}/>


                        </li>
                    })}
                </ul>
                {this.state.offset>=this.state.feeds.length-5?null:<button
                    onClick={()=>this.setState({offset:this.state.offset+5})}>
                    more feeds...</button>
                }

            </div>
        )
    }


}

export default NewArticle