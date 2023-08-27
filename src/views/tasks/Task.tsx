import React from 'react'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'; 

import { ListItem } from '@rneui/base';

type TTaskProps = {
    task: ITask,
    onEdit: () => void,
    onDelete: () => void,
    onMove: (task: ITask) => void,
}

const Task = ({ task, onEdit, onDelete, onMove } : TTaskProps) => {
  const move = (direction: 'l' | 'r') => {
    if (direction === 'l') {
      if (task.status === 'wip') {
        const newTask = {...task}
        newTask.status = 'todo'
        onMove(newTask)
      }
      else if (task.status === 'done') {
        const newTask = {...task}
        newTask.status = 'wip'
        onMove(newTask)
      }
    }
    else {
      if (task.status === 'wip') {
        const newTask = {...task}
        newTask.status = 'done'
        onMove(newTask)
      }
      else if (task.status === 'todo') {
        const newTask = {...task}
        newTask.status = 'wip'
        onMove(newTask)
      }
    }
  }

  const getStatusColor = (status: 'todo' | 'wip' | 'done') => {
    return {...styles.task, ...styles.task[status]}
  }

  return (
    <View style={getStatusColor(task.status)}>
      <Text style={styles.task.text}>{task.detail}</Text>
      <View style={styles.footer}>
        <View style={styles.statusActions}>
          <Pressable onPress={() => move('l')}>
            <Feather name="arrow-left-circle" size={24} color="#34cfff" />
          </Pressable>
          <Text style={styles.status}>{task.status}</Text>
          <Pressable onPress={() => move('r')}>
            <Feather name="arrow-right-circle" size={24} color="#34cfff" />
          </Pressable>
        </View>
        <View style={styles.taskActions}>
          <Pressable onPress={onEdit}>
            <Feather name="edit" size={24} color="#34cfff" />
          </Pressable>
          <Pressable onPress={onDelete}>
          <Feather name="delete" size={26} color="#dc3333" />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  field: {
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 40,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  task: {
    backgroundColor: '#292d41',
    // width: '100%',
    borderRadius: 22,
    padding: 25,
    // borderColor: '#ccc',
    // borderWidth: 2,
    marginVertical: 15,
    marginHorizontal: 30,
    // margin: 30,
    text: {
      color: '#fff',
      fontSize: 20,
    },
    todo: {
      borderBottomColor: '#dc3333',
      borderBottomWidth: 22,
    },
    wip: {
      borderBottomColor: '#dfce3d',
      borderBottomWidth: 22,
    },
    done: {
      borderBottomColor: '#90e247',
      borderBottomWidth: 22,
    },
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  statusActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 8,
    gap: 8,
  },
  status: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  taskActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
    gap: 8,
  }
});

export default Task