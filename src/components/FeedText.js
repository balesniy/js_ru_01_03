import React from 'react'
import toggleOpen from '../HOC/toggleOpen.js'

export default toggleOpen((props)=>{
    const text=props.text.replace(/<br>/g,'\n')
    return(
    <p onClick={props.toggleOpen}>
        {props.isOpen?<img src={props.srcBig}/>:<img src={props.srcSmall}/>}
        {!props.isOpen?text.slice(0,80):text}
    </p>)
})