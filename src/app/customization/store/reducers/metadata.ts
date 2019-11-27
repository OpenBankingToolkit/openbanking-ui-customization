import { Action } from "@ngrx/store";
import _get from "lodash-es/get";

export const customizationMetaReducerKey = "metadata";

export interface ICustomizationMetadataState {
  title: string;
  description: string;
}

export enum types {
  ADD_META_TITLE = "ADD_META_TITLE",
  ADD_META_DESCRIPTION = "ADD_META_DESCRIPTION"
}

export class AddMetaTitleAction implements Action {
  readonly type = types.ADD_META_TITLE;
  constructor(public payload: string) {}
}

export class AddMetaDescriptionAction implements Action {
  readonly type = types.ADD_META_DESCRIPTION;
  constructor(public payload: string) {}
}

export const initialState: ICustomizationMetadataState = {
  title: "",
  description: ""
};

export type ActionsUnion = AddMetaTitleAction | AddMetaDescriptionAction;

export default function customizationMetaReducer(
  state: ICustomizationMetadataState = initialState,
  action: ActionsUnion
): ICustomizationMetadataState {
  switch (action.type) {
    case types.ADD_META_TITLE: {
      return { ...state, title: action.payload };
    }
    case types.ADD_META_DESCRIPTION: {
      return { ...state, description: action.payload };
    }

    default:
      return state;
  }
}

const selectAll = (state: any): string =>
  _get(state, `customization[${customizationMetaReducerKey}]`);
const selectTitle = (state: any): string =>
  _get(state, `customization[${customizationMetaReducerKey}].title`);
const selectDescription = (state: any): string =>
  _get(state, `customization[${customizationMetaReducerKey}].description`);

export const selectors = {
  selectAll,
  selectTitle,
  selectDescription
};
