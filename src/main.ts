import './style.css';
import { MovieService } from './services/movieService';
import noImageUrl from './img/no-image.jpg';

// Html elements

const loginButton: HTMLButtonElement = document.getElementById(
  'login-button'
) as HTMLButtonElement;
const searchButton = document.getElementById(
  'search-button'
) as HTMLButtonElement;

const loginInput: HTMLInputElement = document.getElementById(
  'login'
) as HTMLInputElement;
const senhaInput = document.getElementById('senha') as HTMLInputElement;
const apiKeyInput = document.getElementById('api-key') as HTMLInputElement;
const searchInput = document.getElementById('search') as HTMLInputElement;

// State

let apiKey = '';
let username: string = '';
let password: string = '';
let requestToken = '';
let sessionId = '';
let searchText = '';

//Event listeners

loginButton.addEventListener('click', async () => {
  console.log('isLoggedIn()', isLoggedIn());

  if (isLoggedIn()) {
    logout();
  } else {
    login();
  }
});

loginInput.addEventListener('change', (event: Event) => {
  const target = event.target as HTMLInputElement;
  username = target.value.trim();
  validateLoginButton();
});

senhaInput.addEventListener('change', (event: Event) => {
  const target = event.target as HTMLInputElement;
  password = target.value.trim();
  validateLoginButton();
});

apiKeyInput.addEventListener('change', (event: Event) => {
  const target = event.target as HTMLInputElement;
  apiKey = target.value.trim();
  validateLoginButton();
});

searchInput.addEventListener('change', (event: Event) => {
  const target = event.target as HTMLInputElement;
  sessionId && target.value
    ? (searchButton.disabled = false)
    : (searchButton.disabled = true);

  searchButton.disabled = false;
  searchText = target.value;
});

searchButton.addEventListener('click', async () => {
  if (!searchText) return;

  const movieService = new MovieService('8de31ba0f478667e88e7bfcb507aec4e');
  const encodedSearchText = encodeURI(searchText);
  console.log('searchText', searchText);
  console.log('encodedSearchText', encodedSearchText);

  const movies = await movieService.procurarFilme(encodedSearchText);
  console.log(movies);

  console.log('noImageUrl', noImageUrl);

  let moviesListHtml = `<p class="text-gray-700 text-base text-center">${movies.length} movies found for ${searchText}</p>`;

  movies.forEach((movie) => {
    moviesListHtml += `
    <article class="w-full lg:max-w-full lg:flex">
    <!-- image -->
    <div
      class="h-48 bg-cover lg:h-auto lg:w-48 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
      style="
        background-image: url('${
          movie.backdropPath
            ? 'https://image.tmdb.org/t/p/w500' + movie.backdropPath
            : noImageUrl
        }');
      "
    ></div>
    <!-- card bounds -->
    <div
      class="w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
    >
      <!-- content -->
      <div class="mb-8">
        <div class="text-gray-900 font-bold text-xl mb-2">
          ${movie.title}
        </div>
        <p class="text-gray-700 text-base">
          ${movie.overview}
        </p>
      </div>
      <div class="flex items-center">
        <div class="text-sm">
          <p class="text-gray-900 leading-none">Release date</p>
          <p class="text-gray-600">${movie.releaseDate.toLocaleDateString(
            'pt-BR'
          )}</p>
        </div>
      </div>
    </div>
  </article>
    `;
  });

  const movieListContainer = document.getElementById(
    'movie-list'
  ) as HTMLDivElement;
  movieListContainer.innerHTML = moviesListHtml;

  searchInput.value = '';
  searchButton.disabled = true;
  searchText = '';
});

// functions

function validateLoginButton(): void {
  if (password && username && apiKey) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

function isLoggedIn(): boolean {
  return requestToken && sessionId ? true : false;
}

async function login() {
  const movieService = new MovieService(apiKey);
  requestToken = await movieService.criarRequestToken();
  await movieService.logar(username, password, requestToken);
  sessionId = await movieService.criarSessao(requestToken);

  loginButton.innerText = 'Logout';
  loginInput.disabled = true;
  senhaInput.disabled = true;
  apiKeyInput.disabled = true;

  console.log('requestToken', requestToken);

  console.log('sessionId', sessionId);
}

function logout(): void {
  apiKey = '';
  username = '';
  password = '';
  sessionId = '';
  requestToken = '';
  loginButton.innerText = 'Login';
  clearInputs();
  validateLoginButton();
}

function clearInputs() {
  loginInput.value = '';
  loginInput.disabled = false;

  senhaInput.value = '';
  senhaInput.disabled = false;

  apiKeyInput.value = '';
  apiKeyInput.disabled = false;

  searchInput.value = '';
}
