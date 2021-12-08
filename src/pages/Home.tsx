import { Text, Input, Button, Row, Column, List, Logo } from 'components';
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
        <Column py="25px" alignItems="center" width="100%">
          <Logo />
        </Column>

        <Column
          width="100%"
          minHeight="300px"
          p="20px"
          bg="rgba(255, 255, 255, 0.2)"
          borderRadius="4px"
          alignItems="center"
        >
          <Text fontSize="bodyExtraLarge">Ready</Text>
          <Text fontSize="displayExtraLarge" fontWeight="bold" py="30px">
            25:00
          </Text>
          <Button variant="primary">
            <Text color="primary" fontSize="bodyExtraLarge" fontWeight="bold">
              START
            </Text>
          </Button>
        </Column>
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
