import { Listing } from './store/models/listings.model';

export interface AppState {
  readonly listing: Listing;
}
