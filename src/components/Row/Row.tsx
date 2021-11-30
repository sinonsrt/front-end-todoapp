import styled from 'styled-components';
import { layout, LayoutProps, SpaceProps } from 'styled-system';

type RowProps = LayoutProps & SpaceProps;

export const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  ${layout}
`;
