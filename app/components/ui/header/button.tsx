import { Button } from '@heroui/button';

interface HeaderButtonProps {
  onClick?: () => void;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger';
  variant?:
    | 'flat'
    | 'solid'
    | 'bordered'
    | 'light'
    | 'faded'
    | 'shadow'
    | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function HeaderButton({
  onClick,
  variant,
  color,
  size,
  children,
}: HeaderButtonProps) {
  return (
    <Button color={color} variant={variant} onPress={onClick} size={size}>
      {children}
    </Button>
  );
}
