import { get } from 'lodash';

export type Rec = {
  [key: string]: any;
};

export type KeyMap = [string, any];

const getRecords = (data: Rec, selector: string) => get(data, selector, null);

const createRecordTemplate = (keyMaps: KeyMap[]) => {
  return keyMaps.reduce((acc: Rec, curr: KeyMap) => {
    acc[curr[0]] = null;
    return acc;
  }, {});
};

const fillBaseRecord = (
  parentRecord: Rec,
  records: Rec[],
  recordTemplate: Rec,
  keyMaps: KeyMap[]
) => {
  return records.map((_: any, ii: number) => {
    let base = { ...recordTemplate };
    keyMaps.forEach((group: KeyMap) => {
      base[group[0]] = get(parentRecord, group[1].replace('$', ii), null);
    });
    return base;
  });
};

export default (data: Rec | Rec[], selector: string, schemaMap: any) => {
  const keyGroups = Object.entries(schemaMap);

  if (selector !== '*') {
    const series = data.map((d: Rec) => {
      const baseRecords = getRecords(d, selector);
      const recordTemplate = createRecordTemplate(keyGroups);
      const parsedRecords = fillBaseRecord(
        d,
        baseRecords,
        recordTemplate,
        keyGroups
      );
      return parsedRecords;
    });
    return series.reduce((acc: any[], val: any[]) => [...acc, ...val]);
  }
};
