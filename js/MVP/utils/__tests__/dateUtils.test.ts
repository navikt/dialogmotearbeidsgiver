import {
  getFullDateFormat,
  getLongDateFormat,
  getProgrammaticDateFormat,
  isDateInPast,
  minutesToMillis,
} from '../dateUtils';

describe('dateUtils', () => {
  beforeAll(() => {
    jest.setSystemTime(new Date('2020-02-02').getTime());
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  describe('getProgrammaticDateFormat', () => {
    test('should return programmatic date format', () => {
      const formatedDate = getProgrammaticDateFormat(Date.now());

      expect(formatedDate).toBe('02-02-2020');
    });
  });

  describe('getLongDateFormat', () => {
    test('should return long date format', () => {
      const formatedDate = getLongDateFormat(Date.now());

      expect(formatedDate).toBe('2. februar 2020');
    });
  });

  describe('getFullDateFormat', () => {
    test('should return full date format', () => {
      const formatedDate = getFullDateFormat(Date.now());

      expect(formatedDate).toBe('søndag 2. februar 2020');
    });
  });

  describe('isDateInPast', () => {
    test('should return true when date param is the past', () => {
      const pastDate = new Date('2010-02-02');

      expect(isDateInPast(pastDate)).toBe(true);
    });

    test('should return false when date param is present', () => {
      const presentDate = new Date();

      expect(isDateInPast(presentDate)).toBe(false);
    });

    test('should return false when date param is the future', () => {
      const futureDate = new Date('2021-02-02');

      expect(isDateInPast(futureDate)).toBe(false);
    });
  });

  describe('minutesToMillis', () => {
    test('should convert to millis from minutes', () => {
      const minutes = 60;

      expect(minutesToMillis(minutes)).toBe(3600000);
    });
  });
});
