import { render } from '@testing-library/react';

import Youtube from './youtube';

describe('Youtube', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Youtube
        uid="GG2IQguY-J0"
        title="TTT X HÖR - Ellen Allien / April 4 / 10pm-11pm"
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
