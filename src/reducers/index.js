import member from './member';
import receipts from './receipts';
import recipes from './recipes'

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

export default {
  rehydrated,
  member,
  recipes,
  receipts
};
