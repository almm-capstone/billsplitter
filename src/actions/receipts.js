import { Firebase, FirebaseRef } from '../lib/firebase';

const user = Firebase.auth.currentUser;
/**
 * Get Receipts
 */
export function getReceipts() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch =>
    new Promise(resolve =>
      FirebaseRef.child('receipts').on('value', snapshot => {
        const data = snapshot.val() || [];
        return resolve(dispatch({ type: 'RECEIPTS_REPLACE', data }));
      }),
    ).catch(err => {
      throw err.message;
    });
}

//Update Receipts
export function updateReceipts() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch =>
    new Promise(resolve => FirebaseRef.child('receipts').off());
}
