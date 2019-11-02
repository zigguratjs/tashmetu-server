import {Resolver} from '@ziggurat/tiamat';
import {Router} from './factories/router';
import {RequestHandler} from 'express';

/**
 * Server middleware.
 *
 * If it is a string the middleware will be obtained from the container.
 */
export type Middleware =
  RequestHandler | Router | Resolver<RequestHandler | Router>;

export type MiddlewareConfig = {
  [path: string]: Middleware | Middleware[];
};

export interface ServerConfig {
  middleware: MiddlewareConfig;
}
