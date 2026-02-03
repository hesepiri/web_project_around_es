export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Metodo para crear el request, y optimizar la llamada a fetch para todos los metodos que necesiten hacer un request a la API
  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(
      this._checkResponse,
    );
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
    return this._request("/users/me", {
      headers: this._headers,
    });
  }

  // Obtener tarjetas iniciales
  getInitialCards() {
    return this._request("/cards", {
      headers: this._headers,
    });
  }

  // Editar perfil de usuario - PATCH /users/me
  editProfile({ name, about }) {
    return this._request("/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  // Añadir nueva tarjeta - POST /cards
  addCard({ name, link }) {
    return this._request("/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  // Eliminar tarjeta - DELETE /cards/cardId
  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  // Metodo para actualizar el avatar (Sprint 12)
  updateAvatar(avatarLink) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    });
  }

  // Metdodo para dar like a una tarjeta
  addLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  // Metodo para remover like a una tarjeta
  removeLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}
