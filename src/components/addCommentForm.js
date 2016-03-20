import React, {Component as ReactComponent} from 'react'
import LinkedStateMixin from 'react-addons-linked-state-mixin'

export default React.createClass( {

    mixins: [LinkedStateMixin],

    getInitialState() {
        return {
            currentText: '',
            currentName: '',
            checked: false
        }
    },

    render(){
        return (

            <div className="pure-form pure-form-stacked">
                    <fieldset>
                        <legend>Add comment</legend>

                        <label htmlFor="name">Name</label>
                        <input valueLink={this.linkState('currentName')} name="name" type="text" placeholder="Your name"/>

                            <label htmlFor="comment">Comment</label>
                            <textarea valueLink={this.linkState('currentText')} name="comment" type="text" placeholder="Say something"/>

                                <label htmlFor="remember" className="pure-checkbox">
                                    <input checkedLink={this.linkState('checked')} name="remember" type="checkbox"/> Remember me
                                </label>

                        <button onClick={this.handleClick} className="pure-button pure-button-primary">Post</button>
                    </fieldset>
            </div>

        )
    },
    handleClick(){
        this.props.submit({
            text:this.state.currentText,
            name:this.state.currentName,
            checked:this.state.checked
        })

        this.setState(this.getInitialState())
    }
})

