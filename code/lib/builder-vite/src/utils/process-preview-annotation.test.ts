import { processPreviewAnnotation } from './process-preview-annotation';
import 'jest-os-detection';

describe('processPreviewAnnotation()', () => {
  it('should pull the `bare` value from an object', () => {
    const annotation = {
      bare: '@storybook/addon-links/preview',
      absolute: '/Users/foo/storybook/node_modules/@storybook/addon-links/dist/preview.mjs',
    };
    const url = processPreviewAnnotation(annotation, '/Users/foo/storybook');
    expect(url).toBe('@storybook/addon-links/preview');
  });

  it.skipWindows(
    'should convert absolute filesystem paths into urls relative to project root',
    () => {
      const annotation = '/Users/foo/storybook/.storybook/preview.js';
      const url = processPreviewAnnotation(annotation, '/Users/foo/storybook');
      expect(url).toBe('/.storybook/preview.js');
    }
  );

  it.onWindows(
    'should convert absolute windows filesystem paths into urls relative to project root',
    () => {
      const annotation = 'C:/foo/storybook/.storybook/preview.js';
      const url = processPreviewAnnotation(annotation, 'C:/foo/storybook');
      expect(url).toBe('/.storybook/preview.js');
    }
  );

  it('should convert relative paths into urls', () => {
    const annotation = './src/stories/components';
    const url = processPreviewAnnotation(annotation, '/Users/foo/storybook');
    expect(url).toBe('/src/stories/components');
  });

  it('should convert node_modules into bare paths', () => {
    const annotation = '/Users/foo/storybook/node_modules/storybook-addon/preview';
    const url = processPreviewAnnotation(annotation, '/Users/foo/storybook');
    expect(url).toBe('storybook-addon/preview');
  });
});
