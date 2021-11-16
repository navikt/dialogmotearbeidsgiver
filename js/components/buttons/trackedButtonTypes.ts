import { KnappBaseProps } from 'nav-frontend-knapper';

interface OwnProps {
  children: string;
  trackingName: string;
}

export type TrackedButtonProps = OwnProps & KnappBaseProps;
