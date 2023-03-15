import _ from 'lodash';

export default function resolveProps<DefaultPropsType extends {}, PropsType extends {}>(
  defaultProps: DefaultPropsType,
  props: PropsType,
) {
  const resolved: Record<string, unknown> = { ...defaultProps };

  Object.keys(props).forEach((key) => {
    if ((props as any)[key] !== undefined) {
      resolved[key] = (props as any)[key];
    }
  });

  return resolved as DefaultPropsType & PropsType;
}
