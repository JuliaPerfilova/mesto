export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._authorization = options.authorization;
  }

  _makeRequest({ url, method, contentType, body }) {
    const requestInfo =  {
      headers: {
        authorization: this._authorization
      }
    };

    if(method !== undefined) {
      requestInfo.method = method;
    }
    if (contentType !== undefined) {
      requestInfo.headers['Content-Type'] = contentType;
    }
    if (body !== undefined) {
      requestInfo.body = body;
    }

    return fetch(url, requestInfo)
    .then(res => {
      if (res.ok) {
        return Promise.resolve(res);
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  likeCard(id) {
    return this._makeRequest({
      url: `${this._url}/cards/${id}/likes`, 
      method: 'PUT'
    })
    .then(res => res.json());
  }

  dislikeCard(id) {
    return this._makeRequest({
      url: `${this._url}/cards/${id}/likes`, 
      method: 'DELETE'
    })
    .then(res => res.json());
  }

  getInitialCards() {
    return this._makeRequest({
      url: `${this._url}/cards`
    })
    .then(res => res.json());
  }

  getMyProfile() {
    return this._makeRequest({
      url: `${this._url}/users/me`
    })
    .then(res => res.json());
  }

  updateProfile(userInfo) {
    return this._makeRequest({
      url: `${this._url}/users/me`,
      method: 'PATCH',
      contentType: 'application/json',
      body: JSON.stringify(userInfo)
    })
    .then(res => res.json());
  }

  
  updateAvatar(avatarLink) {
    return this._makeRequest({
      url: `${this._url}/users/me/avatar`,
      method: 'PATCH',
      contentType: 'application/json',
      body: JSON.stringify({ avatar: avatarLink })
    })
    .then(res => res.json());
  }

  createCard(data)  {
    return this._makeRequest({
      url: `${this._url}/cards`,
      method: 'POST',
      contentType: 'application/json',
      body: JSON.stringify(data)
    })
    .then(res => res.json());
  }

  removeCard(id) {
    return this._makeRequest({
      url: `${this._url}/cards/${id}`, 
      method: 'DELETE'
    });
  }
}