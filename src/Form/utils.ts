
/**
 * 这个没处理 array 情况
 */
const cleanObj = (obj: any) => {
  const type = getType(obj);
  let data = obj;
  if (type === 'object') {
    data = {};
    Object.keys(obj).forEach(key => {
      const item = obj[key];
      if (typeof item === 'object') {
        const result = cleanObj(item);
        if (!isEmpty(result)) {
          data[key] = result;
        }
      } else {
        if (!isEmpty(item)) {
          data[key] = item;
        }
      }
    });
  } else if (type === 'array') {
    data = [];
    obj.forEach((item: any, index: number) => {
      if (typeof item === 'object') {
        const result = cleanObj(item);
        if (!isEmpty(result)) {
          data[index] = item;
        }
      } else {
        if (!isEmpty(item)) {
          data[index] = item;
        }
      }
    });
    data = data.filter((i: any) => !!i);
  }
  return data;
};

const getType = (params: any) => {
  const type = Object.prototype.toString.call(params);
  switch (type) {
    case '[object Object]':
      return 'object';
    case '[object Array]':
      return 'array';
    case '[object Function]':
      return 'function';
    case '[object Number]':
      return 'number';
    case '[object String]':
      return 'string';
    case '[object Undefined]':
      return 'undefined'
    case '[object Null]':
      return 'null'
    case '[object Boolean]':
      return 'boolean'
    case '[object Symbol]':
      return 'symbol'
    case '[object Function]':
      return 'function'
    default:
      return type;
  }
};

const isEmpty = (params: any): boolean => {
  const type = getType(params);
  switch (type) {
    case 'object':
      return Object.keys(params).length === 0;
    case 'array':
      return params.length === 0;
    default:
      return params === undefined || params === '' || params === null;
  }
};


// get 函数  支持 obj array
const get = (data: any = {}, path = '', defaultValue = ''): any => {
  if (typeof data !== 'object' || isEmpty(data)) {
    return defaultValue;
  }
  const dataType = getType(data);
  let currentPath = path;
  let surplusPath = '';
  if (typeof data === 'object') {
    if (dataType === 'object') {
      [, currentPath = path, , surplusPath = ''] = path.match(/^(\w+)(\.?)(.*)/) || [];
    } else {
      [, currentPath = path, , surplusPath = ''] = path.match(/^\[(\d+)\](\.?)(.*)/) || [];
    }
    const currentData = data[currentPath];
    if (currentData && surplusPath) {
      return get(currentData, surplusPath, defaultValue);
    } else {
      return currentData;
    }
  } else {
    return data;
  }
};

const set = (data: any, path = '', value: any) => {
  const [, startWord = '', ,] = path.match(/(.+?)/) || [];
  const isNewArrayData = startWord.includes('[');
  let currentPath = path;
  let surplusPath = '';
  if (isNewArrayData) {
    [, currentPath, , surplusPath = ''] = path.match(/^\[(\d+)\](\.?)(.*)/) || [];
  } else {
    [, currentPath, , surplusPath = ''] = path.match(/^(\w+)(\.?)(.*)/) || [];
  }
  if (!currentPath) {
    return data;
  }
  let newData = {};
  const currentData = data[currentPath];
  if (!surplusPath) {
    data[currentPath] = value;
    return;
  }
  if (currentData === undefined || currentData === null) {
    // 当前路径无值 创建之
    if (surplusPath.startsWith('[')) {
      newData = [];
    }
    data[currentPath] = newData;
    set(newData, surplusPath, value);
  } else {
    set(data[currentPath], surplusPath, value);
  }
  return data;
};

/**
 * 校验
 * @param validateParams 
 */
const validateFields = (validateParams: any): string[] => {
  const { label, value = '', type, validate } = validateParams;
  let errorList: string[] = [];
  if (!validate) return errorList
  // console.log('type', type);
  // console.log('validate', getType(validate));
  if ('function' === getType(validate)) {
    errorList = validate({ value, label }) || [];
  } else {
    Object.keys(validate).forEach(item => {
      const valiConfig = validate[item];
      // console.log(item, value);
      switch (item) {
        case 'required':
          if (['checkbox'].includes(type)) {
            if (value.length === 0) errorList.push(`请选择${label}`);
          } else if (!value) {
            errorList.push(`请输入${label}`);
          }
          break;
        case 'maxLen':
          if (value.toString().length > valiConfig) {
            errorList.push(`最长为 ${valiConfig} `);
          }
          break;
        case 'regExp':
          if (!valiConfig.test(value)) {
            // fieldErrors.push(`请正确输入${label}`);
          }
          break;
        default:
          break;
      }
    });
  }
  return errorList;
};


/**
 * 会改变源数据;
 * 有点问题; 误用;
 */
const merge = (originData: any, targetData: any) => {
  const plc: symbol = Symbol();
  const originType = getType(originData);
  const targetType = getType(targetData);
  let data = originData;
  if (typeof originData === 'object') {
    data = originType === 'object' ? {} : [];
  }
  if (originType === 'object' && targetType === 'object') {
    for (const key in originData) {
      const originItem = originData[key];
      const targetItem = targetData[key];
      if (typeof originItem !== 'object' || typeof targetItem !== 'object') {
        data = { ...originData, ...targetData };
      } else {
        delete targetData[key];
        data[key] = merge(originItem, targetItem);
      }
    }
    // 新增数据
    if (!isEmpty(targetData)) {
      data = { ...data, ...targetData };
    }
  } else if (originType === 'array' && targetType === 'array') {
    for (const index in originData) {
      const originItem = originData[index];
      const targetItem = targetData[index];
      if (isEmpty(targetItem)) {
        data[index] = originItem;
      } else if (typeof originItem !== 'object' && typeof targetItem !== 'object') {
        targetData.splice(index, 1, plc);
        data[index] = targetItem;
      } else {
        targetData.splice(index, 1, plc);
        data[index] = merge(originItem, targetItem);
      }
    }
    if (!isEmpty(targetData)) {
      data = data.concat(targetData.filter((i: any) => i !== plc));
    }
  } else if (typeof originData !== 'object' || typeof targetData !== 'object') {
    data = targetData ? targetData : originData;
  }
  return data;
};

const cloneDeep = (data: any) => {
  const type = getType(data);
  let newData = data;
  if (type === 'object') {
    newData = {};
    Object.keys(data).forEach(key => {
      newData[key] = cloneDeep(data[key]);
    });
  } else if (type === 'array') {
    newData = [];
    data.forEach((item: any, index: number) => {
      newData[index] = cloneDeep(item);
    });
  }
  return newData;
};




const getFormPath = (idPath: string) => idPath.replace(/\./g, '.properties.');


export { cleanObj, get, set, merge, getType, isEmpty, validateFields, cloneDeep, getFormPath };
