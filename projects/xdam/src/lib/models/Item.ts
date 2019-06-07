// TODO @atovar remove RouterMapper dependencies
import { isNil, hasIn } from 'ramda';
import { ItemModel } from './interfaces/ItemModel.interface';
import RouterMapper from '../../../../../src/app/mappers/RouterMapper';

/**
 * The item model used by the table component to show info about every single resource.
 */
export class Item {
    /**
     * The id of the resource
     */
    protected _id: string | number;
    /**
     * The title of the resource
     */
    protected _title: string;
    /**
     * The hash of the resource
     */
    protected _hash: string | number;
    /**
     * The file size of the resource
     */
    protected _size: string | null;
    /**
     * The type of the resource
     */
    protected _type: string;
    /**
     * The image src of the resource
     */
    protected _image: string;

    protected _context: string;

    /**@ignore */
    constructor(item: any = null, schema: ItemModel | null = null) {
        if (isNil(schema)) {
            schema = new RouterMapper().itemModel;
        }
        if (!isNil(item)) {
            for (let method of Object.keys(schema)) {
                if (hasIn(method, this)) {
                    this[method] = item[schema[method]];
                }
            }
        }
    }

    set id(id: string | number) {
        this._id = id;
    }
    get id(): string | number {
        return this._id;
    }

    set title(title: string) {
        this._title = title;
    }
    get title(): string {
        return this._title;
    }

    set hash(hash: string | number) {
        this._hash = hash;
    }
    get hash(): string | number {
        return this._hash;
    }

    set size(size: string | null) {
        this._size = size;
    }
    get size(): string | null {
        return this._size;
    }
    set type(type: string) {
        this._type = type;
    }
    get type(): string {
        return this._type;
    }

    set image(image: string) {
        this._image = image;
    }
    get image(): string {
        return this._image;
    }

    set context(context: string) {
        this._context = context;
    }
    get context(): string {
        return this._context;
    }
}
