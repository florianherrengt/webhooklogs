import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import classNames from 'classnames';

interface ButtonProps {
  iconLeft?: React.ReactElement;
  text?: string;
  link?: string;
  disabled?: boolean;
  outline?: boolean;
  color?: 'primary' | 'secondary' | 'success';
}

const IconLeft = styled.span`
  svg {
    margin-top: -2px;
    margin-right: 2px;
  }
`;

export const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const color = props.color || 'primary';
  const className = classNames([
    `btn`,
    {
      [`btn-${color}`]: !props.outline,
      [`btn-outline-${color}`]: props.outline,
    },
  ]);

  if (props.link) {
    return (
      <Link className={className} to={props.link} role="button">
        <IconLeft>{props.iconLeft}</IconLeft> {props.text}
      </Link>
    );
  }
  return (
    <button disabled={props.disabled} className={className}>
      <IconLeft>{props.iconLeft}</IconLeft> {props.text}
    </button>
  );
};