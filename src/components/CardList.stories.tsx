import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CardList from './CardList';

export default {
  component: CardList,
  title: 'CardList',
} as ComponentMeta<typeof CardList>;

const Template: ComponentStory<typeof CardList> = (args) => <CardList {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
};
