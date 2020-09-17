import {LocalStorageMock} from '@shared/mock/localstorage.mock';

describe('LocalStorageMock', () => {
  let localStorageMock;

  beforeEach(() => {
    localStorageMock = new LocalStorageMock();
  });

  it('should be defined', () => {
    expect(localStorageMock).toBeDefined();
  });

  it('should call setItem', () => {
    const setItemSpy = jest.spyOn(localStorageMock, 'setItem');
    localStorageMock.setItem('test', {});
    expect(setItemSpy).toHaveBeenCalled();
  });

  it('should call getItem', () => {
    const getItemSpy = jest.spyOn(localStorageMock, 'getItem');
    localStorageMock.getItem('test');
    expect(getItemSpy).toHaveBeenCalled();
  });

  it('should call clear', () => {
    const clearSpy = jest.spyOn(localStorageMock, 'clear');
    localStorageMock.clear();
    expect(clearSpy).toHaveBeenCalled();
  });

  it('should call removeItem', () => {
    const removeItemSpy = jest.spyOn(localStorageMock, 'removeItem');
    localStorageMock.setItem('test', {});
    localStorageMock.removeItem('test');
    expect(removeItemSpy).toHaveBeenCalled();
  });
});
