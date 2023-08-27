import { FlatList, View, Text, SafeAreaView, StyleSheet, StatusBar, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import Task from './Task'
import { Platform } from 'react-native';
import { data } from '../../context/mocks';
import Upsert from './Upsert';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tasks = () => {
  const [tasksData, setTasksData] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const fetchTasks = async () => {
    try {
      const response = await AsyncStorage.getItem('@focus:TASKS')

      if (response) {
        const parsedResponse = JSON.parse(response);
        setTasksData(parsedResponse);
      }
    } catch (error) {
    }
  }

  const updateTasks = async () => {
    try {
      await AsyncStorage.setItem('@focus:TASKS', JSON.stringify(tasksData))
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    updateTasks()
  }, [tasksData])

  

  const upserTask = (newTask: ITask) => {
    console.log('upserTask | newTask: ', newTask);

    if (tasksData.find(task => task.id === newTask.id)) {
      editTask(newTask)
    }
    else {
      const tasks = [newTask, ...tasksData]
      setTasksData(tasks);
    }
    setTaskToUpdate(null)
    setIsModalVisible(false);
  }

  const editTask = (newTask: ITask) =>  {
    let tasks = [...tasksData]

    for (let [i, currenTask] of tasks.entries()) {
      if (newTask.id === currenTask.id) {
        tasks[i] = newTask
      }
    }

    setTasksData(tasks);
  }

  const deleteTask = (id: string) => () => {
    let tasks = [...tasksData]
    tasks = tasks.filter(task => task.id !== id);
    setTasksData(tasks);
  }

  return (
    <View style={styles.tasks}>
      {tasksData.length > 0 ? 
        (
          
          <FlatList
            data={tasksData}
            renderItem={
              ({item}) => 
              <Task
                task={item}
                onEdit={() => {
                  setTaskToUpdate(item)
                  setIsModalVisible(true)
                }}
                onDelete={deleteTask(item.id)}
                onMove={task => editTask(task)}
              />
            }
            keyExtractor={item => item.id}
          />
        )
        :
        (
          <Text style={styles.empty}>Wow, such empty</Text>
        )
      }
      <Upsert 
        task={taskToUpdate}
        visible={isModalVisible}
        upsert={upserTask}
        close={() => {
          setTaskToUpdate(null)
          setIsModalVisible(false)
        }}
        tasksLength={tasksData.length}
      />
      <Pressable style={styles.add} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.text}>
          +
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  tasks: {
    backgroundColor: '#1b1d27',
    paddingTop: 15,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    verticalAlign: 'center',
    width: '100%'
  },
  empty: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
    marginTop: '70%',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  add: {
    alignItems: 'center',
    backgroundColor: '#34cfff',
    borderRadius: 25,
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    margin: 20,
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  text: {
    fontSize: 25,
    color: '#fff'
  }
});

export default Tasks