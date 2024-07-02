function getValue(obj: object, keys: string[]) {
  let value = obj;
  for (const key of keys) {
    if (Array.isArray(value[key])) {
      value = value[key][0];
    } else {
      value = value[key];
    }
    if (value === undefined) {
      break; // Handle cases where the key does not exist
    }
  }
  return value;
}

function setValue(
  obj: object | Array<any>,
  keys: string[],
  value: (cur: any) => any,
) {
  let currentObj = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!currentObj[key]) {
      currentObj[key] = {};
    }
    if (Array.isArray(currentObj[key])) {
      currentObj[key].map();
    }

    if (typeof currentObj === 'object') {
      currentObj = currentObj[key];
    }
  }

  currentObj[keys[keys.length - 1]] = value;
}

function setValueRecursion(
  obj: any,
  keys: string[],
  value: (cur: any) => any,
): void {
  const currentObj = obj;

  if (currentObj == null) {
    return;
  }

  if (Array.isArray(currentObj)) {
    currentObj.map((each) => setValueRecursion(each, keys, value));
    return;
  }

  if (typeof currentObj === 'object') {
    const len = keys.length;
    const key = keys[0];
    if (len > 1) {
      return setValueRecursion(currentObj[key], keys.slice(1), value);
    }

    currentObj[key] = value(currentObj[key]);
    return;
  }
}

export { setValueRecursion };
