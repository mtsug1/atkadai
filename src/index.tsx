import * as React from 'react';
import { render } from 'react-dom';

class KadaiComponent extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        return (
            <div>hello world!<p className="red">hoge</p></div>
        );
    }
}

render(
    <KadaiComponent />
, document.getElementById('contents'));
