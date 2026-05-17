import type { ComponentType } from 'react';

export interface TimePickerProps {
  isVisible?: boolean;
  title?: string;
  use12Hour?: boolean;
  minuteInterval?: number;
  onClose?: () => void;
  onConfirm?: (time: string) => void;
}

// Dependency ships `.ts` sources as `main`; strict mode fails inside node_modules.
// Resolve the real implementation without pulling those files into typechecking.
// eslint-disable-next-line @typescript-eslint/no-require-imports -- intentional escape hatch
const impl = require('../../node_modules/react-native-flexi-time-selector');

export const TimePicker = impl.TimePicker as ComponentType<TimePickerProps>;
