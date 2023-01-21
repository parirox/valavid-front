export function dirtyValues(dirtyFields, allValues) {
  if (dirtyFields === true || Array.isArray(dirtyFields))
    return allValues;
  return Object.fromEntries(Object.keys(dirtyFields).map(key => [key, dirtyValues(dirtyFields[key], allValues[key])]));
}

function buildFormData(formData, data, parentKey) {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    const value = data == null ? '' : data;
    formData.append(parentKey, value);
  }
}

export function jsonToFormData(data) {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
}

