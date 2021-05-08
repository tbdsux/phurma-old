import { ButtonHTMLAttributes } from 'react';

interface ColorButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const colorClassname = (classname: string) =>
  [classname, 'bg-purple-400 hover:bg-purple-500 text-white'].join(' ');

const ColorButton = (props: ColorButtonProps) => {
  return (
    <button {...props} className={colorClassname(props.className)}>
      {props.children}
    </button>
  );
};

export { ColorButton };
