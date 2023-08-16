import { v1 } from "uuid"
import { FilterValuesType, TodoListDomainType, addTodoListAC, removeTodoListAC, todoListReducer } from "./todoListsReducer";



let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListDomainType>;

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {
            id: todolistId1,
            title: 'Tasks',
            filter: 'all',
            addedDate: '',
            order: 0
        },
        {
            id: todolistId2,
            title: 'Shopping List',
            filter: 'all',
            addedDate: '',
            order: 0
        },
    ]
})

test('Todolist should be removed', () => {
    const endState = todoListReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('Shopping List')

})

test('Todolist should be added', () => {
    const newTodoList: TodoListDomainType = {
        title: 'Hi',
        id: '28',
        filter: 'all',
        order: 0,
        addedDate: ''
    } 
    const endState = todoListReducer(startState, addTodoListAC(newTodoList))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('Hi')
    expect(endState[1].id).toBe(todolistId1)

})

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'What to learn'
    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        todoListId: todolistId2,
        newTitle: newTodolistTitle
    }

    const endState = todoListReducer(startState, action)

    expect(endState[0].title).toBe('Tasks')
    expect(endState[1].title).toBe(newTodolistTitle)
})
test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed'

    const action = {
        type: 'CHANGE-FILTER' as const,
        todoListId: todolistId2,
        value: newFilter
    }

    const endState = todoListReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
