import { TEMP } from "./actions";

const initialData = {
  temp: null,
};

export const reducer = (store = initialData, { type, payload }) => {
  if (type === TEMP) {
    return { ...store, temp: payload };
  } else {
    return store;
  }
};
