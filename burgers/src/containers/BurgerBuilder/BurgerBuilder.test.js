import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import Buildcontrols from '../../components/BuildControls/BuildControls';

configure({adapter: new Adapter()});


describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper=shallow(<BurgerBuilder onInitIngredients={() => {}} />);
    });

    it('should render BuildControls when ings is passed as props', () => {
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(Buildcontrols)).toHaveLength(1);
    })
})