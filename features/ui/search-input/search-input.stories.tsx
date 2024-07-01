import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { SearchInput } from "./search-input";

export default {
  title: "Components/SearchInput",
  component: SearchInput,
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
} as Meta;

const Template: StoryFn<typeof SearchInput> = (args) => {
  // Move the useState hook to the top level of the component
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <SearchInput
      {...args}
      searchValue={searchValue}
      handleSearchChange={handleSearchChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Search",
  placeholder: "Search...",
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Search",
  placeholder: "Search...",
  disabled: true,
};

export const Focused = Template.bind({});
Focused.args = {
  label: "Search",
  placeholder: "Search...",
  disabled: false,
};
