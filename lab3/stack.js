/**
 * @class Stack - represents a stack from which actions can be pushed and popped
 * 
 * @member {Array<any>} actions - the array which holds all the actions that a user did
 * @member {HTMLElement} containerElement - the element which will show all the children of a stack
 * 
 * @note Because we add this at the global scope (not inside any function) this class will be 
 * available to any script defined below script.js in the HTML document that adds this script.
 */
class Stack {
    /**
     * @constructor
     * 
     * @param {HTMLElement} containerElement - the element which contains all children of this stack
     * @note You don't need to modify this function at all. Instead, it'll get called
     */
    constructor(containerElement) {
        this.actions = []
        this.containerElement = containerElement;
    }

    /**
     * @function push
     * @this {Stack}
     * 
     * @param {any} action - the action that's pushed and popped from the stack
     * @returns {void}
     * 
     * @note You should write out the two things that happen when you click on a button. 
     * Ask the TA's to demo to you, but try to break it down on your own. 
     * 
     * // TASK 1D: Write a description of what happens in this function
     * @description This function pushes the passed action onto the stack
     * 
     */
    push(action) {
        this.actions.push(action)
        return;
    }

    /**
     * @function pop
     * @this {Stack}
     * 
     * @returns {Action | undefined} - undefined if the size is 0
     * 
     * // TASK 1E: Write a description of what happens in this function
     * @description This function returns the element present at the top of the stack and then removes it.
     * 
     */
    pop() {
        if (this.size() === 0)
            return undefined;
        return this.actions.pop();  
    }

    /**
     * @function size
     * @this {Stack}
     * 
     * @returns {Number} - number of actions in the stack
     */
    size() {
        return this.actions.length;
    }
}