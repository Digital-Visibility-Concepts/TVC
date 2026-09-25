// src/components/SEO.jsx
// Drop-in SEO component using react-helmet-async
// Usage: <SEO title="Page Title" description="..." path="/about" />

import { Helmet } from 'react-helmet-async';

const SITE = {
  name: 'Tri-Valley Clinic',
  url: 'https://trivalleyclinic.com',
  phone: '(510) 598-4921',
  address: 'Fremont, CA',
  image: 'https://trivalleyclinic.com/assets/tri-valley-logo-header.png',
};

export default function SEO({
  title,
  description,
  path = '/',
  type = 'website',
  noindex = false,
  schema = null,
}) {
  const url = `${SITE.url}${path}`;
  const fullTitle = path === '/' ? title : `${title} | ${SITE.name}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Unlisted pages (e.g. /patient-information) must not be indexed */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={SITE.image} />
      <meta property="og:site_name" content={SITE.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SITE.image} />

      {/* Geo */}
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="Fremont" />

      {/* Structured data.
          AI assistants and search engines read JSON-LD to understand what a
          practice is and where it operates. This block is factual only:
          name, address, phone, hours, service area. No aggregateRating —
          Google disallows marking up reviews collected on third-party
          sites as your own, and a manual action would be worse than the
          gain. Pass a page-specific object via the `schema` prop to add
          service detail on top of this. */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MedicalClinic',
          name: SITE.name,
          url: SITE.url,
          telephone: SITE.phone,
          image: SITE.image,
          address: {
            '@type': 'PostalAddress',
            streetAddress: '680 Mowry Ave',
            addressLocality: 'Fremont',
            addressRegion: 'CA',
            postalCode: '94536',
            addressCountry: 'US',
          },
          openingHoursSpecification: [{
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:30',
            closes: '17:30',
          }],
          areaServed: [
            { '@type': 'City',  name: 'Fremont' },
            { '@type': 'State', name: 'California' },
          ],
        })}
      </script>

      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
