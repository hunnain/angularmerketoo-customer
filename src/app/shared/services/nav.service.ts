import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	type?: string;
	megaMenu?: boolean;
	image?: string;
	active?: boolean;
	badge?: boolean;
	badgeText?: string;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {
	
	constructor() { }

	public screenWidth: any;
	public leftMenuToggle: boolean = false;
	public mainMenuToggle: boolean = false;

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			title: 'accessories', megaMenu: true, type: 'sub', active: false, children: [
				{
					title: 'womens-accessories', type: 'sub', active: false, children: [
						{ path: '/home/fashion', title: 'jewellery', type: 'link' },
						{ path: '/home/fashion-2', title: 'hair-accessories', type: 'link' },
						{ path: '/home/fashion-3', title: 'scraves-shawl', type: 'link' },
						{ path: '/home/fashion-3', title: 'watches', type: 'link' },
						{ path: '/home/fashion-3', title: 'glasses', type: 'link' },
						{ path: '/home/fashion-3', title: 'other', type: 'link' }
					]
				},
				{  title: 'mens-accessories', type: 'sub', active:false,  children: [
					{ path: '/home/fashion', title: 'ties', type: 'link' },
					{ path: '/home/fashion-3', title: 'watches', type: 'link' },
					{ path: '/home/fashion-3', title: 'glasses', type: 'link' },
					{ path: '/home/fashion-2', title: 'belt', type: 'link' },
					{ path: '/home/fashion-3', title: 'hats', type: 'link' },
					{ path: '/home/fashion-3', title: 'jewellery', type: 'link' },
					{ path: '/home/fashion-3', title: 'scraves-shawl', type: 'link' },
					{ path: '/home/fashion-3', title: 'other', type: 'link' }
				]},
				{ path: '/home/watch', title: 'couple-accessories', type: 'link' },
				{ title: 'masks-eye-masks',  type: 'sub', active:false,  children: [
					{ path: '/home/fashion', title: 'masks', type: 'link' },
					{ path: '/home/fashion-3', title: 'eye-masks', type: 'link' }
				] },
				{ path: '/home/flower', title: 'view-all', type: 'link' },
				// { path: '/home/beauty', title: 'beauty', type: 'link' },
				// { path: '/home/electronics', title: 'electronics', type: 'link' },
				// { path: '/home/pets', title: 'pets', type: 'link' },
				// { path: '/home/gym', title: 'gym', type: 'link' },
				// { path: '/home/tools', title: 'tools', type: 'link' },
				// { path: '/home/shoes', title: 'shoes', type: 'link' },
				// { path: '/home/bags', title: 'bags', type: 'link' },
				// { path: '/home/marijuana', title: 'marijuana', type: 'link' }
			]
		},
		{
			
			title: 'clothing',  megaMenu: true, type: 'sub', active: false, children: [
				// { path: '/shop/collection/left/sidebar', title: 'left-sidebar', type: 'link' },
				// { path: '/shop/collection/right/sidebar', title: 'right-sidebar', type: 'link' },
				// { path: '/shop/collection/no/sidebar', title: 'no-sidebar', type: 'link' }
				{
					title: 'womensear', type: 'sub', active: false, children: [
						{ path: '/home/fashion', title: 'blouse', type: 'link' },
						{ path: '/home/fashion-2', title: 'skirts', type: 'link' },
						{ path: '/home/fashion-3', title: 'trousers', type: 'link' },
						{ path: '/home/fashion-3', title: 'knitwear', type: 'link' },
						{ path: '/home/fashion-3', title: 'jacket', type: 'link' },
						{ path: '/home/fashion-3', title: 'lingerie', type: 'link' },
						{ path: '/home/fashion-3', title: 'homewear', type: 'link' },
						{ path: '/home/fashion-3', title: 'sportwear', type: 'link' },
						{ path: '/home/fashion-3', title: 'swimwear', type: 'link' },
						{ path: '/home/fashion-3', title: 'socks', type: 'link' },
						{ path: '/home/fashion-3', title: 'shoes', type: 'link' },
						{ path: '/home/fashion-3', title: 'other', type: 'link' }
					]
				},
				{
					title: 'menswear', type: 'sub', active: false, children: [
						{ path: '/home/fashion', title: 'blouse', type: 'link' },
						{ path: '/home/fashion-3', title: 'trousers', type: 'link' },
						{ path: '/home/fashion-3', title: 'knitwear', type: 'link' },
						{ path: '/home/fashion-3', title: 'jacket', type: 'link' },
						{ path: '/home/fashion-3', title: 'underwear', type: 'link' },
						{ path: '/home/fashion-3', title: 'homewear', type: 'link' },
						{ path: '/home/fashion-3', title: 'sportwear', type: 'link' },
						{ path: '/home/fashion-3', title: 'swimwear', type: 'link' },
						{ path: '/home/fashion-3', title: 'socks', type: 'link' },
						{ path: '/home/fashion-3', title: 'shoes', type: 'link' },
						{ path: '/home/fashion-3', title: 'other', type: 'link' }
					]
				},
				{
					path: '/home/fashion',title: 'couple-clothing', type: 'link',
				},
				{ path: '/home/flower', title: 'view-all', type: 'link' },
			]
		},
		{
			title: 'stationery',  megaMenu: true, type: 'sub', active: false, children: [
				// {
				// 	title: 'sidebar', type: 'sub', active: false, children: [
				// 		{ path: '/shop/product/left/sidebar/trim-dress', title: 'left-sidebar', type: 'link' },
				// 		{ path: '/shop/product/right/sidebar/trim-dress', title: 'right-sidebar', type: 'link' },
				// 		{ path: '/shop/product/no/sidebar/trim-dress', title: 'no-sidebar', type: 'link' }
				// 	]
				// },
				// { path: '/shop/product/three/column/trim-dress', title: 'three-column', type: 'link' },
				// { path: '/shop/product/four/image/belted-dress', title: 'four-image', type: 'link' },
				// { path: '/shop/product/bundle/trim-dress', title: 'bundle-product', type: 'link' },
				// { path: '/shop/product/image/outside/trim-dress', title: 'image-outside', type: 'link' }
				{
					title: 'paper-products', type: 'sub', active: false, children: [
						{ path: '/home/fashion', title: 'post-cards', type: 'link' },
						{ path: '/home/fashion-2', title: 'stickers', type: 'link' },
						{ path: '/home/fashion-3', title: 'tapes', type: 'link' },
						{ path: '/home/fashion-3', title: 'postage', type: 'link' },
						{ path: '/home/fashion-3', title: 'envelopes-writing-papers', type: 'link' },
						{ path: '/home/fashion-3', title: 'red-pockets-red-banners', type: 'link' },
						{ path: '/home/fashion-3', title: 'paper-boxes-package-boxes', type: 'link' },
						{ path: '/home/fashion-3', title: 'notebooks', type: 'link' },
						{ path: '/home/fashion-3', title: 'albums', type: 'link' },
						{ path: '/home/fashion-3', title: 'calenders', type: 'link' },
						{ path: '/home/fashion-3', title: 'other', type: 'link' }
					]
				},
				{
					title: 'stationery', type: 'sub', active: false, children: [
						{ path: '/home/fashion', title: 'pens', type: 'link' },
						{ path: '/home/fashion-3', title: 'pen-cases', type: 'link' },
						{ path: '/home/fashion-3', title: 'pen-stands', type: 'link' },
						{ path: '/home/fashion-3', title: 'folders', type: 'link' },
						{ path: '/home/fashion-3', title: 'stamps', type: 'link' },
						{ path: '/home/fashion-3', title: 'bookmarks', type: 'link' },
						{ path: '/home/fashion-3', title: 'slipcases', type: 'link' },
						{ path: '/home/fashion-3', title: 'other', type: 'link' }
					]
				},
				{ path: '/home/flower', title: 'view-all', type: 'link' },
			]
		},
		{
			title: 'Daily Necessities', type: 'sub', megaMenu: true, badge: false, badgeText: '*', active: false, children: [
				{
					title: 'home-decoration', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'furnish-and-decorate', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'candles-scents', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'plants', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'vases-china', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'posters', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'portrait-customisation', type: 'link' },
						{ path: '/pages/portfolio/masonry/full-width', title: 'wallpapers', type: 'link' },
						{ path: '/pages/portfolio/masonry/full-width', title: 'photo-frames', type: 'link' },
						{ path: '/pages/portfolio/masonry/full-width', title: 'dolls-figures', type: 'link' },
						{ path: '/pages/portfolio/masonry/full-width', title: 'storage-sets', type: 'link' },
						{ path: '/pages/portfolio/masonry/full-width', title: 'furniture-beddings', type: 'link' },
						{ path: '/pages/portfolio/masonry/full-width', title: 'other', type: 'link' }
					]
				},
				{
					title: 'kitchen-utensils', type: 'sub', active: false, children: [
						{ path: '/home/vegetable', title: 'cups', type: 'link' },
						{ path: '/home/watch', title: 'cutleries', type: 'link' },
						{ path: '/home/furniture', title: 'kitchenware', type: 'link' },
						{ path: '/home/flower', title: 'other', type: 'link' },
					]
				},
				{
					title: 'food', type: 'sub', active: false, children: [
						{ path: '/elements/theme/title', title: 'beverage', type: 'link' },
						{ path: '/elements/theme/collection-banner', title: 'bakeries', type: 'link' },
						{ path: '/elements/theme/home-slider', title: 'snacks', type: 'link' },
						{ path: '/elements/theme/category', title: 'seasonings', type: 'link' },
						{ path: '/elements/theme/services', title: 'other', type: 'link' }
					]
				},
				{
					title: 'other', type: 'sub', active: false, children: [
						{ path: '/elements/product/slider', title: 'pet-supplies', type: 'link' },
						{ path: '/elements/product/banners', title: 'gear', type: 'link' },
						{ path: '/elements/product/tabs', title: 'technology', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'DIY-materials', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'other', type: 'link' }
					]
				},
				{ path: '/home/flower', title: 'view-all', type: 'link' },
			]
		},
		{
			title: 'handbag',megaMenu: true, type: 'sub', active: false, children: [
				{
					title: 'ladies', type: 'sub', active: false, children: [
						{ path: '/pages/wishlist', title: 'clutches', type: 'link' },
						{ path: '/pages/cart', title: 'crossbody-bags', type: 'link' },
						{ path: '/pages/dashboard', title: 'shoulder-bags', type: 'link' },
						{ path: '/pages/login', title: 'cosmetic-bag', type: 'link' },
						{ path: '/pages/register', title: 'wallet', type: 'link' },
						{ path: '/pages/contact', title: 'rucksacks', type: 'link' },
						{ path: '/pages/forget/password', title: 'other', type: 'link' }
					]
				},
				{
					title: 'mens', type: 'sub', active: false, children: [
						{ path: '/pages/dashboard', title: 'shoulder-bags', type: 'link' },
						{ path: '/pages/wishlist', title: 'messenger-bags', type: 'link' },
						{ path: '/pages/contact', title: 'rucksacks', type: 'link' },
						{ path: '/pages/login', title: 'briefcases', type: 'link' },
						{ path: '/pages/register', title: 'wallet', type: 'link' },
						{ path: '/pages/forget/password', title: 'other', type: 'link' }
					]
				},
				{
					title: 'other', type: 'sub', active: false, children: [
						{ path: '/pages/wishlist', title: 'laptop-pouch', type: 'link' },
						{ path: '/pages/cart', title: 'travel-bags', type: 'link' },
						{ path: '/pages/dashboard', title: 'gadget-bags', type: 'link' },
						{ path: '/pages/login', title: 'other', type: 'link' }
					]
				},
				
				{ path: '/pages/collection', title: 'view-all', type: 'link' },
			]
		},
		{
			title: 'skin-care', type: 'sub',megaMenu: true, active: false, children: [
				{
					title: 'womens', type: 'sub', active: false, children: [
						{ path: '/pages/wishlist', title: 'cosmetic-products', type: 'link' },
						{ path: '/pages/cart', title: 'skincare-products', type: 'link' },
						{ path: '/pages/dashboard', title: 'body-products', type: 'link' },
						{ path: '/pages/dashboard', title: 'hair-products', type: 'link' },
						{ path: '/pages/dashboard', title: 'beauty-tools', type: 'link' },
						{ path: '/pages/dashboard', title: 'nail-products', type: 'link' },
						{ path: '/pages/dashboard', title: 'fragrance', type: 'link' },
						{ path: '/pages/login', title: 'other', type: 'link' }
					]
				},
				{
					title: 'Mens', type: 'sub', active: false, children: [
						{ path: '/pages/dashboard', title: 'body-products', type: 'link' },
						{ path: '/pages/cart', title: 'skincare-products', type: 'link' },
						{ path: '/pages/dashboard', title: 'hair-products', type: 'link' },
						{ path: '/pages/dashboard', title: 'fragrance', type: 'link' },
						{ path: '/pages/dashboard', title: 'beard-products', type: 'link' },
						{ path: '/pages/login', title: 'other', type: 'link' }
					]
				},
				
				{ path: '/pages/collection', title: 'view-all', type: 'link' },
			]
		}
		,
		{
			title: 'Leisure Experience',megaMenu: true, type: 'sub', active: false, children: [
				{
					title: 'handicraft', type: 'sub', active: false, children: [
						{ path: '/pages/dashboard', title: 'accessories', type: 'link' },
						{ path: '/pages/dashboard', title: 'candles-aromatherapy', type: 'link' },
						{ path: '/pages/cart', title: 'planting', type: 'link' },
						{ path: '/pages/dashboard', title: 'gourmet', type: 'link' },
						{ path: '/pages/dashboard', title: 'illustration', type: 'link' },
						{ path: '/pages/dashboard', title: 'leathercrafting', type: 'link' },
						{ path: '/pages/dashboard', title: 'carpentry', type: 'link' },
						{ path: '/pages/dashboard', title: 'pottery', type: 'link' },
						{ path: '/pages/dashboard', title: 'knitting', type: 'link' },
						{ path: '/pages/login', title: 'other', type: 'link' }
					]
				},
				{
					title: 'other', type: 'sub', active: false, children: [
						{ path: '/pages/dashboard', title: 'outdoor-activities', type: 'link' },
						{ path: '/pages/cart', title: 'indoor-activities', type: 'link' },
						{ path: '/pages/dashboard', title: 'casual-seminar', type: 'link' },
						{ path: '/pages/login', title: 'other', type: 'link' }
					]
				},
				
				{ path: '/pages/collection', title: 'view-all', type: 'link' },
			]
		}
	];

	LEFTMENUITEMS: Menu[] = [
		{
			title: 'clothing', type: 'sub', megaMenu: true, active: false, children: [
			  {
				  title: 'mens fashion',  type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
					  { path: '/home/fashion', title: 'top',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
					  { path: '/home/fashion', title: 'shirts',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' }
				  ]
			  },
			  {
				  title: 'women fashion',  type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'dresses',  type: 'link' },
					  { path: '/home/fashion', title: 'skirts',  type: 'link' },
					  { path: '/home/fashion', title: 'westarn wear',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom wear',  type: 'link' }
				  ]
			  },
			]
		},
		{
			title: 'bags', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'shopper bags', type: 'link' },
			  { path: '/home/fashion', title: 'laptop bags', type: 'link' },
			  { path: '/home/fashion', title: 'clutches', type: 'link' },
			  {
				  path: '/home/fashion', title: 'purses', type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'purses',  type: 'link' },
					  { path: '/home/fashion', title: 'wallets',  type: 'link' },
					  { path: '/home/fashion', title: 'leathers',  type: 'link' },
					  { path: '/home/fashion', title: 'satchels',  type: 'link' }
				  ]
			  },
			]
		},
		{
			title: 'footwear', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'sport shoes', type: 'link' },
			  { path: '/home/fashion', title: 'formal shoes', type: 'link' },
			  { path: '/home/fashion', title: 'casual shoes', type: 'link' }
			]
		},
		{
			path: '/home/fashion', title: 'watches', type: 'link'
		},
		{
			title: 'Accessories', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'fashion jewellery', type: 'link' },
			  { path: '/home/fashion', title: 'caps and hats', type: 'link' },
			  { path: '/home/fashion', title: 'precious jewellery', type: 'link' },
			  {
				  path: '/home/fashion', title: 'more..', type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'necklaces',  type: 'link' },
					  { path: '/home/fashion', title: 'earrings',  type: 'link' },
					  { path: '/home/fashion', title: 'rings & wrist wear',  type: 'link' },
					  {
						  path: '/home/fashion', title: 'more...',  type: 'link', active: false, children: [
							  { path: '/home/fashion', title: 'ties',  type: 'link' },
							  { path: '/home/fashion', title: 'cufflinks',  type: 'link' },
							  { path: '/home/fashion', title: 'pockets squares',  type: 'link' },
							  { path: '/home/fashion', title: 'helmets',  type: 'link' },
							  { path: '/home/fashion', title: 'scarves',  type: 'link' },
							  {
								  path: '/home/fashion', title: 'more...',  type: 'link', active: false, children: [
									  { path: '/home/fashion', title: 'accessory gift sets',  type: 'link' },
									  { path: '/home/fashion', title: 'travel accessories',  type: 'link' },
									  { path: '/home/fashion', title: 'phone cases',  type: 'link' }
								  ]
							  },
						]
					  }
				  ]
			  },
			]
		},
		{
			path: '/home/fashion', title: 'house of design', type: 'link'
		},
		{
			title: 'beauty & personal care', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'makeup', type: 'link' },
			  { path: '/home/fashion', title: 'skincare', type: 'link' },
			  { path: '/home/fashion', title: 'premium beaty', type: 'link' },
			  {
				  path: '/home/fashion', title: 'more..', type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'fragrances',  type: 'link' },
					  { path: '/home/fashion', title: 'luxury beauty',  type: 'link' },
					  { path: '/home/fashion', title: 'hair care',  type: 'link' },
					  { path: '/home/fashion', title: 'tools & brushes',  type: 'link' }
				  ]
			  },
			]
		},
		{
			path: '/home/fashion', title: 'home & decor', type: 'link'
		},
		{
			path: '/home/fashion', title: 'kitchen', type: 'link'
		},
	];

	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
	leftMenuItems = new BehaviorSubject<Menu[]>(this.LEFTMENUITEMS);

}
