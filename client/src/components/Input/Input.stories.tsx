import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Primary component for user text input. It can be of type text, email and password.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    placeholder: {
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    error: {
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email'],
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'text',
        },
      },
    },
    inline: {
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    full: {
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    className: {
      description:
        'Provides additional classes to component.',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const InitialInput: Story = {
  render: (args) => {
    return (
      <Input
        placeholder='JohnDoe123'
        label='Username'
        error={false}
        {...args}
      />
    );
  },
};

export const InputWithError: Story = {
  render: (args) => {
    return (
      <Input
        placeholder='JohnDoe123'
        label='Username'
        error={true}
        {...args}
      />
    );
  },
};
