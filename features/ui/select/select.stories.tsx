import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Select, SelectState } from "./select";

export default {
  title: "UI/Select",
  component: Select,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Select Label",
  placeholder: "Select an option",
  options: [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ],
  state: SelectState.empty,
};

export const Filled = Template.bind({});
Filled.args = {
  label: "Select Label",
  placeholder: "Select an option",
  options: [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ],
  state: SelectState.filled,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Select Label",
  placeholder: "Select an option",
  options: [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ],
  state: SelectState.disabled,
};
