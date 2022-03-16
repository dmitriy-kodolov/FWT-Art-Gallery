import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MultiSelect from './MultiSelect';

export default {
  component: MultiSelect,
  title: 'MultiSelect',
} as ComponentMeta<typeof MultiSelect>;

const Template: ComponentStory<typeof MultiSelect> = (args) => <MultiSelect {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  isDarkTheme: true,
};
