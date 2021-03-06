import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import classNames from 'classnames';
import { Color } from '../types';

export interface ButtonProps {
  iconLeft?: React.ReactElement;
  text?: string;
  link?: string;
  disabled?: boolean;
  outline?: boolean;
  external?: boolean;
  color?: Color;
}

const IconLeft = styled.span`
  svg {
    margin-top: -2px;
    margin-right: 2px;
  }
`;

export const Button: React.FunctionComponent<
  ButtonProps & React.DetailedHTMLProps<any, any>
> = (props) => {
  const htmlProps = { ...props };
  ['iconLeft', 'text', 'link', 'outline', 'color', 'external'].forEach((prop) =>
    Reflect.deleteProperty(htmlProps, prop),
  );

  const color = props.color || 'primary';
  const className = classNames([
    `btn`,
    {
      [`btn-${color}`]: !props.outline,
      [`btn-outline-${color}`]: props.outline,
    },
  ]);

  if (props.external) {
    return (
      <a {...htmlProps} href={props.link} className={className} to={props.link}>
        <IconLeft>{props.iconLeft}</IconLeft> {props.text}
      </a>
    );
  }

  if (props.link) {
    return (
      <Link {...htmlProps} className={className} to={props.link} role="button">
        <IconLeft>{props.iconLeft}</IconLeft> {props.text}
      </Link>
    );
  }
  return (
    <button {...htmlProps} disabled={props.disabled} className={className}>
      <IconLeft>{props.iconLeft}</IconLeft> {props.text}
    </button>
  );
};
