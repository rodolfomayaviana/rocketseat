import React, { useState } from 'react';
import { NativeModules, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldTasks => [...oldTasks, newTask])

  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    updatedTasks.forEach(task => task.id == id ? task.done = !task.done : task.done = task.done);
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})