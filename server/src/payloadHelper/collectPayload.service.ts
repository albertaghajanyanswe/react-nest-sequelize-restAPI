import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';

@Injectable()
export class CollectPayloadService {
  safeJsonParser = (params) => {
    try {
      const { limit, skip: offset, sort, filter, search } = JSON.parse(JSON.stringify(params));
      return { limit, offset, sort, filter, search };
    } catch (err) {
      return { limit: null, offset: null, sort: null, filter: null, search: null };
    }
  };

  getListPayload(req) {
    // console.log('req = ', req)
    const params = JSON.parse(decodeURIComponent(req.query.params));
    const res: Record<string, any> = { distinct: true };
    res.where = {};

    if (params) {
      const { limit, offset, sort, filter, search } = this.safeJsonParser(params);
      if (limit) {
        res.limit = parseInt(limit);
      }
      if (offset) {
        res.offset = parseInt(offset);
      }
      if (sort && sort.field) {
        res.order = [[sort.field, sort.order]];
      }
      if (filter) {
        for (const i in filter) {
          if (i.indexOf('_eq') !== -1) {
            const filterName = i.split('_eq')[0];
            res.where[filterName] = { [Op.eq]: filter[i] };
          } else {
            res.where[i] = { [Op.startsWith]: filter[i] };
          }

          // res.where[i] = { [Op.startsWith]: filter[i] };
        }
      }
      if (search) {
        for (const i in search.fields) {
          const obj = {};
          res.where[Op.or] = [];
          obj[search.fields[i]] = { [Op.like]: `%${search.value}%` };
          res.where[Op.or].push(obj);
        }
      }
    }
    console.log('res = ', res)
    return res;
  }
}
