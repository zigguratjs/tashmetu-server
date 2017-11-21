import {inject, factory} from '@ziggurat/tiamat';
import * as http from 'http';
import * as SocketIO from 'socket.io';

export class SocketIOServerFactory {
  @inject('http.Server') private server: http.Server;

  @factory({key: 'socket.io.Server'})
  public socketIOServer(): SocketIO.Server {
    return SocketIO(this.server);
  }
}