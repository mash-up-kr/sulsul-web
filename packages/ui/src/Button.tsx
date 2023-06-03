import './global.css';

type ButtonProps = {};

export const Button = (props: ButtonProps) => (
  <button type="button" {...props}>
    button
  </button>
);
