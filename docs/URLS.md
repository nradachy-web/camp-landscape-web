# URLs

The old WordPress site's public pages keep their exact addresses: `/`, `/landscaping/`, `/landscape-management/`, `/irrigation/`, `/about/`, `/contact/`, `/blog/` and the 17 posts under it. New pages: `/commercial/`, `/snow-and-ice-removal/`, `/plan-your-year/`, `/services/`, `/service-areas/`, `/get-an-estimate/`.

The WordPress install also serves CAMP's back office (`/employee-portal/`, `/camp-login/`, `/estimate/`, `/estimates/`, `/invoices/`, `/work-orders/`, `/scheduler/`, `/cmp-customers/`, `/qbo-auth-success/` and more). A launch must route only the public pages to this site and leave every back office route on WordPress, the same pattern as the Ole Man RB launch.

Service pages: `/<service>/`. Town hubs: `/service-areas/<town>/` once a content file exists. Service in a town: `/<service-slug>-<town>-mi/`, only where `MATRIX` in `src/data/cities.ts` says so.
