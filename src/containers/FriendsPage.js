import React, { Component, PropTypes } from 'react'
import {friendsStore}  from '../stores'
import {loadFriends} from '../actions/VK.js'
import Friends from '../components/Friends.js'


export default class FriendsPage extends Component {
  constructor(props) {
      super(props)
      this.state = {
          loading: friendsStore.__loading
      }
  }

      componentDidMount() {
          friendsStore.addChangeListener(this.feedsChanged);
          console.log(this.props.location.query.code)
      }

      componentWillUnmount() {
          friendsStore.removeChangeListener(this.feedsChanged)
      }

      feedsChanged =()=>{
          this.setState({
              loading:friendsStore.__loading
          })
      }

      getToken=(code)=>{
        const xhr = new XMLHttpRequest();
        xhr.open('GET', "https://oauth.vk.com/access_token?client_id=5406559&client_secret=ebdfnqCQ716EPVVJpIoE&redirect_uri=http://local.vcap.me:8080/friends/v/&code="+code, true);
        xhr.onload = function() {alert(this.responseText);}
        xhr.send();

      }

    render() {
        return (
            <div>
              <Friends
                start={()=>loadFriends({id:279938622,isHero:true})}
                finish={()=>loadFriends({id:36358,isHero:true})}
                friends={friendsStore.__friends}
                loading={this.state.loading}
              />
              <a href="#" onClick={()=>this.getToken(this.props.location.query.code)}>Auth</a>

            </div>
        )
    }
}
