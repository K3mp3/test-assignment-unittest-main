/**
 *@jest-environment jsdom
*/

import { createNewTodo, displayError } from "../main";
import * as functions from "../functions";
import * as main from "../main";
import { Todo } from "../models/Todo";
import { IAddResponse } from "../models/IAddResult";

beforeEach( () => {
    document.body.innerHTML = "";
})


describe("createNewTodo", () => {
    test("Should call function createHTML", () => {
        //Arrange
        const todoText = "hej";
        let todos : Todo[] = [];
        let spyOnCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue()
    
        //Act
        main.createNewTodo(todoText, todos);
    
        //Assert
    
        expect(spyOnCreateHtml).toHaveBeenCalled();
        expect(spyOnCreateHtml).toBeCalledTimes(1);
        spyOnCreateHtml.mockRestore();
    })

    test("Should call function displayError", () => {
        //Arrange
        const todoText = "aa";
        let todos : Todo[] = [];
        let spyOnDisplayError = jest.spyOn(main, "displayError").mockReturnValue()
    
        //Act
        main.createNewTodo(todoText, todos);
    
        //Assert
        expect(spyOnDisplayError).toHaveBeenCalled();
        expect(spyOnDisplayError).toBeCalledTimes(1);
        spyOnDisplayError.mockRestore();
    })
})


describe("createHtml", () => {
    test("Should create Li elements", () => {
        //Arrange 
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
        let todos: Todo[] = [
            {text: "hej", done: false}
        ]
        let newLiElement = `<li class="todo__text">hej</li>`;

        //Act
        main.createHtml(todos);
        let htmlResult = document.querySelector(".todo")?.innerHTML;

        //Assert
        expect(htmlResult).toEqual(newLiElement);
    })

    test("Should add class todo__text--done", () => {
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
        let todos: Todo[] = [
            {text: "hej", done: true}
        ]
        
        main.createHtml(todos);

        let htmlResult = document.querySelector(".todo")?.innerHTML;
        let htmlClass = document.querySelector(".todo")?.firstElementChild;
        let li = "todo__text--done";

        expect(htmlResult).toContain(li);
        expect(htmlClass?.classList.contains(li)).toBeTruthy;
    })
})


describe("toggleTodo", () => {
    test("Should call function changeTodo", () => {
        //Arrange
        let todo = new Todo("Gå till gymmet", true)

        let spyOnChangeTodo = jest.spyOn(main, "toggleTodo").mockReturnValue()

        //Act
        main.toggleTodo(todo);

        //Assert
        expect(spyOnChangeTodo).toHaveBeenCalled();
        expect(spyOnChangeTodo).toBeCalledTimes(1);
        spyOnChangeTodo.mockRestore();
    })

    test("Should call function createHtml", () => {
        //Arrange
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;

        let todo = new Todo("Gå till affären", true)

        let spyOnCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue()

        //Act
        main.toggleTodo(todo);

        //Assert
        expect(spyOnCreateHtml).toHaveBeenCalled();
        expect(spyOnCreateHtml).toBeCalledTimes(1);
    })
})


describe("Should add or remove css class to div depending on argument value", () => {
    test("Should read HTML div element", () => {
        //Arrange
        let errorText = "error msg";
        document.body.innerHTML = `ul class="todosContainer"></ul>
        <div id="error" class="error"></div>`;
    
        //Act
        main.displayError(errorText, true);
    
        //Assert
        let result = (document.getElementById("error")?.innerHTML);
        expect(result).toBe(errorText);
    })
    
    
    test("Should add class if argument is true", () => {
        //Arange
        let errorText = "error msg";
        let show = true;
        document.body.innerHTML = `<div id="error" class="error"></div>`;

        //Act
        main.displayError(errorText, show);

        //Assert
        let result = document.getElementById("error") as HTMLDivElement;
        expect(result.classList.contains("show")).toBe(show);
    })

    test("Should remove class if argument is false", () => {
        //Arrange
        let errorText = "An error has occurd";
        document.body.innerHTML = `<div id="error" class="error"></div>`;

        //Act
        main.displayError(errorText, false);

        //Assert
        let result = document.getElementById("error") as HTMLDivElement;
        expect(result.classList.contains("show")).toBe(false);
    })
})


describe("Testing if the function clearTodos calls its functions correctly", () => {
    test("Should call function removeAllTodos properly", () => {
        //Arrange
        let spyOnRemoveAllTodos = jest.spyOn(functions, "removeAllTodos").mockReturnValue();
        let spyOnCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue()

        //Act
        main.clearTodos([]);

        //Assert
        expect(spyOnRemoveAllTodos).toHaveBeenCalled();
        spyOnCreateHtml.mockRestore();
    })

    test("Should call function createHtml properly", () => {
        //Arrange
        let spyOnCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue()

        //Act
        main.clearTodos([])

        //Assert
        expect(spyOnCreateHtml).toHaveBeenCalled();
   }) 
})