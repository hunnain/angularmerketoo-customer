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
			title: 'Accessories', megaMenu: true, type: 'sub', active: false, children: [
				{
					title: 'womens-accessories', type: 'sub', active: false, children: [
						{ path: '/shop/collection/left/sidebar', title: 'jewellery', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'hair-accessories', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'scraves-shawl', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'watches', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'glasses', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'other', type: 'link' }
					]
				},
				{
					title: 'mens-accessories', type: 'sub', active: false, children: [
						{ path: '/shop/collection/left/sidebar', title: 'ties', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'watches', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'glasses', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'belt', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'hats', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'jewellery', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'scraves-shawl', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'other', type: 'link' }
					]
				},
				{ path: '/home/watch', title: 'couple-accessories', type: 'link' },
				{
					title: 'masks-eye-masks', type: 'sub', active: false, children: [
						{ path: '/shop/collection/left/sidebar', title: 'masks', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'eye-masks', type: 'link' }
					]
				},
				{ path: '/shop/collection/left/sidebar', title: 'view-all', type: 'link' },
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

			title: 'Clothing', megaMenu: true, type: 'sub', active: false, children: [
				// { path: '/shop/collection/left/sidebar', title: 'left-sidebar', type: 'link' },
				// { path: '/shop/collection/right/sidebar', title: 'right-sidebar', type: 'link' },
				// { path: '/shop/collection/no/sidebar', title: 'no-sidebar', type: 'link' }
				{
					title: 'womensear', type: 'sub', active: false, children: [
						{ path: '/shop/collection/left/sidebar', title: 'blouse', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'skirts', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'trousers', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'knitwear', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'jacket', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'lingerie', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'homewear', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'sportwear', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'swimwear', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'socks', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'shoes', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'other', type: 'link' }
					]
				},
				{
					title: 'menswear', type: 'sub', active: false, children: [
						{ path: '/shop/collection/left/sidebar', title: 'blouse', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'trousers', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'knitwear', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'jacket', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'underwear', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'homewear', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'sportwear', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'swimwear', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'socks', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'shoes', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'other', type: 'link' }
					]
				},
				{
					path: '/shop/collection/left/sidebar', title: 'couple-clothing', type: 'link',
				},
				{ path: '/shop/collection/left/sidebar', title: 'view-all', type: 'link' },
			]
		},
		{
			title: 'Stationery', megaMenu: true, type: 'sub', active: false, children: [
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
						{ path: '/shop/collection/left/sidebar', title: 'post-cards', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'stickers', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'tapes', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'postage', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'envelopes-writing-papers', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'red-pockets-red-banners', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'paper-boxes-package-boxes', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'notebooks', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'albums', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'calenders', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'other', type: 'link' }
					]
				},
				{
					title: 'stationery', type: 'sub', active: false, children: [
						{ path: '/shop/collection/left/sidebar', title: 'pens', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'pen-cases', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'pen-stands', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'folders', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'stamps', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'bookmarks', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'slipcases', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'other', type: 'link' }
					]
				},
				{ path: '/shop/collection/left/sidebar', title: 'view-all', type: 'link' },
			]
		},
		{
			title: 'Daily Necessities', type: 'sub', megaMenu: true, badge: false, badgeText: '*', active: false, children: [
				{
					title: 'home-decoration', type: 'sub', active: false, children: [
						{ path: '/shop/collection/left/sidebar', title: 'furnish-and-decorate', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'candles-scents', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'plants', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'vases-china', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'posters', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'portrait-customisation', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'wallpapers', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'photo-frames', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'dolls-figures', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'storage-sets', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'furniture-beddings', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'other', type: 'link' }
					]
				},
				{
					title: 'kitchen-utensils', type: 'sub', active: false, children: [
						{ path: '/shop/collection/left/sidebar', title: 'cups', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'cutleries', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'kitchenware', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'other', type: 'link' },
					]
				},
				{
					title: 'food', type: 'sub', active: false, children: [
						{ path: '/shop/collection/left/sidebar', title: 'beverage', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'bakeries', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'snacks', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'seasonings', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'other', type: 'link' }
					]
				},
				{
					title: 'other', type: 'sub', active: false, children: [
						{ path: '/shop/collection/left/sidebar', title: 'pet-supplies', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'gear', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'technology', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'DIY-materials', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'other', type: 'link' }
					]
				},
				{ path: '/shop/collection/left/sidebar', title: 'view-all', type: 'link' },
			]
		},
		{
			title: 'Handbag/ Rucksack', megaMenu: true, type: 'sub', active: false, children: [
				{
					title: 'ladies', type: 'sub', active: false, children: [
						{ path: '/shop/collection/left/sidebar', title: 'clutches', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'crossbody-bags', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'shoulder-bags', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'cosmetic-bag', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'wallet', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'rucksacks', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'other', type: 'link' }
					]
				},
				{
					title: 'mens', type: 'sub', active: false, children: [
						{ path: '/shop/collection/left/sidebar', title: 'shoulder-bags', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'messenger-bags', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'rucksacks', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'briefcases', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'wallet', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'other', type: 'link' }
					]
				},
				{
					title: 'other', type: 'sub', active: false, children: [
						{ path: '/shop/collection/left/sidebar', title: 'laptop-pouch', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'travel-bags', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'gadget-bags', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'other', type: 'link' }
					]
				},

				{ path: '/shop/collection/left/sidebar', title: 'view-all', type: 'link' },
			]
		},
		{
			title: 'Skin Care', type: 'sub', megaMenu: true, active: false, children: [
				{
					title: 'womens', type: 'sub', active: false, children: [
						{ path: '/shop/collection/left/sidebar', title: 'cosmetic-products', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'skincare-products', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'body-products', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'hair-products', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'beauty-tools', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'nail-products', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'fragrance', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'other', type: 'link' }
					]
				},
				{
					title: 'Mens', type: 'sub', active: false, children: [
						{ path: '/shop/collection/left/sidebar', title: 'body-products', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'skincare-products', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'hair-products', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'fragrance', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'beard-products', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'other', type: 'link' }
					]
				},

				{ path: '/shop/collection/left/sidebar', title: 'view-all', type: 'link' },
			]
		}
		,
		{
			title: 'Leisure Experience', megaMenu: true, type: 'sub', active: false, children: [
				{
					title: 'handicraft', type: 'sub', active: false, children: [
						{ path: '/shop/collection/left/sidebar', title: 'accessories', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'candles-aromatherapy', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'planting', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'gourmet', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'illustration', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'leathercrafting', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'carpentry', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'pottery', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'knitting', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'other', type: 'link' }
					]
				},
				{
					title: 'other', type: 'sub', active: false, children: [
						{ path: '/shop/collection/left/sidebar', title: 'outdoor-activities', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'indoor-activities', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'casual-seminar', type: 'link' },
						{ path: '/shop/collection/left/sidebar', title: 'other', type: 'link' }
					]
				},

				{ path: '/shop/collection/left/sidebar', title: 'view-all', type: 'link' },
			]
		}
	];

	LEFTMENUITEMS: Menu[] = [
		{
			title: 'clothing', type: 'sub', megaMenu: true, active: false, children: [
				{
					title: 'mens fashion', type: 'link', active: false, children: [
						{ path: '/home/fashion', title: 'sports wear', type: 'link' },
						{ path: '/home/fashion', title: 'top', type: 'link' },
						{ path: '/home/fashion', title: 'bottom', type: 'link' },
						{ path: '/home/fashion', title: 'ethic wear', type: 'link' },
						{ path: '/home/fashion', title: 'sports wear', type: 'link' },
						{ path: '/home/fashion', title: 'shirts', type: 'link' },
						{ path: '/home/fashion', title: 'bottom', type: 'link' },
						{ path: '/home/fashion', title: 'ethic wear', type: 'link' },
						{ path: '/home/fashion', title: 'sports wear', type: 'link' }
					]
				},
				{
					title: 'women fashion', type: 'link', active: false, children: [
						{ path: '/home/fashion', title: 'dresses', type: 'link' },
						{ path: '/home/fashion', title: 'skirts', type: 'link' },
						{ path: '/home/fashion', title: 'westarn wear', type: 'link' },
						{ path: '/home/fashion', title: 'ethic wear', type: 'link' },
						{ path: '/home/fashion', title: 'bottom', type: 'link' },
						{ path: '/home/fashion', title: 'ethic wear', type: 'link' },
						{ path: '/home/fashion', title: 'sports wear', type: 'link' },
						{ path: '/home/fashion', title: 'sports wear', type: 'link' },
						{ path: '/home/fashion', title: 'bottom wear', type: 'link' }
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
						{ path: '/home/fashion', title: 'purses', type: 'link' },
						{ path: '/home/fashion', title: 'wallets', type: 'link' },
						{ path: '/home/fashion', title: 'leathers', type: 'link' },
						{ path: '/home/fashion', title: 'satchels', type: 'link' }
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
						{ path: '/home/fashion', title: 'necklaces', type: 'link' },
						{ path: '/home/fashion', title: 'earrings', type: 'link' },
						{ path: '/home/fashion', title: 'rings & wrist wear', type: 'link' },
						{
							path: '/home/fashion', title: 'more...', type: 'link', active: false, children: [
								{ path: '/home/fashion', title: 'ties', type: 'link' },
								{ path: '/home/fashion', title: 'cufflinks', type: 'link' },
								{ path: '/home/fashion', title: 'pockets squares', type: 'link' },
								{ path: '/home/fashion', title: 'helmets', type: 'link' },
								{ path: '/home/fashion', title: 'scarves', type: 'link' },
								{
									path: '/home/fashion', title: 'more...', type: 'link', active: false, children: [
										{ path: '/home/fashion', title: 'accessory gift sets', type: 'link' },
										{ path: '/home/fashion', title: 'travel accessories', type: 'link' },
										{ path: '/home/fashion', title: 'phone cases', type: 'link' }
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
						{ path: '/home/fashion', title: 'fragrances', type: 'link' },
						{ path: '/home/fashion', title: 'luxury beauty', type: 'link' },
						{ path: '/home/fashion', title: 'hair care', type: 'link' },
						{ path: '/home/fashion', title: 'tools & brushes', type: 'link' }
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
