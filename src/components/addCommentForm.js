import React, {Component as ReactComponent, PropTypes} from 'react'
import LinkedStateMixin from 'react-addons-linked-state-mixin'

export default React.createClass( {

    mixins: [LinkedStateMixin],

    contextTypes: {
        user: PropTypes.string,
        language: PropTypes.object
    },


    getInitialState() {
        return {
            currentText: ''
        }
    },

    render(){
        return (

            <div className="pure-form pure-form-stacked">
                    <fieldset>
                        <legend>Add comment</legend>

                            <label htmlFor="comment">Comment</label>
                            <textarea valueLink={this.linkState('currentText')}
                                      name="comment" type="text"
                                      placeholder="Say something"/>

                        <button onClick={this.handleClick}
                                className="pure-button pure-button-primary">{this.context.language.Post}</button>
                    </fieldset>
            </div>

        )
    },
    handleClick(){
        this.props.submit({
            text:this.state.currentText,
            name:this.context.user
        })

        this.setState(this.getInitialState())
    }
})

