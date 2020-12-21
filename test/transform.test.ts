import transform from '../src/transform';
import { simpleData, simpleData2, usgsDailyData } from './data';
import { simpleExpected, simpleExpected2, usgsDailyExpected } from './expected';
import { simpleSchema, simpleSchema2, usgsDailySchema } from './schemas';

describe('transformSchema', () => {
  test('should return data that matches the shape of a simple schema map', () => {
    const output = transform({
      data: simpleData,
      selectors: ['*'],
      schema: simpleSchema,
    });
    expect(output).toEqual(simpleExpected);
  });
  test('should return data that matches the shape of a simple schema map - alternate 1', () => {
    const output = transform({
      data: simpleData2,
      selectors: ['data', 'results'],
      schema: simpleSchema2,
    });
    expect(output).toEqual(simpleExpected2);
  });
  test('should return data that matches the shape of the usgs daily data schema map', () => {
    const output = transform({
      data: usgsDailyData,
      selectors: ['value.timeSeries', 'values[0].value'],
      schema: usgsDailySchema,
    });
    expect(output).toEqual(usgsDailyExpected);
  });
  test.skip('Errors: should throw an error if invalid config provided', () => {
    // test content here
  });
  test.skip('Objects: should return an object that matches the shape of the schemaMap', () => {
    // test content here
  });
  test.skip('Arrays - * selector: should return data that matches the shape of the schemaMap', () => {
    // test content here
  });
  test.skip('Arrays - real selector: should return data that matches the shape of the schemaMap', () => {
    // test content here
  });
  test.skip('schemaMap: custom transform functions should work', () => {
    // test content here
  });
});
