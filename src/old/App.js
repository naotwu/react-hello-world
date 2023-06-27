// テストを先に書いて、アプリケーションとテストを修正したバージョン
import React, { useState, useEffect } from 'react';

// 新しいタスクを追加する関数
export const addTask = (tasks, newTaskTitle) => {
  if (newTaskTitle) {
    return [...tasks, { id: Date.now(), title: newTaskTitle, completed: false }];
  }
  return tasks;
};

// タスクの編集内容を更新する関数
export const editTask = (tasks, taskId, newTitle) => {
  return tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, title: newTitle };
    }
    return task;
  });
};

// タスクの完了状態を切り替える関数
export const toggleTaskCompletion = (tasks, taskId) => {
  return tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
};

// タスクを削除する関数
export const deleteTask = (tasks, taskId) => {
  return tasks.filter((task) => task.id !== taskId);
};

function App() {

  const [tasks, setTasks] = useState([]); // タスクのリストを管理するステート
  const [newTask, setNewTask] = useState(''); // 新しいタスクの入力値を管理するステート

  // 新しいタスクを追加する
  const handleAddTask = () => {
    if (newTask) {
      setTasks(addTask(tasks, newTask));
      setNewTask('');
    }
  };

  // タスクの編集内容を更新
  const handleEditTask = (taskId, newTitle) => {
    setTasks(editTask(tasks, taskId, newTitle));
  };

  // タスクの完了状態切り替え
  const handleToggleTaskCompletion = (taskId) => {
    setTasks(toggleTaskCompletion(tasks, taskId));
  };

  // タスクを削除する
  const handleDeleteTask = (taskId) => {
    setTasks(deleteTask(tasks, taskId));
  };

  // tasksが更新されたときにコンソールに出力する
  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <div>
      <h1>TODOアプリ</h1>

      {/* タスクの追加フォーム */}
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>追加</button>
      </div>

      {/* タスクの表示 */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTaskCompletion(task.id)}
            />
            {task.completed ? <del>{task.title}</del> : task.title}
            <button onClick={() => handleDeleteTask(task.id)}>削除</button>
            <button onClick={() => handleEditTask(task.id, prompt('新しいタスクの内容', task.title))}>編集</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
