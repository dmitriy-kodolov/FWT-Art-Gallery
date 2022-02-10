import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Link from './Link';

export default {
  component: Link,
  title: 'Link',
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  url: 'https://www.facebook.com/framework.team',
  isTheme: false,
  text: 'dsadsa',
};
