import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import DeleteIcon from '../icon/delete.png';
import EditIcon from '../icon/edit.png';
import TickIcon from '../icon/tick.png';
import useSWR from 'swr';
import { CircleUserRound, Plus, Check, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const fetcher = (url, options = {}) =>
  fetch(url, {
    method: options.method || 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
    body: options.body ? JSON.stringify(options.body) : undefined,
  }).then((res) => res.json());

const Todos = () => {
  const { data, error, mutate, isLoading } = useSWR('https://todo-mern-j4xc.onrender.com/api/todos', fetcher);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const navigate = useNavigate();

  if (error) return <h1 className='text-2xl py-2 text-center'>Something went wrong</h1>;
  if (isLoading) return <h1 className='text-2xl py-2 text-center'>Loading ...</h1>;

  function handleError(error) {
    toast.error(error);
    throw new Error(error);
  }

  const handleLogout = async () => {
    try {
      await fetch('https://todo-mern-j4xc.onrender.com/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  async function handleAddTodo(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    if (!title.trim().length) {
      toast.error("Todo can't be empty!");
      return;
    }

    const newTodo = {
      title: `${title} adding...`,
      _id: Date.now().toString(),
      isCompleted: false,
    };

    async function addTodo() {
      const response = await fetcher('https://todo-mern-j4xc.onrender.com/api/todos', {
        method: 'POST',
        body: { title },
      });
      if (response.error) {
        handleError(response.error);
      }
      return [...data, response];
    }

    await mutate(addTodo, {
      optimisticData: [...data, newTodo],
      revalidate: true,
      rollbackOnError: true,
    });

    e.target.reset();
  }

  const handleDelete = async (id) => {
    const updatedTodos = data.filter((todo) => todo._id !== id);
    await mutate(
      async () => {
        const res = await fetcher(`https://todo-mern-j4xc.onrender.com/api/todos/${id}`, {
          method: 'DELETE',
        });
        if (res.error) handleError(res.error);
        return updatedTodos;
      },
      {
        optimisticData: updatedTodos,
        rollbackOnError: true,
      }
    );
  };

  const handleToggleComplete = async (todo) => {
    const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
    const updatedTodos = data.map((t) => (t._id === todo._id ? updatedTodo : t));
    await mutate(
      async () => {
        const res = await fetcher(`https://todo-mern-j4xc.onrender.com/api/todos/${todo._id}`, {
          method: 'PUT',
          body: { isCompleted: updatedTodo.isCompleted },
        });
        if (res.error) handleError(res.error);
        return updatedTodos;
      },
      {
        optimisticData: updatedTodos,
        rollbackOnError: true,
      }
    );
  };

  const handleEdit = (todo) => {
    setEditTodoId(todo._id);
    setEditTitle(todo.title);
  };

  const handleEditSubmit = async (id) => {
    if (!editTitle.trim().length) {
      toast.error("Title can't be empty");
      return;
    }

    try {
      const res = await fetch(`https://todo-mern-j4xc.onrender.com/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ title: editTitle }),
      });

      const response = await res.json();
      if (!res.ok || response.error) {
        handleError(response.error || "Update failed");
        return;
      }

      mutate();
      setEditTodoId(null);
      setEditTitle('');
      toast.success("Todo updated");
    } catch (err) {
      handleError("Something went wrong while updating");
    }
  };

  return (
    <div className='mx-auto mt-20 max-w-lg px-4 w-full flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <CircleUserRound className='w-10 h-10 text-primary' />
        <button
          onClick={handleLogout}
          className='text-sm flex items-center gap-1 border border-gray-300 px-2 py-1 rounded hover:bg-gray-100 transition'
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      <h1 className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-bold text-4xl text-center mb-4 text-transparent bg-clip-text'>Todo App</h1>

      <form onSubmit={handleAddTodo} className='flex gap-4 items-center'>
        <input type='text' placeholder='Enter todo' name='title' id='title' required className='shadow-md px-3 py-2 rounded border border-gray-300 w-full' />
        <button className='h-9 rounded-md border border-input bg-transparent px-4 text-base shadow-md flex items-center hover:bg-primary transition ease-linear'>
          <Plus size={20} />
        </button>
      </form>

      {data?.length ? (
        <div className='shadow-md border border-input bg-transparent flex flex-col rounded'>
          {data.map((todo, index) => (
            <div key={todo._id || index} className={`flex h-auto py-2 px-2 items-center justify-between w-full ${index === data.length - 1 ? '' : 'border-b'}`}>
              {editTodoId === todo._id ? (
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className='flex-1 px-3 border border-gray-300 rounded py-1 mr-2'
                />
              ) : (
                <span className={`flex-1 px-3 break-words text-sm ${todo.isCompleted ? 'line-through text-gray-500' : ''}`}>{todo.title}</span>
              )}
              <div className='flex gap-2'>
                {editTodoId === todo._id ? (
                  <Check onClick={() => handleEditSubmit(todo._id)} className='w-5 h-5 cursor-pointer text-green-600' />
                ) : (
                  <img src={TickIcon} alt='Complete' onClick={() => handleToggleComplete(todo)} className='w-5 h-5 cursor-pointer' />
                )}
                <img src={EditIcon} alt='Edit' onClick={() => handleEdit(todo)} className='w-5 h-5 cursor-pointer' />
                <img src={DeleteIcon} alt='Delete' onClick={() => handleDelete(todo._id)} className='w-5 h-5 cursor-pointer' />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span className='text-center text-gray-500'>You don't have any todos</span>
      )}
    </div>
  );
};

export default Todos;
