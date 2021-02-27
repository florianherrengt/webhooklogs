import classNames from 'classnames';
import React from 'react';
import { Button, ButtonProps } from '../Button';
import { Color } from '../types';

interface AlertProps {
  color?: Color;
  text: string;
  btnProps?: ButtonProps;
}

export const Alert: React.FunctionComponent<AlertProps> = (props) => {
  const color = props.color || 'primary';
  return (
    <div
      className={classNames(['alert text-center', [`alert-${color}`]])}
      role="alert"
    >
      <span className={classNames([{ 'me-4': !!props.btnProps }])}>
        {props.text}
      </span>
      {props.btnProps ? <Button color={color} {...props.btnProps} /> : null}
    </div>
  );
};
