import { Text, Input, Button, Row, Column, List, Logo, Icon } from 'components';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useTodo } from 'hooks/useTodo';

const DEFAULT_SECONDS = 5;
export const Home = () => {
  const { tasks, getAll, createTodo, updateTodo } = useTodo();

  const [taskName, setTaskName] = useState('');
  const [seconds, setSeconds] = useState(DEFAULT_SECONDS);
  const [timer, setTimer] = useState<any>();
  const [stage, setStage] = useState('ready');
  const [taskIndex, setTaskIndex] = useState(0);

  const handleOKButton = useCallback(async () => {
    await createTodo({ task: taskName, is_done: 0 });

    await getAll();

    setTaskName('');
  }, [createTodo, getAll, taskName]);

  const secondsToTime = (secs: number) => {
    const divisorMinute = secs % 3600;
    const min = Math.floor(divisorMinute / 60); //arredonda para baixo
    const sec = Math.ceil(divisorMinute % 60); //retorna o menor int

    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };
  const startTimer = () => {
    setStage('in_progress');
    const timerInterval = setInterval(() => {
      setSeconds((previousSeconds) => {
        if (previousSeconds === 0) {
          clearInterval(timerInterval);
          setStage('done');
          setTimer(undefined);
          return 0;
        }
        return previousSeconds - 1;
      });
    }, 1000);
    setTimer(timerInterval);
  };

  // useCallback fica escutando modificações - useMemo
  const handlePauseButton = useCallback(() => {
    clearInterval(timer);
    setStage('pause');
    setTimer(undefined);
  }, [timer]);

  const handleStopButton = useCallback(() => {
    clearInterval(timer);
    setStage('stop');
    setSeconds(DEFAULT_SECONDS);
  }, [timer]);

  const handleRestartButton = useCallback(() => {
    clearInterval(timer);
    setSeconds(DEFAULT_SECONDS);
    setStage('ready');
    startTimer();
  }, [timer]);

  const handleStageStatus = useMemo(() => {
    //sempre que stage alterar a variavel ganha um novo valor
    switch (stage) {
      case 'ready':
        return 'Ready';
      case 'in_progress':
        return 'Time to work';
      case 'done':
        return 'Finished ✔';
      case 'pause':
        return 'Pause ⏸';
      case 'stop':
        return 'Ready';
      default:
        return 'Ready';
    }
  }, [stage]);

  const handleDoneButton = useCallback(async () => {
    const task = tasks[taskIndex];

    if (task) {
      await updateTodo(task._id, { ...task, is_done: 1 });
      await getAll();
    }
  }, [updateTodo, tasks, taskIndex, getAll]);

  const handleStageButtons = useMemo(() => {
    switch (stage) {
      case 'ready':
        return (
          <>
            <Button variant="primary" mb="20px" onClick={startTimer}>
              <Text color="primary" fontSize="bodyExtraLarge" fontWeight="bold">
                START
              </Text>
            </Button>
          </>
        );
      case 'in_progress':
        return (
          <>
            <Row>
              <Button variant="primary" p="10px 20px" mx="5px" onClick={startTimer}>
                <Icon variant="play" />
              </Button>

              <Button variant="primary" p="10px 20px" mx="5px" onClick={handlePauseButton}>
                <Icon variant="pause" />
              </Button>

              <Button variant="primary" p="10px 20px" mx="5px" onClick={handleStopButton}>
                <Icon variant="stop" />
              </Button>
            </Row>
          </>
        );
      case 'done':
        return (
          <>
            <Row>
              <Button variant="primary" p="10px 20px" mx="5px" onClick={handleRestartButton}>
                <Icon variant="restart" />
              </Button>

              <Button variant="primary" p="10px 20px" mx="5px" onClick={handleDoneButton}>
                <Icon variant="done" />
              </Button>
            </Row>
          </>
        );
      default:
        return (
          <>
            <Button variant="primary" mb="20px" onClick={startTimer}>
              <Text color="primary" fontSize="bodyExtraLarge" fontWeight="bold">
                START
              </Text>
            </Button>
          </>
        );
    }
  }, [handlePauseButton, handleRestartButton, handleStopButton, handleDoneButton, stage]);

  useEffect(() => {
    getAll();
  }, [getAll]);

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
          <Text fontSize="bodyExtraLarge" fontWeight="bold">
            {handleStageStatus}
          </Text>
          <Text fontSize="displayExtraLarge" fontWeight="bold" py="30px">
            {secondsToTime(seconds)}
          </Text>

          {handleStageButtons}
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

        <List items={tasks} selectedIndex={taskIndex} onClick={setTaskIndex} />
      </Column>
    </>
  );
};
