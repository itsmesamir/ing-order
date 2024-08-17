import classnames from 'classnames';
import { overrideTailwindClasses } from 'tailwind-override';

import { Any } from 'types/common';

export const classNames = (...args: Any) => overrideTailwindClasses(classnames(...args));
