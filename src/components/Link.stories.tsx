import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MyLink from './MyLink';
// import FaceBook from '../../public/facebook.svg';

export default {
  component: MyLink,
  title: 'MyLink',
} as ComponentMeta<typeof MyLink>;

const Template: ComponentStory<typeof MyLink> = (args) => <MyLink {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  url: 'https://www.facebook.com/framework.team',
  isTheme: false,
  text: 'dsadsa',
//   Component: FaceBook,
};
