import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
    render(<ContactForm />);
});

test("renders the contact form header", () => {
    render(<ContactForm />);
    const header = screen.queryByText(/Contact Form/i);
    expect(header).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
    render(<ContactForm />);

    const fNameInput = screen.getByLabelText("First Name*");
    userEvent.type(fNameInput, "alex");

    const fNameError = await screen.findByText(
        /firstName must have at least 5 characters/i
    );
    expect(fNameError).toBeInTheDocument();
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
    render(<ContactForm />);

    const button = screen.getByRole("button");
    userEvent.click(button);

    const fNameError = await screen.findByText(
        /firstName must have at least 5 characters/i
    );
    expect(fNameError).toBeInTheDocument();

    const lNameError = await screen.findByText(/lastName is a required field/i);
    expect(lNameError).toBeInTheDocument();

    const emailError = await screen.findByText(
        /email must be a valid email address/i
    );
    expect(emailError).toBeInTheDocument();
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
    render(<ContactForm />);

    const fNameInput = screen.getByLabelText("First Name*");
    userEvent.type(fNameInput, "johnny");

    const lNameInput = screen.getByLabelText("Last Name*");
    userEvent.type(lNameInput, "bravo");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const emailError = await screen.findByText(
        /email must be a valid email address/i
    );
    expect(emailError).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText("Email*");
    userEvent.type(emailInput, "test");

    const emailError = await screen.findByText(
        /email must be a valid email address/i
    );
    expect(emailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    const button = screen.getByRole("button");
    userEvent.click(button);

    const lNameError = await screen.findByText(/lastName is a required field/i);
    expect(lNameError).toBeInTheDocument();
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
    render(<ContactForm />);

    const fNameInput = screen.getByLabelText("First Name*");
    userEvent.type(fNameInput, "johnny");

    const lNameInput = screen.getByLabelText("Last Name*");
    userEvent.type(lNameInput, "bravo");

    const emailInput = screen.getByLabelText("Email*");
    userEvent.type(emailInput, "test@test.com");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const fNameRender = await screen.findByText(/johnny/i);
    expect(fNameRender).toBeInTheDocument();

    const lNameRender = await screen.findByText(/bravo/i);
    expect(lNameRender).toBeInTheDocument();

    const emailRender = await screen.findByText(/test@test.com/i);
    expect(emailRender).toBeInTheDocument();

    const messageRender = screen.queryByTestId("messageDisplay");
    expect(messageRender).not.toBeInTheDocument();
});

test("renders all fields text when all fields are submitted.", async () => {
    render(<ContactForm />);

    const fNameInput = screen.getByLabelText("First Name*");
    userEvent.type(fNameInput, "johnny");

    const lNameInput = screen.getByLabelText("Last Name*");
    userEvent.type(lNameInput, "bravo");

    const emailInput = screen.getByLabelText("Email*");
    userEvent.type(emailInput, "test@test.com");

    const messageInput = screen.getByLabelText("Message");
    userEvent.type(messageInput, "test message");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const fNameRender = await screen.findByText(/johnny/i);
    expect(fNameRender).toBeInTheDocument();

    const lNameRender = await screen.findByText(/bravo/i);
    expect(lNameRender).toBeInTheDocument();

    const emailRender = await screen.findByText(/test@test.com/i);
    expect(emailRender).toBeInTheDocument();

    const messageRender = await screen.findByTestId("messageDisplay");
    expect(messageRender).toBeInTheDocument();
});
