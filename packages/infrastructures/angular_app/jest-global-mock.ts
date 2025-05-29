declare let global: any;

global.CSS = {
  supports: (k: any, v: any) => false,
}

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

global.URL.createObjectURL = jest.fn();
