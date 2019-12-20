/**
 * 这个没处理 array 情况
 */
declare const cleanObj: (obj: any) => any;
declare const getType: (params: any) => string;
declare const isEmpty: (params: any) => boolean;
declare const get: (data?: any, path?: string, defaultValue?: string) => any;
declare const set: (data: any, path: string | undefined, value: any) => any;
/**
 * 校验
 * @param validateParams
 */
declare const validateFields: (validateParams: any) => string[];
/**
 * 会改变源数据;
 * 有点问题; 误用;
 */
declare const merge: (originData: any, targetData: any) => any;
declare const cloneDeep: (data: any) => any;
declare const getFormPath: (idPath: string) => string;
export { cleanObj, get, set, merge, getType, isEmpty, validateFields, cloneDeep, getFormPath };
