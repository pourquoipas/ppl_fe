/**
 *  Menu item for Menu 
 **/
export class MenuItem {
	public label: string;
	public tooltip: string;
	public route: string;
	public id: string;
	public items: MenuItem[];
}

export const DEMO_MENU = [
	{
		label: 'prova',
		tooltip: 'gruppo menu di prova',
		route: '/admin',
		id: '1',
		items: [
			{
				label: 'admin',
				tooltip: 'admin',
				route: 'admin',
				id: '2',
				items: null,
			}
		]
	},
];

export const ADMIN_MENU = [
	{
		label: 'prova',
		tooltip: 'gruppo menu di prova',
		route: '/admin',
		id: '1',
		items: [
			{
				label: 'admin',
				tooltip: 'admin',
				route: 'admin',
				id: '2',
				items: null,
			},
			{
				label: 'societa',
				tooltip: 'societa',
				route: 'societa',
				id: '3',
				items: null,
			},
		]
	},
	{
		label: 'demo',
		tooltip: 'gruppo menu demo',
		route: '/demo',
		id: '100',
		items: [
			{
				label: 'demo',
				tooltip: 'demo',
				route: 'demo',
				id: '101',
				items: null,
			}
		]
	},
	{
		label: 'base',
		tooltip: 'gruppo menu base',
		route: '/base',
		id: '200',
		items: [
			{
				label: 'tabelle',
				tooltip: 'tabelle',
				route: '/base',
				id: '201',
				items: [
					{
						label: 'stati',
						tooltip: 'stati',
						route: 'base/stati',
						id: '202',
						items: null,
					},
					{
						label: 'stati federati',
						tooltip: 'stati federati',
						route: 'base/statifederati',
						id: '203',
						items: null,
					},
					{
						label: 'regioni',
						tooltip: 'regioni',
						route: 'base/regioni',
						id: '204',
						items: null,
					},
					{
						label: 'province',
						tooltip: 'province',
						route: 'base/province',
						id: '205',
						items: null,
					},
					{
						label: 'comuni',
						tooltip: 'comuni',
						route: 'base/comuni',
						id: '206',
						items: null,
					},
					{
						label: 'titoli di studio',
						tooltip: 'titoli di studio',
						route: 'base/titolistudio',
						id: '207',
						items: null,
					},
					
				],
			}
		]
	},
	{
		label: 'hr',
		tooltip: 'gruppo menu hr',
		route: '/hr',
		id: '300',
		items: [
			{
				label: 'anagrafiche',
				tooltip: 'anagrafiche',
				route: '/hr',
				id: '301',
				items: [
					{
						label: 'persone',
						tooltip: 'persone',
						route: 'hr/persone',
						id: '302',
						items: null,
					},
				]
			}
		]
	},
];
