// テストを先に書いて、アプリケーションとテストを修正したバージョン
// テスト対象のコンポーネントや関数をインポートする
import { addTask, toggleTaskCompletion, editTask, deleteTask } from './App';

// タスク管理に関するテスト
describe('TODOアプリ 基本操作', () => {
  let tasks = [];

  beforeEach(() => {
    // テストの前にタスクリストを初期化する
    tasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: false },
      { id: 3, title: 'Task 3', completed: true },
    ];
  });

  // タスクの追加
  describe('addTask', () => {
    test('新しいタスクがリストに追加されること', () => {
      const newTask = 'Task 4';
      const updatedTasks = addTask(tasks, newTask);
      
      expect(updatedTasks).toHaveLength(4);
      expect(updatedTasks[3].title).toBe(newTask);
    });
  });

  // タスクの編集
  describe('editTask', () => {
    test('指定したタスクのタイトルが変更されること', () => {
      const taskId = 2;
      const newTitle = 'Updated Task';
      const updatedTasks = editTask(tasks, taskId, newTitle);
      
      expect(updatedTasks[1].title).toBe(newTitle);
    });

    test('タスクが存在しない場合、変更はないこと', () => {
      const taskId = 5;
      const newTitle = 'Updated Task';
      const updatedTasks = editTask(tasks, taskId, newTitle);
      
      expect(updatedTasks).toEqual(tasks);
    });
  });

  // タスクの完了、未完了の切り替え
  describe('toggleTaskCompletion', () => {
    test('指定したタスクが完了状態になること', () => {
      const taskId = 1;
      const updatedTasks = toggleTaskCompletion(tasks, taskId);
      
      expect(updatedTasks[0].completed).toBe(true);
    });

    test('タスクが存在しない場合、変更はないこと', () => {
      const taskId = 5;
      const updatedTasks = toggleTaskCompletion(tasks, taskId);
      
      expect(updatedTasks).toEqual(tasks);
    });
  });

  // タスクの削除
  describe('deleteTask', () => {
    test('指定したタスクがリストから削除されること', () => {
      const taskId = 1;
      const updatedTasks = deleteTask(tasks, taskId);
      
      expect(updatedTasks).toHaveLength(2);
      expect(updatedTasks).not.toContainEqual(tasks[0]);
    });

    test('タスクが存在しない場合、変更はないこと', () => {
      const taskId = 5;
      const updatedTasks = deleteTask(tasks, taskId);
      
      expect(updatedTasks).toEqual(tasks);
    });
  });
});
