// const fs = require('fs');

// // const prettier = require("prettier");

// function formatDate({ isIsoString, date }) {
//   if (isIsoString) {
//     return date.toISOString();
//   }
//   const year = date.getFullYear();
//   let month = date.getMonth() + 1;
//   let day = date.getDate();

//   month = month < 10 ? `0${month}` : month;
//   day = day < 10 ? `0${day}` : day;

//   return `${year}-${month}-${day}`;
// }

// const baseURL = 'https://www.negocio.co.kr/m';
// const priorityValue = '1.0';
// const lastmodValue = formatDate({ isIsoString: false, date: new Date() });
// // const lastmodIsoValue = formatDate({ isIsoString: true, date: new Date() });

// const fetch = async () => {
//   const response = await fetch('https://api-test.negocio.kr/danji/ids');

//   response.then((res) => {
//     console.log(res);
//   });
// };

// const sitemapBaseList = [
//   { locValue: baseURL, lastmodValue, priorityValue },
//   { locValue: `${baseURL}/map`, lastmodValue, priorityValue },
//   { locValue: `${baseURL}/intro`, lastmodValue, priorityValue },
//   { locValue: `${baseURL}/recommendation`, lastmodValue, priorityValue },
//   { locValue: `${baseURL}/chatRoomList`, lastmodValue, priorityValue },
//   { locValue: `${baseURL}/login`, lastmodValue, priorityValue },
//   { locValue: `${baseURL}/my`, lastmodValue, priorityValue },
// ];

// function generateSitemaps() {
//   const content = `<?xml version="1.0" encoding="UTF-8"?>
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">/326
//     ${sitemapBaseList
//       .map(
//         (item) => `<url>
//         <loc>${item.locValue}</loc>
//         <lastmod>${item.lastmodValue}</lastmod>
//         <priority>${item.priorityValue}</priority>
//       </url>`,
//       )
//       .join('\n')}
//     </urlset>
//   `;

//   fetch();

//   // fs.writeFileSync('../public/generate_sitemap_test.xml', content);
//   // fs.writeFileSync('../public/generate_sitemap_base_test.xml', content);
//   // fs.writeFileSync('../public/dynamic-sitemap-test.xml', content);
// }

// generateSitemaps();
