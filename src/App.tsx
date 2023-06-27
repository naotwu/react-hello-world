import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);         // タスクのリストを管理するステート
  const [newTask, setNewTask] = useState('');     // 新しいタスクの入力値を管理するステート
  const [editId, setEditId] = useState(null);     // 編集中のタスクIDを管理するステート
  const [editTitle, setEditTitle] = useState(''); // 編集中のタスクのタイトルを管理するステート

  // 新しいタスクを追加する関数
  const addTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks, { id: Date.now(), title: newTask, completed: false }];
      setTasks(updatedTasks);
      setNewTask('');
    }
  };

  // タスクの完了状態を切り替える関数
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // タスクを削除する関数
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // タスクの編集内容を更新する関数
  const editTask = (taskId, newTitle) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, title: newTitle };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const startEditTask = (taskId, currentTitle) => {
    setEditId(taskId);
    setEditTitle(currentTitle);
  };

  const endEditTask = () => {
    if (editTitle.trim() !== '') {
      editTask(editId, editTitle);
    }
    setEditId(null);
    setEditTitle('');
  };

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
        <button onClick={addTask}>追加</button>
      </div>

      {/* タスクの表示 */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            {task.id === editId ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={endEditTask}>完了</button>
              </>
            ) : task.completed ? <del>{task.title}</del> : task.title}
            <button onClick={() => deleteTask(task.id)}>削除</button>
            <button onClick={() => startEditTask(task.id, task.title)}>編集</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
