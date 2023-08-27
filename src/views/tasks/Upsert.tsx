import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dialog } from '@rneui/themed'

interface IUpsertProps {
    task: ITask | null,
    visible: boolean,
    close: () => void,
    upsert: (newTask: ITask) => void,
    tasksLength: number
}

const Upsert = ({task, visible, close, upsert, tasksLength}: IUpsertProps) => {
    const [taskDetail, setTaskDetail] = useState('');

    useEffect(() => {
        if (task) {
            setTaskDetail(task?.detail)
        } else {
            setTaskDetail('')
        }
    }, [task])
    

    const onUpsert = () => {
        const newTask: ITask = {
            id: task?.id || new Date().getTime().toString(),
            detail: taskDetail,
            order: task?.order || tasksLength + 1,
            status: task?.status || 'todo',
        }
        setTaskDetail('')
        upsert(newTask)
    }

    return (
        <Dialog
            isVisible={visible}
            overlayStyle ={styles.modal}
            onBackdropPress={close}
        >
            <TextInput style={styles.field} onChangeText={setTaskDetail} placeholder='Task' value={taskDetail} />
            <Pressable style={styles.add} onPress={onUpsert}>
                <Text style={styles.add.text}>{task?.id ? 'UPDATE' : 'ADD'}</Text>
            </Pressable>
        </Dialog>
        // <Modal
        //     animationType="slide"
        //     transparent={true}
        //     visible={visible}
        //     onRequestClose={close}
        //     style={styles.modal}
        // >
        //     <View style={styles.task}>
        //         <TextInput style={styles.field} placeholder='Task' />
        //         <Pressable>
        //             <Text>Add Task</Text>
        //         </Pressable>
        //     </View>
        // </Modal>
    )
}

export default Upsert

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#292d41',
        borderRadius: 22,
        padding: 25,
    },
    field: {
      backgroundColor: '#fff',
      borderRadius: 8,
      width: '100%',
      height: 40,
      lineHeight: 20,
      paddingHorizontal: 10,
    },
    add: {
      alignItems: 'center',
      alignSelf: 'flex-end',
      backgroundColor: '#34cfff',
      borderRadius: 8,
      justifyContent: 'center',
      padding: 8,
      marginTop: 20,
      width: 70,
      text: {
        color: '#fff'
      }
    }
})