/* eslint-disable no-plusplus */
const fs = require('fs');

const APIURL = `${process.env.NEGOCIO_REST_API_BASE_URL}/danji/ids`;
const baseURL = `${process.env.NEGOCIO_BASE_URL}`;

const mobileBaseURL = `${baseURL}/m`;
const webBaseURL = baseURL;
const xmlnsURL = 'http://www.sitemaps.org/schemas/sitemap/0.9';

const headerXmlVersion = '<?xml version="1.0" encoding="UTF-8"?>';
const headerUrlSet = `<urlset xmlns="${xmlnsURL}">`;
const headerSitemapIndex = `<sitemapindex xmlns="${xmlnsURL}">`;

const Routes = {
  MAP: 'map',
  INTRO: 'intro',
  SUGGESTGUIDE: 'suggestGuide',
  LAWQNA: 'lawQna',
  CHATROOMLIST: 'chatRoomList',
  LOGIN: 'login',
  MY: 'my',
  DANJIDETAIL: 'danjiDetail',
  DANJIDETAILSEO: 'danji',
};

const SitemapURLToBeCreated = {
  ORIGIN: 'sitemap',
  BASE: 'sitemap_base',
  DANJI: 'sitemap_danji',
};

const priorityValue = '1.0';

const itemsPerPage = 10000;

function formatDate({ isIsoString, date }) {
  if (isIsoString) {
    return date.toISOString();
  }
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
}

const lastmodValue = formatDate({ isIsoString: false, date: new Date() });

const sitemapBaseXMLList = [
  { locValue: mobileBaseURL, lastmodValue, priorityValue },
  { locValue: `${mobileBaseURL}/${Routes.MAP}`, lastmodValue, priorityValue },
  { locValue: `${mobileBaseURL}/${Routes.INTRO}`, lastmodValue, priorityValue },
  { locValue: `${mobileBaseURL}/${Routes.SUGGESTGUIDE}`, lastmodValue, priorityValue },
  { locValue: `${mobileBaseURL}/${Routes.LAWQNA}`, lastmodValue, priorityValue },
  { locValue: `${mobileBaseURL}/${Routes.CHATROOMLIST}`, lastmodValue, priorityValue },
  { locValue: `${mobileBaseURL}/${Routes.MY}`, lastmodValue, priorityValue },
];

const sitemapXMLList = [{ locValue: `${webBaseURL}/${SitemapURLToBeCreated.BASE}.xml`, lastmodValue }];

const makeStaticSitemap = () => {
  const content = `${headerXmlVersion}
${headerUrlSet}
${sitemapBaseXMLList
  .map(
    (item) => `  <url>
    <loc>${item.locValue}</loc>
    <lastmod>${item.lastmodValue}</lastmod>
    <priority>${item.priorityValue}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  fs.writeFileSync(`../public/${SitemapURLToBeCreated.BASE}.xml`, content);
};

const makeDynamicNewDanjiSitemaps = async () => {
  await fetch(APIURL, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const list = data.list;
      const totalPages = Math.ceil(list.length / itemsPerPage);

      for (let i = 1; i <= totalPages; i++) {
        const startIndex = (i - 1) * itemsPerPage;
        const endIndex = Math.min(i * itemsPerPage, list.length);

        sitemapXMLList.push({ locValue: `${webBaseURL}/${SitemapURLToBeCreated.DANJI}_${i}.xml`, lastmodValue });

        let mapHTML = `${headerXmlVersion}${headerUrlSet}`;

        const mapHTMLContent = list
          .slice(startIndex, endIndex)
          .map(
            (value) =>
              `<url><loc>${mobileBaseURL}/${Routes.DANJIDETAILSEO}/${value}</loc><lastmod>${lastmodValue}</lastmod></url>`,
          )
          .join('');

        mapHTML += mapHTMLContent;
        mapHTML += `</urlset>`;

        fs.writeFileSync(`../public/${SitemapURLToBeCreated.DANJI}_${i}.xml`, mapHTML);
      }

      const content = `${headerSitemapIndex}
${sitemapXMLList
  .map(
    (item) => `  <sitemap>
    <loc>${item.locValue}</loc>
    <lastmod>${item.lastmodValue}</lastmod>
  </sitemap>`,
  )
  .join('\n')}
</sitemapindex>`;

      fs.writeFileSync(`../public/${SitemapURLToBeCreated.ORIGIN}.xml`, content);
    })
    .catch((error) => {
      console.log(error);
    });
};

function generateSitemaps() {
  makeStaticSitemap();
  makeDynamicNewDanjiSitemaps();
}

generateSitemaps();

// const makeDynamicSitemaps = async () => {
//   await fetch(APIURL, {
//     method: 'POST',
//     cache: 'no-cache',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       const list = data.list;
//       const totalPages = Math.ceil(list.length / itemsPerPage);

//       for (let i = 1; i <= totalPages; i++) {
//         const startIndex = (i - 1) * itemsPerPage;
//         const endIndex = Math.min(i * itemsPerPage, list.length);

//         sitemapXMLList.push({ locValue: `${webBaseURL}/${SitemapURLToBeCreated.DANJI}_${i}.xml`, lastmodValue });

//         let mapHTML = `${headerXmlVersion}${headerUrlSet}`;

//         const mapHTMLContent = list
//           .slice(startIndex, endIndex)
//           .map(
//             (value) =>
//               `<url><loc>${mobileBaseURL}/${Routes.DANJIDETAIL}?danjiID=${value}</loc><lastmod>${lastmodValue}</lastmod></url>`,
//           )
//           .join('');

//         mapHTML += mapHTMLContent;
//         mapHTML += `</urlset>`;

//         fs.writeFileSync(`../public/${SitemapURLToBeCreated.DANJI}_${i}.xml`, mapHTML);
//       }

//       const content = `${headerSitemapIndex}
// ${sitemapXMLList
//   .map(
//     (item) => `  <sitemap>
//     <loc>${item.locValue}</loc>
//     <lastmod>${item.lastmodValue}</lastmod>
//   </sitemap>`,
//   )
//   .join('\n')}
// </sitemapindex>`;

//       fs.writeFileSync(`../public/${SitemapURLToBeCreated.ORIGIN}.xml`, content);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// makeDynamicSitemaps();
