import toast, { ToastOptions } from "react-hot-toast";

interface NotifyOptions {
  message: string;
  type: string;
  duration: number;
}

/**
 * Utility to display the Toast Notifications
 */

export const toastNotifier = ({
  message,
  type = "info",
  duration,
}: NotifyOptions): void => {
  const options: ToastOptions = {
    duration: duration || 4000,
    position: "bottom-right",
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "loading":
      toast.loading(message, options);
      break;
    default:
      toast(message, options);
      break;
  }
};
