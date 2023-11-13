import { Dispatch, SetStateAction } from "react";

export interface FormProps {
  disabled?: boolean;
  setShowError?: Dispatch<SetStateAction<boolean>>;
}
