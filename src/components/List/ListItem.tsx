import { Column, Text } from 'components';

export type ListItemProps = {
  _id: string;
  deleted_at?: any;
  is_done: number;
  task: string;
  createdAt: Date;
  updatedAt: Date;
};

export const ListItem: React.FC<ListItemProps> = ({ _id, task, is_done }) => {
  return (
    <Column
      width="100%"
      bg="rgba(0, 0, 0, 0.2)"
      padding="20px"
      mb="10px"
      borderRadius="4px"
      borderLeft="5px solid #fff"
    >
      <Text>{task}</Text>
    </Column>
  );
};
