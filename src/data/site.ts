/* Every business fact in one place. A page never types a phone number, a rating
   or a link: it reads them from here. Sources: _source/private-docs/FACTS.md. */

export const BRAND = {
  name: 'CAMP Landscape Management',
  short: 'CAMP',
  legalName: 'CAMP Landscape Management',
  owner: 'Chris Holmes',
  phone: '(616) 308-4862',
  phoneHref: 'tel:+16163084862',
  smsHref: 'sms:+16163084862',
  phoneE164: '+16163084862',
  email: 'Ops@camplandscape.com',
  /* The shop. Already public on the current site and the Google listing. */
  street: '1661 Blaine Ave SE',
  city: 'Grand Rapids',
  state: 'MI',
  zip: '49507',
  region: 'Greater Grand Rapids',
  origin: 'https://camplandscape.com',
};

export const RATING = {
  value: '',
  count: 0,
  countLabel: '',
  asOf: '',
};

export const LINKS = {
  google: '',
  facebook: '',
  instagram: '',
  /* The sister company that does CAMP's tree work. */
  treePartner: 'https://olemanrb.com/',
};

/** The social links in the order they are shown, skipping any without an address. */
export const SOCIAL = [
  { name: 'Instagram', href: LINKS.instagram },
  { name: 'Facebook', href: LINKS.facebook },
].filter((s) => s.href);

export const FORM = {
  /* Web3Forms key. Empty until the form is created and a real test arrives: an
     empty key shows the phone number instead of pretending to send. */
  key: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '',
  endpoint: 'https://api.web3forms.com/submit',
};

export const TRACKING = {
  ga4: '',
  host: 'camplandscape.com',
};
