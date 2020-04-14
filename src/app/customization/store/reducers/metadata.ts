import { Action } from "@ngrx/store";
import _get from "lodash-es/get";

export const customizationMetaReducerKey = "metadata";

export interface ICustomizationMetadataState {
  title: string;
  description: string;
}

export enum types {
  UPDATE_METAS = "UPDATE_METAS",
}

export class UpdateMetasAction implements Action {
  readonly type = types.UPDATE_METAS;
  constructor(public payload: ICustomizationMetadataState) {}
}

export const initialState: ICustomizationMetadataState = {
  title: "",
  description: "",
};

export type ActionsUnion = UpdateMetasAction;

export default function customizationMetaReducer(
  state: ICustomizationMetadataState = initialState,
  action: ActionsUnion
): ICustomizationMetadataState {
  switch (action.type) {
    case types.UPDATE_METAS: {
      const { title, description } = action.payload;
      return { ...state, title, description };
    }

    default:
      return state;
  }
}

const selectAll = (state: any): ICustomizationMetadataState =>
  _get(state, `customization[${customizationMetaReducerKey}]`);

export const selectors = {
  selectAll,
};
