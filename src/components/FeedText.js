import React from 'react'
import toggleOpen from '../HOC/toggleOpen.js'

export default toggleOpen((props)=>{
    const text=props.text.split('<br>').map(i=><span>{i}<br/></span>)
    return(
    <p onClick={props.toggleOpen}>
        {props.isOpen?<img src={props.srcBig}/>:<img src={props.srcSmall}/>}
        {!props.isOpen?text.slice(0,3):text}
        кол-во лайков!!!
    </p>)
})