import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { SearchInput } from "./search-input";

export default {
  title: "Components/SearchInput",
  component: SearchInput,
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
} as Meta;

const Template: StoryFn<typeof SearchInput> = (args) => (
  <SearchInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  placeholder: "Search...",
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: "Search...",
  disabled: true,
};

export const Focused = Template.bind({});
Focused.args = {
  placeholder: "Search...",
  disabled: false,
};
