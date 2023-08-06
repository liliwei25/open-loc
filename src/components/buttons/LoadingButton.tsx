import {
  Button,
  ButtonProps,
  createPolymorphicComponent,
  Loader,
} from '@mantine/core';

type LoadingButtonProps = ButtonProps & {
  isLoading?: boolean;
};

export const LoadingButton = createPolymorphicComponent<
  'button',
  LoadingButtonProps
>(function ({ isLoading, disabled, children, ...props }: LoadingButtonProps) {
  return (
    <Button {...props} disabled={disabled || isLoading}>
      {isLoading ? <Loader variant="dots" /> : children}
    </Button>
  );
});
