# Features of the app 


1. synch notes with localstorage (we note gonna be saving any thing to the data base  but at least we will have a way to save our note between refreshes of the app so we will using browsers local storage )

2. instead of note1 or note2 will create note summary and add it as title 

3. modified notes will move to the top 
4. delete notes 



> if we try to get data from local storage that doesn't exist its gonna return null

> if we are try to json.parse undefined is gonna give us a syntax error 


when ever we working with things that React doesn't responsible of it we should use `useEffect`



## Lazy State initialization 

how we are initializa our state when we are pulling from *localStorage* ? of course what ever value we put in our react.useState  in the beginning is just an initial value  so really we know that it only set this value when the app first loads , after its load react will maintain any changing state internally behind the seen. how ever there is some thing we need to see and to illustrate this we'll write the code below and see how React is reacting on this
```jsx

const [state, setState] = React.useState(console.log("State initialization"))

// this console.log will run when ever state run 
```
Because the Nature of React any change of any another state in the component  will cause the entire component to reRender . 
if React in charge to saving the initiale state in the background then it may seem intuitive that is not gonna run this line , but if we add new note or change the text on any note  we'll see that it's run that code again  and that happen because React is reRender the entire component in the Background it is ignoring the state that it's try to Re-initialize above but if there is code such running `console.log` or getting things from `localStorage` it's going to run that code again **Even if it doesn't use the value as its new initiale state because its maintaing that state else where in the background*
these things can be expensive calls for the browser on every state change  and to solve it React implement a way to us to really  easily make that any expensive code that may be running inside of our state initialization can happen only one time and this is called *Lazy State Initializaiton*  and all what we instead of providing a value we'll provide a function that return a value 

```jsx
  const [state, setState] = React.useState(
        function() { 
            return console.log("State initialization")
        }
    )
```