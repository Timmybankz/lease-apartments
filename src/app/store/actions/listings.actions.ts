import { createAction, props } from '@ngrx/store';
import { Feature } from '../models/listings.model';

export const ADD_LISTING = createAction(
    '[LISTING] AddListing',
    props<{ feature: Feature }>()
);

export const RESET = createAction('[LISTING] Reset');
