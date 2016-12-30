import * as React from 'react';
import * as ReactDOM from 'react-dom';


export interface PropTypes {
    onRequestClose: Function;
    onRequestAdd: Function;
}


export default class Toast extends React.Component<PropTypes, any> {

    private timer: NodeJS.Timer;

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.state = {
            textarea: "",
            toasts: []
        }
    }

    componentDidMount() {
        this.timer = setTimeout(this.handleClose, 3000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        this.timer = null;
    }

    handleClose() {
        this.props.onRequestClose();
        this.setState({ toasts: [] });
    }

    handleAdd() {
        this.props.onRequestAdd();
        const t = ReactDOM.findDOMNode(this.refs["textarea"])["value"];
        const _toasts = this.state.toasts.concat(t);
        this.setState({ toasts: _toasts })
    }

    render() {
      return (
          <div className="toast">
              <div>{ this.state.toasts.join("\n") }</div>
              <button className="toast__close" onClick={this.handleClose}>
                  Close!
              </button>
              <div>
                  <textarea className="toast__text" ref="textarea" value={ this.state.textarea } required onChange={ (e) => { this.setState({ textarea: e["value"] })}}></textarea>
                  <button className="toast__add" onClick={ () => {
                      if(ReactDOM.findDOMNode(this.refs["textarea"])["value"] !== ""){
                          this.handleAdd(); 
                      }}}>
                      Add!
                  </button>
              </div>
              <div className="toast__body">{this.props.children}</div>
          </div>
      );
    }
}
