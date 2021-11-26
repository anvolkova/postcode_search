import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act, Simulate} from "react-dom/test-utils";
import App from './App';

let container = null;
let postcodeInput = null;
let suburbInput = null;
let stateInput = null;
let form = null;
let validationMessage = null;

const fakeLocalities = {
  "localities" : {
    "locality" : [
      {
        "category" : "Delivery Area",
        "id" : 536,
        "latitude" : -33.88242147,
        "location" : "LEICHHARDT",
        "longitude" : 151.1547543,
        "postcode" : 2040,
        "state" : "NSW"
      },
      {
        "category" : "Delivery Area",
        "id" : 537,
        "latitude" : -33.87108761,
        "location" : "LILYFIELD",
        "longitude" : 151.1611676,
        "postcode" : 2040,
        "state" : "NSW"
      }
    ]
  }
};

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);

  act(() => { render(<App />, container); });
  postcodeInput = container.querySelector('#postcode');
  suburbInput = container.querySelector('#suburb');
  stateInput = container.querySelector('#state');
  form = container.querySelector('form');
  validationMessage = container.querySelector('div[name="validation-message"]');
  expect(form).toBeInTheDocument();
  expect(postcodeInput).toBeInTheDocument();
  expect(suburbInput).toBeInTheDocument();
  expect(stateInput).toBeInTheDocument();
  expect(validationMessage).toBeInTheDocument();
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

async function enterAndSubmit(postcode, suburb, state) {
  Simulate.change(postcodeInput, {target : {value : postcode}});
  Simulate.change(suburbInput, {target : {value : suburb}});
  Simulate.change(stateInput, {target : {value : state}});
  await act(async () => { Simulate.submit(form); });
}

it('invalid postcode is reported', async () => {
  await enterAndSubmit('204', 'Leichhardt', 'NSW');

  expect(validationMessage.textContent).toBe("Please enter 4-digit postcode");
});

it('valid data', async () => {
  jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({
    json : () => Promise.resolve(fakeLocalities)
  }));

  await enterAndSubmit('2040', 'Leichhardt', 'NSW');

  expect(validationMessage.textContent)
      .toBe("The postcode, suburb and state entered are valid");
});

it('wrong postcode', async () => {
  const noLocalities = {"localities" : ""};
  jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({
    json : () => Promise.resolve(noLocalities)
  }));

  await enterAndSubmit('7777', 'Leichhardt', 'NSW');

  expect(validationMessage.textContent)
      .toBe("The postcode 7777 does not match the suburb Leichhardt");
});

it('wrong state', async () => {
  jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({
    json : () => Promise.resolve(fakeLocalities)
  }));

  await enterAndSubmit('2040', 'Leichhardt', 'TAS');

  expect(validationMessage.textContent)
      .toBe(
          "The suburb Leichhardt with postcode 2040 does not exist in the state TAS");
});
