import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('add a task', () => {
    // レンダリング
    const { getByText, getByRole } = render(<App />);
    
    // 追加フォームの要素を取得
    const input = getByRole('textbox');
    const addButton = getByText('追加');

    // タスクを入力して追加ボタンをクリック
    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(addButton);

    // 追加されたタスクが表示されていることを確認
    expect(getByText('Task 1')).toBeInTheDocument();
  });

  test('completes a task', () => {
    // レンダリング
    const { getByText, getByRole } = render(<App />);

    // タスクを追加
    const input = getByRole('textbox');
    const addButton = getByText('追加');
    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(addButton);

    // タスクのチェックボックスをクリックして完了状態を切り替え
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);

    // タスクが完了済みで表示されていることを確認
    const completedTask = getByText('Task 1');
    expect(completedTask).toBeInTheDocument();
    expect(completedTask.tagName).toBe('DEL');
  });

  test('deletes a task', () => {
    // レンダリング
    const { getByText, getByRole, queryByText } = render(<App />);

    // タスクを追加
    const input = getByRole('textbox');
    const addButton = getByText('追加');
    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(addButton);

    // タスクを削除
    const deleteButton = getByText('削除');
    fireEvent.click(deleteButton);

    // タスクがリストから削除されていることを確認
    expect(queryByText('Task 1')).toBeNull();
  });

  test('edit a task', async () => {
    const { getByText, getByRole, getByDisplayValue } = render(<App />);
    
    // 追加フォームの要素を取得
    const input = getByRole('textbox');
    const addButton = getByText('追加');

    // タスクを入力して追加ボタンをクリック
    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(addButton);

    // タスクの編集を開始
    const editButton = getByText('編集');
    fireEvent.click(editButton);
    
    // 編集フィールドを取得
    const editField = getByDisplayValue('Task 1');
    
    // フィールドに新しいタスクのタイトルを入力
    fireEvent.change(editField, { target: { value: '新しいタスクの内容' } });
  
    // 編集を完了
    fireEvent.click(getByText('完了'));
    
    // 編集後のタスクのタイトルが表示されていることを確認
    expect(getByText('新しいタスクの内容')).toBeInTheDocument();
});


});
