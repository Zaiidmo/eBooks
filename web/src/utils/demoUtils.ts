import { IS_DEMO_MODE } from "@/constants/demoData";
import { toastNotifier } from "./toastNotifier";

/**
 * Higher-order function to wrap handlers and prevent execution in demo mode.
 * Shows a toast notification explaining that the action is disabled.
 */
export const withDemoCheck = <T extends (...args: any[]) => any>(handler: T) => {
  return (...args: Parameters<T>): ReturnType<T> | void => {
    if (IS_DEMO_MODE) {
      toastNotifier({
        message: "Action Disabled: This is a demo version with no live backend.",
        type: "error",
        duration: 5000,
      });
      return;
    }
    return handler(...args);
  };
};

/**
 * Checks if demo mode is active and shows a notification.
 * Returns true if in demo mode, false otherwise.
 */
export const checkDemoMode = () => {
  if (IS_DEMO_MODE) {
    toastNotifier({
      message: "Action Disabled: This is a demo version with no live backend.",
      type: "error",
      duration: 5000,
    });
    return true;
  }
  return false;
};
