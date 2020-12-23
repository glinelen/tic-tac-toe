import GameSettings from './gameSettings';
import React from 'react';
import {shallow} from 'enzyme';

describe('GameSettings',()=> {
    it('should have shpaes for player 1',()=> {
        const wrapper = shallow(<GameSettings/>);
        var t = wrapper.find('select');
        expect(wrapper.find(select)).to.have.lengthOf(3);

    });

    
});