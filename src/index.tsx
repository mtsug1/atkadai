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
              <Toast onRequestClose={() => console.log('close')}
                     onRequestAdd={() => console.log('add')}>hoge</Toast>
            </div>
        );
    }
}

render(
    <KadaiComponent />
, document.getElementById('contents'));
