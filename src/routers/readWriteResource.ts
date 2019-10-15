import * as express from 'express';
import * as bodyParser from 'body-parser';
import {serializeError} from 'serialize-error';
import {post, use} from '../decorators';
import {ReadOnlyResource} from './readOnlyResource';

export class ReadWriteResource extends ReadOnlyResource {
  @post('/')
  @use(() => bodyParser.json())
  public async postOne(req: express.Request, res: express.Response) {
    try {
      let result = await this.collection.upsert(req.body);
      res.statusCode = 200;
      return result;
    } catch (err) {
      res.statusCode = 500;
      return serializeError(err);
    }
  }
}
