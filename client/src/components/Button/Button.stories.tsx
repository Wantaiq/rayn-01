import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/ButtonOrLink',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Primary component for user interaction. Can be rendered as Button or Link using "as" property.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['button', 'a'],
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'button',
        },
      },
    },
    variant: {
      description:
        'Determines variant of a Button/Link component',
      control: 'select',
      options: [
        'primary',
        'danger',
        'warning',
        'success',
        'plain',
      ],
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    size: {
      options: [
        'small',
        'medium',
        'large',
        'xLarge',
        'neutral',
      ],
      control: 'select',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'medium',
        },
      },
    },
    underline: {
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
    rounded: {
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    disabled: {
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
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: (args) => {
    return (
      <Button
        variant='primary'
        {...args}>
        Button
      </Button>
    );
  },
};

export const ButtonLink: Story = {
  render: (args) => {
    return (
      <Button
        variant='primary'
        as='a'
        href='/'
        {...args}>
        Button link
      </Button>
    );
  },
};

export const PlainLink: Story = {
  render: (args) => {
    return (
      <Button
        variant='plain'
        underline={true}
        as='a'
        href='/'
        {...args}>
        Plain
      </Button>
    );
  },
};

export const DisabledButton: Story = {
  render: (args) => {
    return (
      <Button
        disabled={true}
        {...args}>
        Disabled
      </Button>
    );
  },
};
