import * as React from 'react';
import { render } from 'react-dom';
import Toast from './components/Toast';

class KadaiComponent extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
              hello world!
              <Toast onRequestClose={() => console.log('close')}>hoge</Toast>
            </div>
        );
    }
}

render(
    <KadaiComponent />
, document.getElementById('contents'));
