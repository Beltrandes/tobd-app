import { AmountFormatePipe } from './amount-formate.pipe';

describe('AmountFormatePipe', () => {
  it('create an instance', () => {
    const pipe = new AmountFormatePipe();
    expect(pipe).toBeTruthy();
  });
});
