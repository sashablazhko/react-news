import { Record } from "immutable";

const EditedRecord = Record({
  title: 1,
  content: 2,
});

const ReducerState = Record({
  edited: new EditedRecord(),
  loading: false,
  loaded: false,
  error: null,
  errorMsg: null,
});

export const moduleName = "edit";
export const SET_DATA_ON_EDIT = `${moduleName}/SET_DATA_ON_EDIT`;

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
}

export function createNews() {
  return false;
}

export function editNews() {
  return false;
}

export function deleteNews() {
  return false;
}
