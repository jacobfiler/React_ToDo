import React, {Component} from 'react';

export class ToDoRow extends Component{
   //   Below we define the value for the onChagne event property as a callback()
   //   This is how child components are able to communicate with parents, as they cannot update the value of props passed to them from a parent component. This is because React only supports a one way data-flow (from parent down to a child).
   //   However, the parent can provide a function property (prop) that children can call upon whenever something important (like an event) happens.
    
   //   There are two different kinds of PROPS
   //   Data PROPS - allow the parent to pass data to the child
   //   FUNCTION PROPS - allows the child to communicate with the parent
   
   render = () =>
    <tr>
        <td>{this.props.item.action}</td>
        <td>
            <input type="checkbox" checked={this.props.item.done}
            onChange={() => this.props.callback(this.props.item)} />
        </td>
    </tr>
}

