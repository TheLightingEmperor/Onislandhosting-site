/* On Island Hosting: Google tag (GA4 + Google Ads) for every page.
 * Paste the IDs from Linda's accounts below and deploy. While they are
 * empty, nothing loads from Google; lead events still go to window.dataLayer. */
(function () {
  var GA4_ID = '';          // Google Analytics 4 measurement ID, e.g. 'G-ABC123XYZ'
  var ADS_ID = 'AW-18107785330';          // Google Ads tag ID, e.g. 'AW-123456789'
  var ADS_LEAD_LABEL = '4c3ICOzEur8dEPLAu7pD';  // label of the "Assessment request" conversion, e.g. 'AbC-dEfGhIj'

  window.dataLayer = window.dataLayer || [];
  var tagId = GA4_ID || ADS_ID;
  if (tagId) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(tagId);
    document.head.appendChild(s);
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    if (GA4_ID) window.gtag('config', GA4_ID);
    if (ADS_ID) window.gtag('config', ADS_ID);
  }

  // Call after a form is sent successfully. Records the lead in GA4 and,
  // once the label is set, as a Google Ads conversion.
  window.ohLead = function (params) {
    params = params || {};
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', params);
      if (ADS_ID && ADS_LEAD_LABEL) {
        window.gtag('event', 'conversion', { send_to: ADS_ID + '/' + ADS_LEAD_LABEL, value: 1.0, currency: 'USD' });
      }
    } else {
      window.dataLayer.push(Object.assign({ event: 'generate_lead' }, params));
    }
  };
})();
