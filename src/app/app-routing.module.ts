import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      redirectTo: 'listings',
      pathMatch: 'full',
  },
  {
      path: 'listings',
      loadChildren: () => import('./views/listings/listings.module').then(m => m.ListingsModule)
  },
  {
      path: '**',
      redirectTo: 'listings'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
