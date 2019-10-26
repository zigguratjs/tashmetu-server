import {classDecorator, propertyDecorator, Producer} from '@ziggurat/tiamat';
import * as express from 'express';
import {MiddlewareConfig} from './interfaces';
import {RouterMethodAnnotation, UseAnnotation} from './method';
import {MiddlewareAnnotation} from './middleware';

/**
 * Router-level middleware.
 *
 * This decorator can be used to attach middleware to a router or server by decorating
 * the factory.
 *
 * @usageNotes
 *
 * The decorator accepts a map of middleware given as a producer and a path where it should be
 * mounted. The producer is a function with the container as its only argument that should return
 * an express.RequestHandler.
 *
 * The following example shows how to mount a middleware for serving static files.
 *
 * ```typescript
 * @middleware({
 *   '/static': () => express.static('public')
 * })
 * ```
 */
export const middleware = <(config: MiddlewareConfig) => any>
  classDecorator(MiddlewareAnnotation, []);

const method = <(name: string, path: string) => any>
  propertyDecorator(RouterMethodAnnotation);

/** HTTP GET request handler. */
export const get = (path: string) => method('get', path);

/** HTTP POST request handler. */
export const post = (path: string) => method('post', path);

/** HTTP PUT request handler. */
export const put = (path: string) => method('put', path);

/** HTTP PATCH request handler. */
export const patch = (path: string) => method('patch', path);

/** HTTP DELETE request handler. */
export const del = (path: string) => method('delete', path);

/**
 * Method-level middleware
 *
 * Adds a middleware request handler through a producer to a router method.
 */
export const use = <(producer: Producer<express.RequestHandler>) => any>
  propertyDecorator(UseAnnotation);
