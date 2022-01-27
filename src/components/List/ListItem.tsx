import { Column, Icon, Row, Text } from 'components';

export type ListItemProps = {
  _id: string;
  deleted_at?: any;
  is_done: number;
  task: string;
  createdAt: Date;
  updatedAt: Date;
  index: number;
  isActive: boolean;
  onClick: (index: number) => void;
};

export const ListItem: React.FC<ListItemProps> = ({ index, _id, task, is_done, isActive, onClick }) => {
  return (
    <Column
      width="100%"
      bg="rgba(0, 0, 0, 0.2)"
      padding="20px"
      mb="10px"
      borderRadius="4px"
      borderLeftWidth="5px"
      borderLeftStyle="solid"
      borderLeftColor={isActive ? '#fff' : 'transparent '}
      onClick={() => onClick(index)}
      cursor="pointer"
    >
      <Row>
        <Text flex={1}>{task}</Text>
        {is_done === 1 && <Icon variant="white-done" />}
      </Row>
    </Column>
  );
};
