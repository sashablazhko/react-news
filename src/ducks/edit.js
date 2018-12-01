import { Record } from "immutable";

const ReducerState = Record({
  test: {
    title: "resst",
    title2: "resst",
    content: "dddddd",
  },
  loading: false,
  loaded: false,
  error: null,
  errorMsg: null,
});

export const moduleName = "edit";

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
