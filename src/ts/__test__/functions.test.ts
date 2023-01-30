/**
 *@jest-environment jsdom
*/
import * as functions from "../functions";
import { Todo } from "../models/Todo";


describe("addTodo", () => {
    test("should add new todo", () => {
        //Arrange
        let todo : Todo[] = [];
        let todoText = "text";
        let listLength = todo.length;

        //Act
        functions.addTodo(todoText, todo)

        //Assert
        expect(todo.length).toBe(listLength +1);
        expect(todo[todo.length -1].text).toBe("text");
    })

    test("Should not add a new todo", () => {
         //Arrange
         let todo : Todo[] = [];
         let todoText = "aa";
         let listLength = todo.length;
 
         //Act
         functions.addTodo(todoText, todo)

         //Assert
         expect(todo.length).toBe(listLength);
    })
})


test("Should change todo", () => {
    const todo = new Todo("text", false);

    functions.changeTodo(todo);

    expect(todo.done).toBe(true);
})


test("Should remove all todos", () => {
    //Arrange
    let todoList:Todo[] = [
        {text: "text", done: true}
    ];

    //Act
    functions.removeAllTodos(todoList);

    //Assert
    expect(todoList.length).toBe(0);
})