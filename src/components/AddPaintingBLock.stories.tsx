import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddPaintingBlock from './AddPaintingBlock';

export default {
  component: AddPaintingBlock,
  title: 'AddPaintingBlock',
} as ComponentMeta<typeof AddPaintingBlock>;

const Template: ComponentStory<typeof AddPaintingBlock> = (args) => <AddPaintingBlock {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  isDarkTheme: true,
};
