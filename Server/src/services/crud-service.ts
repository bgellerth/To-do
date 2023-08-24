import mongoose, { ObjectId, PipelineStage } from "mongoose";
import { FilterParams } from "../models/filter-params";

export interface PaginatedData<T> {
  total: number;
  data: T[];
}
/**
 * Provides simple handlers for CRUD operations.
 */
export abstract class CrudService<T> {
  /**
   * Protected constructor, not meant to be instantiated directly.
   *
   * @param model - this generic model will handle CRUD operations
   */
  protected constructor(protected model: mongoose.Model<T>) {}

  public async getAll(query: FilterParams): Promise<PaginatedData<T>> {
    const [data] = await this.model
      .aggregate(this.buildPaginationStages(query))
      .allowDiskUse(true);
    return data;
  }

  public async getById(id: string | ObjectId): Promise<T | null> {
    return this.model.findById(id);
  }

  public async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  public async update(
    id: string | ObjectId,
    updates: Partial<T>
  ): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, { ...updates }, { new: true });
  }

  public async remove(id: string | ObjectId) {
    return this.model.findByIdAndRemove(id);
  }

  /**
   * This method is meant to be overridden in child services to provide the appropriate aggregation stages in get
   * requests like get list or get by id.
   *
   * This implementation should handle basic aggregation stages like $sort, $skip, $limit.
   *
   * Some implementation may want to include particular fields with $lookup, or exclude others. Use the options
   * parameter to specify such preferences, check their presence and push the stages.
   *
   * @param query - a filter to be applied
   * @param options
   */

  public buildPaginationStages(query: FilterParams) {
    const { pageOffset, pageLength, sort } = query;

    let $sort: Record<string, 1 | -1> = { _id: -1 };
    if (sort) {
      $sort = {};
      $sort[sort.field] = sort.direction;
    }

    return [
      { $sort },
      {
        $facet: {
          data: [{ $skip: pageOffset * pageLength }, { $limit: pageLength }],
          total: [{ $count: "count" }],
        },
      },
      {
        $project: {
          data: "$data",
          total: { $first: "$total.count" },
        },
      },
    ];
  }
}
