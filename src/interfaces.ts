import {Factory} from '@ziqquratu/ziqquratu';
import {RequestHandler} from 'express';
import {AddressInfo} from 'net';

export abstract class RequestHandlerFactory extends Factory<RequestHandler> {
  public abstract create(path: string): RequestHandler;
}

/**
 * Server middleware.
 */
export type Middleware =
  RequestHandler | RequestHandlerFactory | (RequestHandler | RequestHandlerFactory)[];

export type RouteMap = {[path: string]: Middleware};

export type RouteMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface Route {
  path?: string;
  method?: RouteMethod;
  handlers: Middleware;
}

export interface ServerConfig {
  middleware: RouteMap;
}

export interface Server {
  /**
   * Starts the server and listens for connections.
   *
   * @param port Port to listen on.
   */
  listen(port: number): any;

  address(): string | AddressInfo | null;
}
