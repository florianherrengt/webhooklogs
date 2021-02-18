import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  iconLeft?: React.ReactElement;
  text?: string;
  link?: string;
  disabled?: boolean;
  type?: 'primary' | 'success';
}

const IconLeft = styled.span`
  svg {
    margin-top: -2px;
    margin-right: 2px;
  }
`;

export const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const type = props.type || 'primary';
  if (props.link) {
    return (
      <a className={`btn btn-${type}`} href={props.link} role="button">
        <IconLeft>{props.iconLeft}</IconLeft> {props.text}
      </a>
    );
  }
  return (
    <button disabled={props.disabled} className={`btn btn-${type}`}>
      {props.text}
    </button>
  );
};
