import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  TableSortLabel,
} from '@mui/material';
import TodoService from '../service';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneIcon from '@mui/icons-material/Done';


function SimpleTodo() {
  const { register, handleSubmit } = useForm();
  const [todo, setTodolist] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskDescription, setEditedTaskDescription] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;
  const [sortOrder, setSortOrder] = useState('asc'); // State to track sorting order

  // Fetch Todos from the server
  const fetchToDos = () => {
    TodoService.getTodo({
      pageRequestDto: {
        pageNo: 0,
        pageSize: 0,
        sort: [],
      },
    })
      .then((resp) => {
        if (resp.status === 400) throw 'BadRequest';
        if (resp.status === 401) throw 'Unauthorized';
        if (resp.status === 500) throw 'InternalServer';
        if (resp.status === 200) return resp.json();
      })
      .then((json) => {
        console.log('All the list from db:', json);
        setTodolist(json.content);
      })
      .catch((error) => {
        if (error === 'BadRequest') console.log(error);
        if (error === 'Unauthorized') {
          console.log(error);
        }
        if (error === 'InternalServer') {
          return;
        }
      });
  };

  // Add todo
  const onSubmit = (data) => {
    TodoService.postTodo({
      completed: false,
      ...data,
    })
      .then((resp) => {
        if (resp.status === 400) {
          return resp.json().then((json) => {
            throw json.errorMessage;
          });
        }
        if (resp.status === 401) throw 'Unauthorized';
        if (resp.status === 500) throw 'InternalServer';
        if (resp.status === 200) {
          fetchToDos();
          return resp.json();
        }
      });
  };

  // Edit todo
  const handleEdit = (taskId, taskDescription) => {
    setEditingTaskId(taskId);
    setEditedTaskDescription(taskDescription);
  };

  // Description should not be empty
  const handleSave = (taskId) => {
    if (!editedTaskDescription) {
      console.error('Task description cannot be empty');
      return;
    }
    TodoService.putTodo(taskId, { description: editedTaskDescription })
      .then((response) => {
        if (response.status === 200) {
          setEditingTaskId(null);
          fetchToDos();
        } else {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error('Error updating task description:', error);
      });
  };

  const handleCancel = () => {
    setEditingTaskId(null);
    setEditedTaskDescription('');
  };

  // Delete todo
  const handleDelete = (taskId) => {
    TodoService.deleteTodo(taskId)
      .then((response) => {
        if (response.status === 200) {
          fetchToDos();
        } else {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  // Mark task as completed
  const handleCompleted = (taskId) => {
    TodoService.putTodo(taskId, { completed: true })
      .then((response) => {
        if (response.status === 200) {
          fetchToDos();
        } else {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error('Error marking task as completed:', error);
      });
  };

  useEffect(() => {
    fetchToDos();
  }, []);

  // Calculate displayed ID
  function calculateDisplayedId(index) {
    return index + 1 + currentPage * itemsPerPage;
  }

  // Sort Todos by completion status
  const handleSortCompleted = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sortedTodo = [...todo].sort((a, b) => {
      if (a.completed && !b.completed) {
        return newSortOrder === 'asc' ? -1 : 1;
      } else if (!a.completed && b.completed) {
        return newSortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setTodolist(sortedTodo);
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          component="div"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="filled-multiline-static"
              label="To Do List"
              {...register('description', { required: true, minLength: 1 })}
              placeholder="To do..."
              variant="filled"
            />
            <Button type="submit" variant="contained" endIcon={<AddIcon />} style={{ top: '17px' }}>
              Add
            </Button>
          </div>
        </Box>
      </form>
      <div className="dj">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={true}
                    direction={sortOrder}
                    onClick={handleSortCompleted}
                  >
                    Completed
                  </TableSortLabel>
                </TableCell>
                <TableCell style={{ width: '360px' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todo
                .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                .map((task, index) => (
                  <TableRow key={task.id}>
                    <TableCell style={{ width: task.id <= 99 ? '50px' : '100px' }}>
                      {calculateDisplayedId(index)}
                    </TableCell>
                    <TableCell>
                      {editingTaskId === task.id ? (
                        <TextField
                          value={editedTaskDescription}
                          onChange={(e) => setEditedTaskDescription(e.target.value)}
                        />
                      ) : (
                        task.description
                      )}
                    </TableCell>
                    <TableCell>
                      {task.completed ? (
                        <CheckIcon style={{ color: 'green' }} />
                      ) : (
                        <CloseIcon style={{ color: 'white' }} />
                      )}
                    </TableCell>
                    <TableCell>
                      {editingTaskId === task.id ? (
                        <>
                          <Button
                            variant="contained"
                            style={{ backgroundColor: 'green', color: 'white' }}
                            onClick={() => handleSave(task.id)}
                          >
                            Save
                          </Button>
                          <Button
                            variant="contained"
                            style={{ backgroundColor: 'red', color: 'white' }}
                            onClick={handleCancel}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            style={{ backgroundColor: 'blue', color: 'white', marginRight: '3px' }}
                            onClick={() => handleEdit(task.id, task.description)}endIcon={<CreateIcon/>} 
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            style={{ backgroundColor: 'red', color: 'white', marginRight: '3px' }}
                            onClick={() => handleDelete(task.id)}
                            endIcon={<DeleteForeverIcon/>} 
                          >
                            Delete
                          </Button>
                          <Button
                            variant="contained"
                            style={{ backgroundColor: 'green', color: 'white', marginRight: '3px' }}
                            onClick={() => handleCompleted(task.id)}
                            endIcon={<DoneIcon/>} 
                          >
                            Completed
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="pagination">
          <Button
            variant="contained"
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            disabled={(currentPage + 1) * itemsPerPage >= todo.length}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SimpleTodo;
