import React from 'react'
import Body from './Body.js'


export default (props)=> {

        const { article, article:{title} } = props;


        return (
            <div>

                <h4>{title}</h4>

                <Body article={article}/>

            </div>
        )

}