export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector); //Sprint 12 - Agregado avatar
  }

  // Retorna un objeto con los datos del usuario
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src, //Sprint 12 - Agregado avatar
      _id: this._id, //Sprint 12 - Agregado ID
    };
  }

  // Actualiza los datos del usuario - Recibe los datos del servidor y actualiza el DOM -
  setUserInfo({ name, about, avatar, link, _id }) {
    if (name) {
      this._nameElement.textContent = name;
    }

    if (about) {
      this._aboutElement.textContent = about;
    }

    // Lógica defensiva: Primero buscamos 'avatar', si no, intentamos con 'link'
    if (avatar) {
      this._avatarElement.src = avatar; //Sprint 12 - Agregado avatar
    } else if (link) {
      this._avatarElement.src = link; //Sprint 12 - Agregado avatar
    }

    if (_id) {
      this._id = _id; //Sprint 12 - Agregado ID
    }
  }

  // Método extra para obtener mi ID solamente - Sprint 12
  getUserId() {
    return this._id;
  }
}
