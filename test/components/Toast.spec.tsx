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

    it('Should change value of textarea on change text', () => {
        const props = { onRequestClose: sinon.spy(),
                        onRequestAdd: sinon.spy() };
        const wrapper = mount(<Toast {...props} />);

        wrapper.find('.toast__text').first().simulate('change', {value: 'test'});
        assert(wrapper.find('.toast__text').text() === 'test');

        wrapper.find('.toast__text').first().simulate('change', {value: 'hoge'});
        assert(wrapper.find('.toast__text').text() === 'hoge');

        wrapper.find('.toast__text').first().simulate('change', {value: ''});
        assert(wrapper.find('.toast__text').text() === '');
    })

    it('Should not call onRequestAdd callback on add click with empty textarea', () => {
        const props = { onRequestClose: sinon.spy(),
                        onRequestAdd: sinon.spy() };
        const wrapper = mount(<Toast {...props} />);

        wrapper.find('.toast__add').simulate('click');
        assert(props.onRequestAdd.called === false);

        wrapper.find('.toast__text').first().simulate('change', {value: 'hoge'});
        wrapper.find('.toast__add').simulate('click');
        assert(props.onRequestAdd.called === true);
    });

    it('Should add correct value on add click with its textarea', () => {
        const props = { onRequestClose: sinon.spy(),
                        onRequestAdd: sinon.spy() };
        const wrapper = mount(<Toast {...props} />);
        wrapper.find('.toast__text').first().simulate('change', {value: "test1"});
        wrapper.find('.toast__add').simulate('click');
        assert( JSON.stringify(wrapper.state().toasts) === JSON.stringify([ [ 'test1' ] ]));

        wrapper.find('.toast__text').first().simulate('change', {value: "test2"});
        wrapper.find('.toast__add').simulate('click');
        assert( JSON.stringify(wrapper.state().toasts) === JSON.stringify([ [ 'test1' ], ['test2'] ]));
    });

    it('Should delete Toast on 3 seconds after add', () => {
        const props = { onRequestClose: sinon.spy(),
                        onRequestAdd: sinon.spy() };
        const wrapper = mount(<Toast {...props} />);
        const clock = sinon.useFakeTimers();

        clock.tick(3000);
        const add = (str) => {
            wrapper.find('.toast__text').first().simulate('change', {value: str});
            wrapper.find('.toast__add').simulate('click');
        }
        add('hoge1');
        add('hoge2');
        clock.tick(1000);
        add('hoge3');
        assert( JSON.stringify(wrapper.state().toasts) === JSON.stringify([ [ 'hoge1' ], [ 'hoge2' ], [ 'hoge3' ] ]));

        clock.tick(2000);
        assert( JSON.stringify(wrapper.state().toasts) === JSON.stringify([ [ 'hoge3' ] ]));

        clock.tick(1000);
        assert( JSON.stringify(wrapper.state().toasts) === JSON.stringify([]));
    });


});
