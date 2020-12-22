import transform from '../src/transform';
import { simpleData, simpleData2, simpleData3, usgsDailyData } from './data';
import { simpleExpected, simpleExpected2, usgsDailyExpected } from './expected';
import {
  simpleSchema,
  simpleSchema2,
  simpleSchema3,
  usgsDailySchema,
} from './schemas';

describe('transformSchema', () => {
  test('Errors: should throw an error if invalid config provided', () => {
    expect(() =>
      transform({
        iterators: ['value.timeSeries', 'values[0].value'],
        schema: usgsDailySchema,
      } as any)
    ).toThrowError(
      "Error: No data provided. We can't transform the data if there's no data to transform!"
    );
    expect(() =>
      transform({
        data: usgsDailyData,
        iterators: ['value.timeSeries', 'values[0].value'],
      } as any)
    ).toThrowError(
      "Error: No schema provided. We can't transform the data unless you tell how us it should be transformed!"
    );
  });
  test('should return data that matches the shape of a simple schema map', () => {
    const output = transform({
      data: simpleData,
      iterators: ['*'],
      schema: simpleSchema,
    });
    expect(output).toEqual(simpleExpected);
  });
  test('should return data that matches the shape of a simple schema map - alternate 1', () => {
    const output = transform({
      data: simpleData2,
      iterators: ['data', 'results'],
      schema: simpleSchema2,
    });
    expect(output).toEqual(simpleExpected2);
  });
  test('should return data that matches the shape of a simple schema map - alternate 2', () => {
    const output = transform({
      data: simpleData3,
      iterators: ['data', 'results[0].data'],
      schema: simpleSchema3,
    });
    expect(output).toEqual(simpleExpected2);
  });
  test('should return data that matches the shape of the usgs daily data schema map', () => {
    const output = transform({
      data: usgsDailyData,
      iterators: ['value.timeSeries', 'values[0].value'],
      schema: usgsDailySchema,
    });
    expect(output).toEqual(usgsDailyExpected);
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
