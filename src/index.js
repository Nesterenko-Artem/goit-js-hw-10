import './css/styles.css';
import { markupOneCountry, markupSomeCountries } from './utils';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
Notiflix.Notify.init({
  timeout: 3000,
  position: 'left-top',
  clickToClose: true,
});
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

function render(data) {
  // if the backend returned more than 10 countries
  if (numberOfCountries > 10) {
    Notiflix.Notify.info(
      `Too many matches found. Please enter a more specific name.`
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
  Notiflix.Notify.failure(`Oops, there is no country with that name`)
}

function clearSearch() {
  refs.list.innerHTML = '';
  refs.output.innerHTML = ''
}
