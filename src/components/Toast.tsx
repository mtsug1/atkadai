import * as React from 'react';


export interface PropTypes {
    onRequestClose: Function;
}


export default class Toast extends React.Component<PropTypes, any> {

    private timer: NodeJS.Timer;

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
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
    }

    render() {
      return (
          <div className="toast">
              <button className="toast__close" onClick={this.handleClose}>
                  Close!
              </button>
              <div className="toast__body">{this.props.children}</div>
          </div>
      );
    }
}
