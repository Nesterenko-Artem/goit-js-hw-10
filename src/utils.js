export function markupOneCountry({
  name: { official },
  capital,
  population,
  flags: { svg },
  languages,
}) {
  const langList = Object.values(languages);
  const markup = `  <div class='country-info__name-thumb'><img src="${svg}"  alt="flag" width="70" height="50" class="country-info__img" /><span
    class="country-info__name">${official}</span>
  </div>
<ul class="country-info__list">
  <li class="country-info__item">
    <p class="country-info__text">Capital: <span class="country-info__text-description">${capital}</span></p>
  </li>
  <li class="country-info__item">
    <p class="country-info__text">Population: <span class="country-info__text-description">${population}</span></p>
  </li>
  <li class="country-info__item">
    <p class="country-info__text">Languages: <span class="country-info__text-description">${langList.join(
      ','
    )}</span></p>
  </li>
</ul>`;
  return markup;
}

export function markupSomeCountries({ name: { official }, flags: { svg } }) {
  const markup = `<li class="country-item">
  <img
   src="${svg}"
   alt="flag"
   width="50"
   height="30"
   class="country-item__img"
  /><span class="country-item__name">${official}</span>
 </li>
`;
  return markup;
}
