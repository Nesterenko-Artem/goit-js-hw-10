import './css/styles.css';
import { markupOneCountry, markupSomeCountries } from './utils';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
Notiflix.Notify.init({timeout: 5000,});
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
let numberOfCountries;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  output: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(fetchOn, DEBOUNCE_DELAY));

function fetchOn(e) {
  e.preventDefault();
  clearSearch();
  const nameSearchCountry = refs.input.value.trim();

  if (nameSearchCountry) {
    fetchCountries(nameSearchCountry)
      .then(data => {
        numberOfCountries = data.length;
        render(data);
        console.log(data)
      })
      .catch(onFetchError);
  }
}

//  function murckupForCountry({
//    name: { official },
//    capital,
//    population,
//    flags: { svg },
//    languages,
//  }) {
//    const langList = Object.values(languages);
//    return `  <div class='country-info__name-thumb'><img src="${svg}" alt="flag" width="30" height="30" class="country-info__img" /><span
//   class="country-info__name"
// >${official}</span></div>
// <ul class="country-info__list">
//   <li class="country-info__item">
//     <p class="country-info__text">Capital: <span class="country-info__text-description">${capital}</span></p>
//   </li>
//   <li class="country-info__item">
//     <p class="country-info__text">Population: <span class="country-info__text-description">${population}</span></p>
//   </li>
//   <li class="country-info__item">
//     <p class="country-info__text">Languages: <span class="country-info__text-description">${langList}</span></p>
//   </li>
// </ul>`;
//  };

function render(data) {
  // if the backend returned more than 10 countries
  if (numberOfCountries > 10) {
    Notiflix.Notify.info(
      `-${numberOfCountries}-Too many matches found. Please enter a more specific name.`,
      { position: 'center-top' }
    );
  }
  // if the backend returned from 2 to 10 countries
  else if (numberOfCountries > 1 && numberOfCountries < 10) {
    refs.list.insertAdjacentHTML(
      'beforeend',
      data.map(country => markupSomeCountries(country)).join('')
    );
  }
  // if the backend returned 1 country
  else if (numberOfCountries === 1) {
     refs.output.insertAdjacentHTML('beforeend', markupOneCountry(...data));
  }
}

function onFetchError(error) {
  Notiflix.Notify.failure(
    `Oops,-${numberOfCountries}- there is no country with that name`,
    {
      position: 'center-top',
    }
  );
}

function clearSearch() {
  refs.list.innerHTML = '';
  refs.output.innerHTML = ''
}
