import { TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType } from "../../api/todoListAPI";
import { TasksStateType } from "../../app/AppWithRedux";
import { addTaskAC, removeTaskAC, tasksReducer, updateTaskAC } from "./tasksReducer";
import { TodoListDomainType, addTodoListAC, removeTodoListAC, todoListReducer } from "./todoListsReducer";

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

    const task: TaskType = {
        id: '1',
        title: 'juce',
        description: '',
        todoListId: '21',
        order: 0,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        addedDate: '',
    }

    const action = addTaskAC('todolistId2', task)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
test('status of specified task should be changed', () => {
    const task: UpdateTaskModelType = {
        deadline: '',
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        title: 'Title',
        status: TaskStatuses.Completed,
    }
    const action = updateTaskAC('todolistId2', '2', task)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed)
})
test('Title of specified task should be changed', () => {
    const task: UpdateTaskModelType = {
        deadline: '',
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        title: 'Title',
        status: TaskStatuses.Completed,
    }
    const action = updateTaskAC('todolistId2', '2', task)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('Title')
})
test('new array should be added when new todolist is added', () => {
    const newTodoList: TodoListDomainType = {
        title: 'Hi',
        id: '28',
        filter: 'all',
        order: 0,
        addedDate: '',
        entityStatus: 'idle'
    }
    const action = addTodoListAC(newTodoList)

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
    const newTodoList: TodoListDomainType = {
        title: 'Hi',
        id: '28',
        filter: 'all',
        order: 0,
        addedDate: '',
        entityStatus: 'idle'
    }
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodoListDomainType> = []

    const action = addTodoListAC(newTodoList)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todoList.id)
    expect(idFromTodolists).toBe(action.todoList.id)
})

test('property with todolistId should be deleted', () => {
    const action = removeTodoListAC('todolistId2')

    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})



