import produce from "immer";
import { Reducer } from "redux";
import { ICartState } from "./types";

const INITIAL_STATE: ICartState = {
  items: [],
};

export const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  console.log("STATE:", state);
  console.log("ACTION:", action);
  return produce(state, (draft) => {
    switch (action.type) {
      case "ADD_PRODUCT_TO_CART": {
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex(
          (item) => item.product.id === product.id
        );

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
        } else {
          draft.items.push({
            product,
            quantity: 1,
          });
        }
        break;
      }
      default: {
        return state;
      }
    }
  });
};

//option 2 - more verbose
// return {
//   ...state,
//   items: [
//     ...state.items,
//     {
//       product,
//       quantity: 1,
//     },
//   ],
// };
// return console.log("PAYLOAD:", action.payload);
