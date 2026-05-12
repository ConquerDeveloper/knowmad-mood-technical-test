import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App', () => {
    it('renders the initial items', () => {
        render(<App />);

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        expect(screen.getByText('Item 3')).toBeInTheDocument();
        expect(screen.getByText('Item 4')).toBeInTheDocument();
    });

    it('adds a new item from the modal', async () => {
        const user = userEvent.setup();

        render(<App />);

        const addButtons = screen.getAllByRole('button', { name: 'ADD' });

        await user.click(addButtons[0]);

        const input = screen.getByPlaceholderText('Type the text here...');
        await user.type(input, 'New test item');

        await user.click(screen.getAllByRole('button', { name: 'ADD' })[1]);

        expect(screen.getByText('New test item')).toBeInTheDocument();
    });

    it('does not add empty items', async () => {
        const user = userEvent.setup();

        render(<App />);

        await user.click(screen.getAllByRole('button', { name: 'ADD' })[0]);

        const modalAddButton = screen.getAllByRole('button', { name: 'ADD' })[1];

        expect(modalAddButton).toBeDisabled();

        await user.type(screen.getByPlaceholderText('Type the text here...'), '   ');

        expect(modalAddButton).toBeDisabled();
    });

    it('deletes selected items', async () => {
        const user = userEvent.setup();

        render(<App />);

        await user.click(screen.getByText('Item 1'));
        await user.click(screen.getByRole('button', { name: 'DELETE' }));

        expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    });

    it('deletes an item with double click', async () => {
        const user = userEvent.setup();

        render(<App />);

        await user.dblClick(screen.getByText('Item 3'));

        expect(screen.queryByText('Item 3')).not.toBeInTheDocument();
    });

    it('undoes the last change', async () => {
        const user = userEvent.setup();

        render(<App />);

        await user.dblClick(screen.getByText('Item 4'));

        expect(screen.queryByText('Item 4')).not.toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Undo last action' }));

        expect(screen.getByText('Item 4')).toBeInTheDocument();
    });
});