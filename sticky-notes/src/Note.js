import React from 'react'
import './App.css'
import Draggable from 'react-draggable'
var Note = React.createClass({

  getInitialState(){  //the default features that we want to assign when new object is created
    return {editing: false}
  },
  componentWillMount(){
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 150, 'px'),
      top: this.randomBetween(0, window.innerHeight - 150, 'px')
    }
  },
  shouldComponentUpdate(nextProps, nextState){
    return this.props.children !== nextProps.children || this.state !== nextState
  },
  componentDidUpdate(){
    if(this.state.editing){
      this.refs.newText.focus()
      this.refs.newText.select()
    }
  },
  randomBetween(x,y,s){
    return (x + Math.ceil(Math.random()*(y-x)) ) + s
  },
  edit(){
    this.setState({editing: true})
  },
  save(){
    this.props.onChange(this.refs.newText.value, this.props.id)
    this.setState({editing: false})
  },
  remove(){
    this.props.onRemove(this.props.id)
  },
  renderForm(){ //to display editable note form
    return( //this paranthesis will ensure that code does not break if div is not started on same line as return.
            <div className="note"
            style = {this.style}>
              <textarea ref="newText"
                        defaultValue={this.props.children}>
                        </textarea>
              <button onClick={this.save}>save</button>
            </div>)
  },
  renderDisplay(){
    return (
              <div className="note"
              style = {this.style}>
                <p>{this.props.children}</p>
                  <span>
                    <button onClick={this.edit}>Edit</button>
                    <button onClick={this.remove}>X</button>
                  </span>
              </div>)
  },
  render() {
    return (<Draggable>
              {(this.state.editing) ? this.renderForm() : this.renderDisplay()}
            </Draggable>
    )
  }
})

export default Note
