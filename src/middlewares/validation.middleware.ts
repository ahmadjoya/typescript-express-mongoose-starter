import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpException } from '@exceptions/HttpException';

/** Flattens nested class-validator errors into a single readable message. */
const flattenErrors = (errors: ValidationError[]): string[] =>
  errors.flatMap(error => [...Object.values(error.constraints ?? {}), ...flattenErrors(error.children ?? [])]);

const validationMiddleware = (
  type: any,
  value: 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToInstance(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          next(new HttpException(400, flattenErrors(errors).join(', ')));
        } else {
          next();
        }
      })
      .catch(next);
  };
};

export default validationMiddleware;
