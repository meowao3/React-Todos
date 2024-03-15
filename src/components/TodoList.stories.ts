// testing on Header function from Todo list
import type { Meta, StoryObj } from '@storybook/react';

import { InputTextBox } from './Todos';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof InputTextBox> = {
  component: InputTextBox,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof InputTextBox>;

export const FirstStory: Story = {
  name: "Randos",
  args: {
    //👇 The args you need here will depend on your component
    backgroundColor: '#ff0',
    label: 'Button',
  },
};