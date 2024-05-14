import { HTMLAttributes } from "react";

export interface ModalType extends HTMLAttributes<HTMLDivElement> {
  show: boolean;
  onHide(): void;
}
