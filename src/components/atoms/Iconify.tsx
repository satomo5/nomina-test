import { Icon } from "@iconify/react";

type IconProps = {
  icon: string;
  size?: number;
};

export default function Iconify({ ...props }: IconProps) {
  return <Icon {...props} />;
}
