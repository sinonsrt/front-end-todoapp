import { Text, Input, Button, Row, Column, List } from 'components';
import { useState } from 'react';
export const Home = () => {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState<{ label: string }[]>([]);

  const handleOKButton = () => {
    if (!taskName) return;
    setTasks((previous) => {
      // previous - pass current value of tasks
      const copy = [...previous];
      copy.push({ label: taskName });
      return copy;
    });
    setTaskName('');
  };

  return (
    <>
      <Column width="600px" margin="0 auto" paddingLeft="10px">
        <Text fontWeight="bold" fontSize="bodyLarge" my="10px">
          Tasks
        </Text>
        <Row width="100%">
          <Input
            flex={1}
            placeholder="Enter a task name here..."
            value={taskName}
            onChange={(event) => setTaskName(event.target.value)}
          />
          <Button onClick={handleOKButton}> OK </Button>
        </Row>

        <List items={tasks} />
      </Column>
    </>
  );
};
