# Postcode Search App

### User Story

We have an online form that accepts a postcode, suburb and state. 
When the user submits the form, it should check the inputs with the Australia Post API to validate that it is a
valid address.

### Technical description
`App.js` contains the main logic (fetch API, check data and set validation messages)

`SearchForm.js` contains the form fields

`App.test.js` contains tests covering basic scenarios with validation messages

`index.css`, `App.css` contain styles for the page

### How to run and test

Download the repository.
In the project directory, you can run:
 `npm start`.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Enter inputs for testing:
1) wrong input `abc` or `11` into `Postcode` field (message: `Please enter 4-digit postcode`)
2) empty blank `Postcode` field (message: `Please enter a postcode`)
3) epmty blank `Suburb` field (message: `Please enter a suburb name`)
4) `Choose a state` for `State` field (message: `Please enter a state`)
5) enter `2040` `Haberfield` `NSW` (message: `The postcode 2040 does not match the suburb Haberfield` )
6) enter `2045` `Haberfield` `VIC` (message: `The suburb Haberfield with postcode 2045 does not exist in the state VIC`)
7) enter `2045` `Haberfield` `NSW` (message: `The postcode, suburb and state entered are valid`)
8) Anything else you want to break the code :) 

If you do not have these messages, the browser blocks your requests to Au Post server. You should allow CORS for your browser by downloading extension suitable for your browser.

Run `npm test` to check if tests are passed.
