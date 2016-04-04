import React from 'react'
import {photosStore}  from '../stores'

export default (props)=>{

    const feed=photosStore.getById(props.params.src)

    return <img src={ feed.src_xxxbig||feed.src_xxbig||feed.src_xbig}/>
}