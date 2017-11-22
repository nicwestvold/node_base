import wrapper from './wrapper';

describe('logger > wrapper', () => {
  it('returns object with expected attributes', () => {
    // Arrange
    const logger = { log: jest.fn() };
    const expected = ['debug', 'info', 'warn', 'error'];
    // Act
    const result = wrapper(logger);
    // Assert
    expect(Object.keys(result)).toEqual(expected);
  });

  describe('#debug', () => {
    it('calls logger.log with "debug" and args', () => {
      // Arrange
      const logger = { log: jest.fn() };
      const msg = 'some message';
      const obj = { some: 'object' };
      const fn = wrapper(logger);
      // Act
      fn.debug(msg, obj);
      // Assert
      expect(logger.log.mock.calls[0][0]).toEqual('debug');
      expect(logger.log.mock.calls[0][1]).toEqual(msg);
      expect(logger.log.mock.calls[0][2]).toEqual(obj);
    });
  });

  describe('#info', () => {
    it('calls logger.log with "info" and args', () => {
      // Arrange
      const logger = { log: jest.fn() };
      const msg = 'some message';
      const obj = { some: 'object' };
      const fn = wrapper(logger);
      // Act
      fn.info(msg, obj);
      // Assert
      expect(logger.log.mock.calls[0][0]).toEqual('info');
      expect(logger.log.mock.calls[0][1]).toEqual(msg);
      expect(logger.log.mock.calls[0][2]).toEqual(obj);
    });
  });

  describe('#warn', () => {
    it('calls logger.log with "warn" and args', () => {
      // Arrange
      const logger = { log: jest.fn() };
      const msg = 'some message';
      const obj = { some: 'object' };
      const fn = wrapper(logger);
      // Act
      fn.warn(msg, obj);
      // Assert
      expect(logger.log.mock.calls[0][0]).toEqual('warn');
      expect(logger.log.mock.calls[0][1]).toEqual(msg);
      expect(logger.log.mock.calls[0][2]).toEqual(obj);
    });
  });

  describe('#error', () => {
    it('calls logger.log with "error" and args', () => {
      // Arrange
      const logger = { log: jest.fn() };
      const msg = 'some message';
      const obj = { some: 'object' };
      const fn = wrapper(logger);
      // Act
      fn.error(msg, obj);
      // Assert
      expect(logger.log.mock.calls[0][0]).toEqual('error');
      expect(logger.log.mock.calls[0][1]).toEqual(msg);
      expect(logger.log.mock.calls[0][2]).toEqual(obj);
    });
  });
});
