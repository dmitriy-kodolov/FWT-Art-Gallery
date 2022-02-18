import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Loader from './Loader';

export default {
  component: Loader,
  title: 'Loader',
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
};
