import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from './Card';

export default {
  component: Card,
  title: 'Card',
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  cardInfo: {
    title: '8',
    name: '1',
    painting: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftowardsdatascience.com%2F3-numpy-image-transformations-on-baby-yoda-c27c1409b411&psig=AOvVaw3fKXjW_ch4uFqmqLmjqKog&ust=1644398417861000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPjC2M7j7_UCFQAAAAAdAAAAABAD',
  },
};
