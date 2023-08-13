import { TasksStateType } from '../AppWithRedux';
import { TaskPriorities, TaskStatuses } from '../api/todoListAPI';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './tasksReducer'
import { AddTodoListActionType, TodoListDomainType, addTodoListAC, removeTodoListAC, todoListReducer } from './todoListsReducer'

let startState: TasksStateType;

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                startDate: '',
                todoListId: 'todolistId1',
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                startDate: '',
                todoListId: 'todolistId1',
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                startDate: '',
                todoListId: 'todolistId1',
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                startDate: '',
                todoListId: 'todolistId2',
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                startDate: '',
                todoListId: 'todolistId2',
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                description: '',
                order: 1,
                startDate: '',
                todoListId: 'todolistId2',
            }
        ]
    }
})


test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('todolistId2', '2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            { id: '1', title: 'CSS', status: TaskStatuses.New },
            { id: '2', title: 'JS', status: TaskStatuses.Completed },
            { id: '3', title: 'React', status: TaskStatuses.New }
        ],
        'todolistId2': [
            { id: '1', title: 'bread', status: TaskStatuses.New },
            { id: '3', title: 'tea', status: TaskStatuses.New }
        ]
    })
})
test('correct task should be added to correct array', () => {


    const action = addTaskAC('todolistId2', 'juce')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('todolistId2', '2', TaskStatuses.New)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})
test('Title of specified task should be changed', () => {

    const action = changeTaskTitleAC('todolistId2', '2', 'burger')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('burger')
})
test('new array should be added when new todolist is added', () => {
    
    const action = addTodoListAC('new todolist')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodoListDomainType> = []

    const action: AddTodoListActionType = addTodoListAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.newTodoListId)
    expect(idFromTodolists).toBe(action.newTodoListId)
})

test('property with todolistId should be deleted', () => {
    const action = removeTodoListAC('todolistId2')

    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})



