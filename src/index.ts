import {component, Provider} from '@ziqquratu/ziqquratu';
import * as http from 'http';
import * as SocketIO from 'socket.io';
import * as express from 'express';
import {TashmetuServer} from './server';
import {SocketGateway} from './gateway';
import {ResourceFactory} from './routers/resource';
import {RouterFactory, ProviderControllerFactory} from './controller';

export * from './controller';
export * from './decorators';
export * from './interfaces';
export * from './routers/resource';

@component({
  providers: [
    SocketGateway,
    TashmetuServer,
    Provider.ofInstance('express.Application', express()),
    Provider.ofFactory({
      key: 'http.Server',
      inject: ['express.Application'],
      create: (app: express.Application) => http.createServer(app),
    }),
    Provider.ofFactory({
      key: 'socket.io.Server',
      inject: ['http.Server'],
      create: (server: http.Server) => SocketIO(server),
    })
  ],
  factories: [ResourceFactory, RouterFactory, ProviderControllerFactory],
})
export default class Tashmetu {}
