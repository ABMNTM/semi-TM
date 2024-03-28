export interface PropType {
  onChange: (val: boolean) => void;
}

export interface StateType {
  value: string;
  isValid: boolean;
}

export interface ActionType {
  type: string;
  payment: string;
}

export interface PasswordStateType extends StateType {
  confirm: string;
  confirmIsValid: boolean;
}
