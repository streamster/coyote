import { get } from 'lodash';

export interface iTransform {
  data: Rec | Rec[];
  selectors: string[];
  schema: any;
}

export type Rec = {
  [key: string]: any;
};

export type KeyMap = [string, any];

const createRecordTemplate = (keyMaps: KeyMap[]) => {
  return keyMaps.reduce((acc: Rec, curr: KeyMap) => {
    acc[curr[0]] = null;
    return acc;
  }, {});
};

const fillRecord = (record: Rec, recordTemplate: Rec, keyMaps: KeyMap[]) => {
  const base = { ...recordTemplate };
  keyMaps.forEach((group: KeyMap) => {
    base[group[0]] = get(record, group[1], null);
  });
  return base;
};

//TODO add config checks and throw errors
const transform = ({ data, selectors, schema }: iTransform): any => {
  const keyGroups = Object.entries(schema);
  const recordTemplate = createRecordTemplate(keyGroups);

  const records = Array.isArray(data) ? data : get(data, selectors[0], null);

  let newSchema: KeyMap[] = Object.entries(schema);
  if (selectors[0] !== '*') {
    newSchema = keyGroups.map((group: KeyMap) => {
      if (group[1].includes(selectors[0])) {
        return [group[0], group[1].replace(`${selectors[0]}.`, '')];
      }
      return [group[0], group[0]];
    });
  }

  const parsedRecords = records.map((rec: Rec) => {
    const filledRec = fillRecord(rec, recordTemplate, newSchema);
    const missing = get(rec, selectors[1], null);
    if (!missing) {
      return filledRec;
    }
    return missing.map((d: any) => ({
      ...filledRec,
      ...d,
    }));
  });

  if (selectors.length === 0) {
    return data;
  } else {
    const newSelectors = [...selectors];
    newSelectors.shift();
    return transform({
      data: parsedRecords.reduce((acc: any[], val: any[]) => [...acc, ...val]),
      selectors: newSelectors,
      schema: Object.fromEntries(newSchema),
    });
  }
};

export default transform;
