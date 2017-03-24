/**
 * Serviço de habilitação do socket da aplicaçaõ
 * @namespace app.core
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .service('socketService', socketService);

  socketService.$inject = [];

  /** @ngInject */
  function socketService() {
    var _connection_id = null;
    var _socket = null;
    var _app = null;
    var _url = null;
    var _connected = false;

    return {
      socket:          getSocket,
      getConnectionId: getConnectionId,
      connect:         connect
    };

    /**
     * @desc Faz conexão com socket
     * @return {socket}
     */
    function connect(url, app, _client_id, _user_id) {
      if (!_connected) {
        _url = url;
        _app = app;
        _connected = true
      }

      _socket = io.connect(_url);

      _socket.on('connect', function () {
        _socket.emit('getConnectionId', {
          app:       _app,
          client_id: _client_id,
          user_id:   _user_id,
          logout:    false
        });
        console.log("Conectado no servidor  via socket");
      });

      _socket.on('receiveConnectionId', function (result) {
        _connection_id = result.id;
      })


    }

    /**
     * @desc: retorna ID da conexão do socket
     */
    function getConnectionId() {
      return _connection_id;
    }

    /**
     * @desc: obtem sockt criado
     */
    function getSocket() {
      return _socket;
    }


  }
})();


