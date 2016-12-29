import * as assert from 'power-assert';
import * as React from 'react';
import * as sinon from 'sinon';
import { mount } from 'enzyme';
import Toast from '../../src/components/Toast';

describe('<Toast />', () => {
    it('Should call onRequestClose callback on close click', () => {
        const props = { onRequestClose: sinon.spy(),
                        onRequestAdd: sinon.spy() };
        const wrapper = mount(<Toast {...props} />);

        wrapper.find('.toast__close').simulate('click');
        assert(props.onRequestClose.called === true);
    });

    it('Should call onRequestClose callback on 3 seconds after the mount', () => {
        const clock = sinon.useFakeTimers();
        const props = { onRequestClose: sinon.spy(),
                        onRequestAdd: sinon.spy() };
        mount(<Toast {...props} />);

        clock.tick(1000);
        assert(props.onRequestClose.called === false);

        clock.tick(2000);
        assert(props.onRequestClose.called === true);
    });

    it('Should not call onRequestAdd callback on add click with empty textarea', () => {
        const props = { onRequestClose: sinon.spy(),
                        onRequestAdd: sinon.spy() };
        const wrapper = mount(<Toast {...props} />);

        wrapper.find('.toast__add').simulate('click');
        assert(props.onRequestAdd.called === false);

        wrapper.find('.toast__text').simulate('change', {traget: {value: 'test'}});
        wrapper.find('.toast__add').simulate('click');
        assert(props.onRequestAdd.called === true);
    });


});
