export default function resolveProps<DefaultPropsType, PropsType>(
  defaultProps: DefaultPropsType,
  props: PropsType,
) {
  return {
    ...defaultProps,
    ...props,
  };
}
