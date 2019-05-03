import Store from '../store/receipts';

export const initialState = Store;

export default function receiptReducer(state = initialState, action) {
  switch (action.type) {
      case 'RECEIPTS_REPLACE': {
      let receipts = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        receipts = action.data.map(item => ({
          id: item.id,
          title: item.title,
          body: item.body,
          image: item.image,
          author: item.author,
          items: item.items,
        }));
      }
      return {
        ...state,
        receipts,
      };
    }
    default:
      return state;
  }
}
