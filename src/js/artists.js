// export function createArtistCard(artist) {
//   if (
//     !artist ||
//     !artist.strArtistThumb ||
//     !artist.strArtist ||
//     !artist.genres ||
//     !artist.strBiographyEN
//   ) {
//     return '';
//   }

//   const shortBio =
//     artist.strBiographyEN.length > 200
//       ? artist.strBiographyEN.slice(0, 200) + '...'
//       : artist.strBiographyEN;

//   return `
//     <li class="artist-card">
//       <img src="${artist.strArtistThumb}" alt="${
//     artist.strArtist
//   }" class="artist-image" data-id="${artist._id}" />
//       <h3 class="artist-name">${artist.strArtist}</h3>
//       <p class="artist-genre">${artist.genres.join(', ')}</p>
//       <p class="artist-bio" data-full="${artist.strBiographyEN}">${shortBio}</p>
//       <button class="learn-more">Learn More</button>
//     </li>
//   `;
// }
