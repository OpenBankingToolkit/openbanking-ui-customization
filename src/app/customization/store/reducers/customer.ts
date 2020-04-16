import { Action } from "@ngrx/store";
import _get from "lodash-es/get";

export const customizationCustomerReducerKey = "customer";

export interface ICustomizationCustomerState {
  name: string;
  contact: string;
  support: string;
  privacy: string;
  terms: string;
  about: string;
}

export enum types {
  UPDATE_CUSTOMER = "UPDATE_CUSTOMER",
}

export class UpdateCustomerAction implements Action {
  readonly type = types.UPDATE_CUSTOMER;
  constructor(public payload: ICustomizationCustomerState) {}
}

export const initialState: ICustomizationCustomerState = {
  name: "",
  contact: "",
  support: "",
  privacy: "",
  terms: "",
  about: "",
};

export type ActionsUnion = UpdateCustomerAction;

export default function customizationCustomerReducer(
  state: ICustomizationCustomerState = initialState,
  action: ActionsUnion
): ICustomizationCustomerState {
  switch (action.type) {
    case types.UPDATE_CUSTOMER: {
      const { name, contact, support, privacy, terms, about } = action.payload;
      return { ...state, name, contact, support, privacy, terms, about };
    }

    default:
      return state;
  }
}

const selectAll = (state: any): ICustomizationCustomerState =>
  _get(state, `customization[${customizationCustomerReducerKey}]`);

export const selectors = {
  selectAll,
};
