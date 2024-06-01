import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { ButtonNew, ButtonSize, ButtonColor, ButtonState } from "./button-new";

export default {
  title: "UI/ButtonNew",
  component: ButtonNew,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof ButtonNew>;

const Template: StoryFn<typeof ButtonNew> = (args) => <ButtonNew {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: ButtonSize.medium,
  color: ButtonColor.primary,
  state: ButtonState.default,
  children: "Button CTA",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  size: ButtonSize.medium,
  color: ButtonColor.primary,
  state: ButtonState.default,
  children: "Button CTA",
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <g clip-path="url(#clip0_23366_556)">
        <path
          d="M9.99996 18.3333C14.6023 18.3333 18.3333 14.6024 18.3333 9.99999C18.3333 5.39762 14.6023 1.66666 9.99996 1.66666C5.39759 1.66666 1.66663 5.39762 1.66663 9.99999C1.66663 14.6024 5.39759 18.3333 9.99996 18.3333Z"
          stroke="white"
          stroke-width="1.67"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_23366_556">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  iconPosition: "leading",
};
