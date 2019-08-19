import React from 'react';
import {createUseIdFactory} from '../../utilities/create-use-id-factory';
import {RangeSliderProps, RangeSliderValue, DualValue} from './types';
import {RangeSliderDefault} from './utilities';

import {SingleThumb, DualThumb} from './components';

// The script in the styleguide that generates the Props Explorer data expects
// a component's props to be found in the Props interface. This silly workaround
// ensures that the Props Explorer table is generated correctly, instead of
// crashing if we write `RangeSlider extends React.Component<RangeSliderProps>`
interface Props extends RangeSliderProps {}

const useUniqueID = createUseIdFactory('RangeSlider');

function RangeSlider({
  min = RangeSliderDefault.Min,
  max = RangeSliderDefault.Max,
  step = RangeSliderDefault.Step,
  value,
  ...rest
}: Props) {
  const id = useUniqueID();
  const sharedProps = {
    id,
    min,
    max,
    step,
    ...rest,
  };

  return isDualThumb(value) ? (
    <DualThumb value={value} {...sharedProps} />
  ) : (
    <SingleThumb value={value} {...sharedProps} />
  );
}

function isDualThumb(value: RangeSliderValue): value is DualValue {
  return Array.isArray(value);
}

export default RangeSlider;
