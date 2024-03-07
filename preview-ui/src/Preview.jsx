import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function TodoListPage() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy groceries', completed: false },
    { id: 2, text: 'Walk the dog', completed: true },
    { id: 3, text: 'Read a book', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;
    const newTodoItem = {
      id: todos.length + 1,
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white p-4 shadow-md">
        <h1 className="text-xl font-semibold">Todo List</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <Card>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <Input
                placeholder="Add new todo"
                value={newTodo}
                onChange={handleNewTodoChange}
              />
              <Button onClick={handleAddTodo}>Add</Button>
            </div>
            {todos.length === 0 ? (
              <Alert>
                <AlertTitle>No todos!</AlertTitle>
                <AlertDescription>
                  You have completed all your tasks. Enjoy your free time!
                </AlertDescription>
              </Alert>
            ) : (
              <ul className="space-y-2">
                {todos.map((todo) => (
                  <li key={todo.id} className="flex items-center gap-2">
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id)}
                    />
                    <Label
                      className={`flex-1 ${todo.completed ? 'line-through' : ''}`}
                    >
                      {todo.text}
                    </Label>
                    <Button variant="outline" onClick={() => handleDeleteTodo(todo.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </main>
      <footer className="bg-white p-4 shadow-md">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Todo List App
        </p>
      </footer>
    </div>
  );
}