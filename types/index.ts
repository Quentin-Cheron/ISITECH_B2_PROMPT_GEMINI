import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Message = {
  sendMessage: string;
  getMessage?: string;
  createdAt: Date;
};

export type allMessages = Message[];
