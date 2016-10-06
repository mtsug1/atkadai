import * as assert from 'power-assert';
import * as React from 'react';
import * as sinon from 'sinon';
import { mount } from 'enzyme';
import Toast from '../../src/components/Toast';

describe('<Toast />', () => {
    it('Should call onRequestClose callback on close click', () => {
        const props = { onRequestClose: sinon.spy() };
        const wrapper = mount(<Toast {...props} />);

        wrapper.find('.toast__close').simulate('click');
        assert(props.onRequestClose.called === true);
    });

    it('Should call onRequestClose callback on 3 seconds after the mount', () => {
        const clock = sinon.useFakeTimers();
        const props = { onRequestClose: sinon.spy() };
        mount(<Toast {...props} />);

        clock.tick(1000);
        assert(props.onRequestClose.called === false);

        clock.tick(2000);
        assert(props.onRequestClose.called === true);
        var zero = 0, two = 2;
        var arr = [1, 2, 3];
        assert(arr.indexOf(zero) === two);
    });
});
