export const CONFIG_JSON = 'assets/config.json';

/** Costanti utilizzate per il routing child delle singole funzionalità generiche (elenco, modifica, visualizzazione)<br>
 esempio di uso dentro ad un routing module:<br>
<pre>
		children: [
      		{ path: '', redirectTo: GENERIC_ROUTES.LIST, pathMatch: 'full' },
      		{ path: GENERIC_ROUTES.LIST, component: SocietaListComponent }
    	]
</pre>
 */
export const GENERIC_ROUTES = {
	// Parti di route per le singole funzionalità
	LIST: 'list',
	EDIT: 'edit',
	VIEW: 'view',
	
	
	// Pagine Predefinite
	CONFIG_CONTROLLER_ERROR: '/',
	LANDING_PAGE: 'home',
};