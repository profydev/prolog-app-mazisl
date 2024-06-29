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
  options: ["Option 1", "Option 2", "Option 3"],
  state: SelectState.empty,
};

export const Filled = Template.bind({});
Filled.args = {
  label: "Select Label",
  placeholder: "Select an option",
  options: ["Option 1", "Option 2", "Option 3"],
  state: SelectState.filled,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Select Label",
  placeholder: "Select an option",
  options: ["Option 1", "Option 2", "Option 3"],
  state: SelectState.disabled,
};
