import transform from '.';
import { dailyData } from './testData';
import { expected } from './testResults';

const schemaMap = {
  date: 'values[0].value[$].dateTime',
  siteId: 'sourceInfo.siteCode[0].value',
  siteName: 'sourceInfo.siteName',
  parameterId: 'variable.variableCode[0].value',
  parameter: 'variable.variableName',
  units: 'variable.unit.unitCode',
  value: 'values[0].value[$].value',
  qualifiers: 'values[0].value[$].qualifiers',
};

describe('transformSchema', () => {
  test('should return data that matches the shape of the schemaMap', () => {
    const output = transform(
      dailyData.value.timeSeries,
      'values[0].value',
      schemaMap
    );
    expect(output).toEqual(expected);
  });
  test('Errors: should throw an error if invalid config provided', () => {
    // test content here
  });
  test('Objects: should return an object that matches the shape of the schemaMap', () => {
    // test content here
  });
  test('Arrays - * selector: should return data that matches the shape of the schemaMap', () => {
    // test content here
  });
  test('Arrays - real selector: should return data that matches the shape of the schemaMap', () => {
    // test content here
  });
  test('schemaMap: custom transform functions should work', () => {
    // test content here
  });
});
