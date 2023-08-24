import { Request, Response, NextFunction } from "express";
import { CrudService } from "../services/crud-service";
import { errors } from "../models/exception";
import { ExtendedRequest, FilterParams } from "../models/filter-params";

/**
 * Provides request handlers for basic requests like get list, get by id, create, update by id, delete by id.
 */
export abstract class CrudController<S extends CrudService<T>, T> {
  /**
   * Protected constructor, not meant to be instantiated directly.
   * @param service - this  service will handle CRUD operations
   */
  protected constructor(protected service: S) {}

  public getAll = async (
    req: ExtendedRequest<FilterParams>,
    res: Response<{ total: number; data: T[] }>,
    next: NextFunction
  ) => {
    try {
      const filters = req?.filter as FilterParams;
      const resources = await this.service.getAll(filters);
      if (!resources) return next(errors.notFound(typeof resources));
      return res.status(200).json(resources);
    } catch (e) {
      return next(e);
    }
  };

  public getById = async (
    req: Request<{ id: string }, {}, {}>, // not allowed to write IdDto as params type, but we can validate in router
    res: Response<T>,
    next: NextFunction
  ) => {
    try {
      const resource = await this.service.getById(req.params.id);
      if (!resource) return next(errors.notFound(typeof resource));

      return res.status(200).json(resource);
    } catch (e) {
      return next(e);
    }
  };

  public remove = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response<T>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const data = await this.service.remove(id);
      if (!data) return next(errors.notFound(typeof data));
      return res.status(204).json(data);
    } catch (e) {
      return next(e);
    }
  };

  public update = async (
    req: Request<{ id: string }, {}, Partial<T>>,
    res: Response<T>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;

      const data = await this.service.update(id, req.body);
      if (!data) return next(errors.notFound(typeof data));
      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  };

  public create = async (
    req: Request<{}, {}, T>,
    res: Response<T>,
    next: NextFunction
  ) => {
    try {
      const data = await this.service.create(req.body);
      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  };
}
