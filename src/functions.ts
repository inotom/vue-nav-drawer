/** @prettier */

export const role = (isButton: boolean): string | undefined => {
  if (isButton) {
    return 'button';
  }
  return void 0;
};

export const tabindex = (isButton: boolean): number | undefined => {
  if (isButton) {
    return 0;
  }
  return void 0;
};
