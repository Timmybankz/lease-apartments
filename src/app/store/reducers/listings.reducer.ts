import { Action } from '@ngrx/store';
import { Listing } from '../models/listings.model';
import * as ListingActions from '../actions/listings.actions';
import { createReducer, on } from '@ngrx/store';
import { listings } from 'src/app/mock/listings';


const initialState: Readonly<Listing> = listings;
 
const _counterReducer = createReducer(
  initialState,
  on(ListingActions.ADD_LISTING, (state, { feature }) => {
    state.features.push(feature);
    return state;
  }),
  on(ListingActions.RESET, (state) => initialState)
);
 
export function counterReducer(state: any, action: any) {
  return _counterReducer(state, action);
}

