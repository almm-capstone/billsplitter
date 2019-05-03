import { Firebase, FirebaseRef } from '../lib/firebase';

/**
  * Get Meals What the shit are meals?
  */
// export function getMeals() {
//   if (Firebase === null) return () => new Promise(resolve => resolve());

//   return dispatch => new Promise((resolve, reject) => FirebaseRef.child('meals').once('value')
//     .then((snapshot) => {
//       const data = snapshot.val() || [];
//       return resolve(dispatch({ type: 'MEALS_REPLACE', data }));
//     }).catch(reject)).catch((err) => { throw err.message; });
// }

/**
  * Get Receipts
  */
export function getReceipts() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef.child('receipts')
    .on('value', (snapshot) => {
      const data = snapshot.val() || [];
      return resolve(dispatch({ type: 'RECEIPTS_REPLACE', data }));
    })).catch((err) => { throw err.message; });
}

//Update Receipts
export function updateReceipts() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef.child('receipts')
    .off());
}