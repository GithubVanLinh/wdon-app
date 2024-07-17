import {
  showNotify as _showNotify,
  hideNotify,
} from "@/lib/feature/app/appSlice";
import { useAppDispatch } from "@/lib/hooks";

export const useNotify = () => {
  const dispatch = useAppDispatch();
  const showNotify = (message: string) => {
    dispatch(_showNotify(message));

    setTimeout(() => {
      dispatch(hideNotify());
    }, 5000);
  };
  return [showNotify];
};
