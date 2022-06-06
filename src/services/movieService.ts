import { HttpClient } from '../helper/httpClient';
import { transformFromJSON, Movie } from '../model/movie';

export class MovieService {
  constructor(private apiKey: string) {
    this.apiKey = apiKey;
  }

  async procurarFilme(query: string): Promise<Movie[]> {
    query = encodeURI(query);

    let response = (await HttpClient.get({
      url: `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${query}`,
      method: 'GET',
    })) as any;

    const movies: Movie[] = response.results.map((data: any) =>
      transformFromJSON(data)
    );

    return movies;
  }

  async adicionarFilme(filmeId: string) {
    let result = await HttpClient.get({
      url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${this.apiKey}&language=en-US`,
      method: 'GET',
    });
    console.log(result);
  }

  async criarRequestToken(): Promise<string> {
    let result: any = await HttpClient.get({
      url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${this.apiKey}`,
      method: 'GET',
    });
    return result.request_token;
  }

  async logar(userName: string, password: string, requestToken: string) {
    await HttpClient.get({
      url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${this.apiKey}`,
      method: 'POST',
      body: {
        username: `${userName}`,
        password: `${password}`,
        request_token: `${requestToken}`,
      },
    }).then((response) => {
      console.log('logar', response);
    });
  }

  async criarSessao(requestToken: string) {
    let result: any = await HttpClient.get({
      url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${this.apiKey}&request_token=${requestToken}`,
      method: 'GET',
    });
    return result.session_id;
  }

  async criarLista(nomeDaLista: string, descricao: string, sessionId: string) {
    let result = await HttpClient.get({
      url: `https://api.themoviedb.org/3/list?api_key=${this.apiKey}&session_id=${sessionId}`,
      method: 'POST',
      body: {
        name: nomeDaLista,
        description: descricao,
        language: 'pt-br',
      },
    });
    console.log(result);
  }

  async adicionarFilmeNaLista(
    filmeId: string,
    listaId: string,
    sessionId: string
  ) {
    let result = await HttpClient.get({
      url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${this.apiKey}&session_id=${sessionId}`,
      method: 'POST',
      body: {
        media_id: filmeId,
      },
    });
    console.log(result);
  }

  async pegarLista(listId: string) {
    let result = await HttpClient.get({
      url: `https://api.themoviedb.org/3/list/${listId}?api_key=${this.apiKey}`,
      method: 'GET',
    });
    console.log(result);
  }
}
