import React, {Component} from 'react';

export class ToDoCreator extends Component {
    constructor (props){
        super(props);
        this.state = {newItemText: ""}
    }//END OF CONSTRUCTOR

    //  Method for the onChange of the input box
    updateNewTextValue = (event) => {
        this.setState({newItemText:event.target.value});
    }

    //  Method for the onClick of the Add Button
    createNewTodo = () => {
        this.props.callback(this.state.newItemText);
        this.setState({newItemText: ""});
    }

    render = () =>
        <div className="my-1 col-md-8 offset-md-2 ">
            <div className="form-row">
                <input className="form-control offset-md-3 col-md-5" value={this.state.newItemText}
                onChange={this.updateNewTextValue} />
                <button className="btn btn-outline-primary mt-1 offset-md-1" onClick={this.createNewTodo}>
                    Add
                </button>
            </div>
        </div>
}