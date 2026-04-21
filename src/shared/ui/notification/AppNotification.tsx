import toast from "react-hot-toast";
import { ReactElement } from "react";

interface Props {
  icon?: ReactElement | string;
  text: string;
}

export const appNotification = ({ icon, text }: Props) => {
  toast(text, {
    icon,
    style: {
      textAlign: 'center',
      borderRadius: "9999px",
      background: "var(--bg-chat)",
      color: "var(--text-default)",
      width: 'max-content',
      maxWidth: 'none'
    },
  });
};
