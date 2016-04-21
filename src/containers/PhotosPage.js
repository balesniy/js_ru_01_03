import React, { Component, PropTypes } from 'react'
import {loadPhotos, loadAlbum} from '../actions/VK.js'
import {photosStore}  from '../stores'
import { Link } from 'react-router'

class PhotosPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            feeds: photosStore.getAll(),
            query:'',
            offset:0
        }
    }

    componentDidMount() {
        photosStore.addChangeListener(this.feedsChanged)
    }

    componentWillUnmount() {
        photosStore.removeChangeListener(this.feedsChanged)
    }

    feedsChanged =()=>{
        this.setState({
            feeds:photosStore.getAll()
        })
    }

    queryChanged=(ev)=>{
        this.setState({
            query: ev.target.value
        })
    }


    render() {
        return (
            <div>
                <h2>Photos line</h2>

                <input onChange={this.queryChanged}/>
                <button onClick={()=>loadPhotos(this.state.query)}>search</button>
                {photosStore.loading?<h2>is loading now</h2>:null}

                <ul>
                    {this.state.feeds.slice(this.state.offset,this.state.offset+5).map(feed=>{
                      const {pid,text,owner_id,aid,src}=feed;
                        return <li key={pid}>
                            <h4>{text.split('<br>').map(i=>
                              <span>{i.slice(0,80)}<br/></span>).slice(0,3)}
                            </h4>
                            <Link to={`/photo/${pid}`}><img src={src}/></Link>

                            <br/>
                            Owner:{owner_id}
                            <br/>
                            Album:{aid}
                            <br/>

                            <button
                              onClick={()=>loadAlbum({pid,owner_id,aid})}
                              disabled={feed.loading || feed.loaded}>get album</button>
                            {feed.loaded?feed.album.map(i=><img key={i.pid} src={i.src}/>):null}

                        </li>
                    })}
                </ul>
                {this.state.offset>=this.state.feeds.length-5?null:
                  <button
                    onClick={()=>this.setState({offset:this.state.offset+5})}>
                    more feeds...
                  </button>
                }

            </div>
        )
    }


}

export default PhotosPage
