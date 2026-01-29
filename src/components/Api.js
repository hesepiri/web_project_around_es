export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Método privado para revisar si la respuesta es 200 OK
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // Obtener información del usuario
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Obtener tarjetas iniciales
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Editar perfil de usuario - PATCH /users/me
  editProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }
  /*
  editProfile({ name, about }) {
    console.log("🟢 DENTRO DE API.JS - editProfile invocado");
    console.log("   Datos recibidos:", name, about);

    // Guardamos la promesa en una variable para verla antes de devolverla
    const promesa = fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);

    console.log("   Promesa generada:", promesa); // ¿Dice 'Promise' o 'undefined'?

    return promesa;
  }
    */
  /*
  editProfile({ name, about }) {
    // 1. Guardamos la promesa en una constante explicita
    const request = fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);

    // 2. Imprimimos para confirmar que NO es undefined
    console.log("📡 Solicitud PATCH creada:", request);

    // 3. Devolvemos la constante
    return request;
  }
  */

  // Añadir nueva tarjeta - POST /cards
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }
}
