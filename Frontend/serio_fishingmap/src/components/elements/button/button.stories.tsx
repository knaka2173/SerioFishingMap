import type { Meta, StoryObj } from "@storybook/react";

import styles from "./Button.module.css";
import { CustomButton } from "@/components/elements/button/button";

const meta: Meta<typeof CustomButton> = {
  title: "Elements/CustomButton",
  component: CustomButton,
  tags: ["autodocs"],
  args: {
    mode: "primary",
    size: "md",
    label: "Sample",
    isDisabled: false,
    isLoading: false,
  },
  argTypes: {
    // Storybookのコントロールを分かりやすく
    mode: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "danger",
        "ghost",
        "success",
        "warning",
      ],
    },
    size: {
      control: "select",
      options: ["lg", "md", "sm", "xs"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof CustomButton>;

export const Primary: Story = {
  args: {
    mode: "primary",
    label: "Primary",
  },
};

export const Secondary: Story = {
  args: {
    mode: "secondary",
    label: "Secondary",
  },
};

export const Danger: Story = {
  args: {
    mode: "danger",
    label: "Danger",
  },
};

export const Disabled: Story = {
  args: {
    mode: "primary",
    label: "Disabled",
    isDisabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <>
      <h4 className={styles.title}>size</h4>
      <div className={styles.buttonWrapper}>
        <CustomButton mode="primary" size="xs" label="xs" />
        <CustomButton mode="primary" size="sm" label="sm" />
        <CustomButton mode="primary" size="md" label="md" />
        <CustomButton mode="primary" size="lg" label="lg" />
      </div>
    </>
  ),
};

export const Gallery: Story = {
  render: () => (
    <>
      <h4 className={styles.title}>modes</h4>
      <div className={styles.buttonWrapper}>
        <CustomButton mode="primary" label="primary" />
        <CustomButton mode="secondary" label="secondary" />
        <CustomButton mode="danger" label="danger" />
        <CustomButton mode="ghost" label="ghost" />
        <CustomButton mode="success" label="success" />
        <CustomButton mode="warning" label="warning" />
      </div>

      <h4 className={styles.title}>disabled</h4>
      <div className={styles.buttonWrapper}>
        <CustomButton mode="primary" label="primary" isDisabled />
        <CustomButton mode="secondary" label="secondary" isDisabled />
        <CustomButton mode="danger" label="danger" isDisabled />
      </div>

      <h4 className={styles.title}>
        with
        icons（※CustomButton側がアイコン対応していない場合は表示されません）
      </h4>
      <div className={styles.buttonWrapper}>
        <CustomButton mode="primary" label="検索" />
        <CustomButton mode="secondary" label="お知らせ" />
        <CustomButton mode="danger" label="削除します" />
      </div>
    </>
  ),
};
