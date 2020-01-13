import { IWIdget } from './interface';
import Display from './Widgets/Display';
import CustomComponent from './Widgets/Custom';
import WidgetInput from './Widgets/Input';
import WidgetRadio from './Widgets/Radio';
import WidgetCheckbox from './Widgets/Checkbox';
import Select from './Widgets/Select';

export const WIDGET_TYPE: IWIdget = {
  string: WidgetInput,
  component: CustomComponent,
  display: Display,
  radio: WidgetRadio,
  checkbox: WidgetCheckbox,
  select: Select,
};

