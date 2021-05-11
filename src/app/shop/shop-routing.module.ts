import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductLeftSidebarComponent } from './product/sidebar/product-left-sidebar/product-left-sidebar.component';
// import { ProductRightSidebarComponent } from './product/sidebar/product-right-sidebar/product-right-sidebar.component';
// import { ProductNoSidebarComponent } from './product/sidebar/product-no-sidebar/product-no-sidebar.component';
// import { ThreeColumnComponent } from './product/three-column/three-column.component';
// import { FourImageComponent } from './product/four-image/four-image.component';
// import { BundleProductComponent } from './product/bundle-product/bundle-product.component';
// import { ImageOutsideComponent } from './product/image-outside/image-outside.component';

import { CollectionLeftSidebarComponent } from './collection/collection-left-sidebar/collection-left-sidebar.component';
// import { CollectionRightSidebarComponent } from './collection/collection-right-sidebar/collection-right-sidebar.component';
// import { CollectionNoSidebarComponent } from './collection/collection-no-sidebar/collection-no-sidebar.component';

import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
// import { CompareComponent } from './compare/compare.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessComponent } from './checkout/success/success.component';
import { FailedPageComponent } from './checkout/failed-page/failed-page.component';

import { Resolver } from '../shared/services/resolver.service';
import { DesignerPageComponent } from './collection/designer-page/designer-page.component';
// import { MailboxComponent } from './collection/mailbox/mailbox.component';
import { NotificationComponent } from './collection/notification/notification.component';
import { MyProfileComponent } from './collection/myprofile/myprofile.component';
import { AuthGuard } from '../core/auth.guard';
import { CustomProductComponent } from '../shared/components/product/custom-product/custom-product.component';

const routes: Routes = [
  {
    path: 'product/left/sidebar/:slug',
    component: ProductLeftSidebarComponent,
    resolve: {
      data: Resolver
    }
  },
  // {
  //   path: 'product/right/sidebar/:slug',
  //   component: ProductRightSidebarComponent,
  //   resolve: {
  //     data: Resolver
  //   }
  // },
  // {
  //   path: 'product/no/sidebar/:slug',
  //   component: ProductNoSidebarComponent,
  //   resolve: {
  //     data: Resolver
  //   }
  // },
  // {
  //   path: 'product/three/column/:slug',
  //   component: ThreeColumnComponent,
  //   resolve: {
  //     data: Resolver
  //   }
  // },
  // {
  //   path: 'product/four/image/:slug',
  //   component: FourImageComponent,
  //   resolve: {
  //     data: Resolver
  //   }
  // },
  // {
  //   path: 'product/bundle/:slug',
  //   component: BundleProductComponent,
  //   resolve: {
  //     data: Resolver
  //   }
  // },
  // {
  //   path: 'product/image/outside/:slug',
  //   component: ImageOutsideComponent,
  //   resolve: {
  //     data: Resolver
  //   }
  // },
  {
    path: 'customize-product/:id',
    component: CustomProductComponent,
    // resolve: {
    //   data: Resolver
    // }
  },
  {
    path: 'collection/left/sidebar',
    component: CollectionLeftSidebarComponent
  },
  {
    path: 'designer/:id',
    component: DesignerPageComponent,
    // canActivate: [AuthGuard]
  },
  // {
  //   path: 'collection/right/sidebar',
  //   component: CollectionRightSidebarComponent
  // },
  // {
  //   path: 'collection/no/sidebar',
  //   component: CollectionNoSidebarComponent
  // },
  {
    path: 'cart',
    component: CartComponent,
    // canActivate: [AuthGuard]
  },
  // {
  //   path: 'mail',
  //   component: MailboxComponent
  // },
  {
    path: 'profile',
    component: MyProfileComponent
  },
  {
    path: 'notification',
    component: NotificationComponent
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'compare',
  //   component: CompareComponent
  // },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'checkout/success',
    component: SuccessComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'checkout/failed',
    component: FailedPageComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
