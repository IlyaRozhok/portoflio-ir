declare module 'react-icons/fa' {
  import { IconType } from 'react-icons';
  
  export const FaCode: IconType;
  export const FaMobile: IconType;
  export const FaLightbulb: IconType;
  export const FaReact: IconType;
  // Add any other Font Awesome icons you might use in the future
}

declare module 'react-icons/ai' {
  import { IconType } from 'react-icons';
  
  export const AiFillGithub: IconType;
  // Add any other Ant Design icons you might use in the future
}

declare module 'react-icons' {
  export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
    size?: string | number;
    color?: string;
    title?: string;
  }

  export type IconType = React.ComponentType<IconBaseProps>;
} 