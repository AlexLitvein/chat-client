import React, { useState, useEffect } from "react";
import { IMessage } from "./types";
// import { Stack, SxProps, Typography } from '@mui/material';

export interface IMessageProps {
  msg: IMessage;
  //  sx?: SxProps;
  //  children?: React.ReactNode[];
}

export const Message = ({ msg }: IMessageProps) => {
  return (
    // sx={{...sx, }} {...rest}
    <div>{msg.message}</div>
  );
};
