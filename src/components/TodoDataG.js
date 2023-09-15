import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Paper, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneIcon from '@mui/icons-material/Done';
import CreateIcon from '@mui/icons-material/Create';
import TodoService from '../service';
import "../styles/App.scss"; // Import the CSS file

function TodoDataG() {
  const { register, handleSubmit, reset } = useForm();
  const [todoList, setTodoList] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskDescription, setEditedTaskDescription] = useState('');

  const columns = [
    { field: 'newId', headerName: 'A/A', width: 90 },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      width: 150,
      editable: true,
    },
    {
      field: 'completed',
      headerName: 'Completed',
      width: 250,
      renderCell: (params) =>
        params.value ? <CheckIcon style={{ color: 'green' }} /> : <CloseIcon style={{ color: 'white' }} />,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 350,
      sortable: false,
      renderCell: (params) => (
        <>
          {editingTaskId === params.row.id ? (
            <>
              <TextField
                value={editedTaskDescription}
                onChange={(e) => setEditedTaskDescription(e.target.value)}
              />
              <Button
                variant="contained"
                style={{ backgroundColor: 'green', color: 'white', marginRight: 4 }}
                onClick={() => handleSave(params.row.id)}
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
              {params.value}
              <Button
                variant ="contained"
                style={{ backgroundColor: 'blue', color: 'white', marginRight: 4 }}
                onClick={() => handleEdit(params.row.id, params.row.description)}
                endIcon={<CreateIcon/>} 
              >
                Edit
              </Button>
              <Button 
                variant="contained"
                style={{ backgroundColor: 'red', color: 'white', marginRight: 4 }}
                onClick={() => handleDelete(params.row.id)}
                endIcon={<DeleteForeverIcon/>} 
              >
                Delete
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: 'green', color: 'white' }}
                onClick={() => handleCompleted(params.row.id)}
                endIcon={<DoneIcon/>} 
              >
                Completed
              </Button>
            </>
          )}
        </>
      ),
    },
  ];

  const fetchTodos = () => {
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
        // Assign new IDs starting from 1 for rendering purposes
        const todosWithNewIds = json.content.map((item, index) => ({
          ...item,
          newId: index + 1,
        }));
        setTodoList(todosWithNewIds);
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
          reset(); // Clear the form
          fetchTodos();
          return resp.json();
        }
      });
  };

  //Edit todo
  const handleEdit = (taskId, taskDescription) => {
    setEditingTaskId(taskId);
    setEditedTaskDescription(taskDescription);
  };

  //description to not be empty
  const handleSave = (taskId) => {
    if (!editedTaskDescription) {
      console.error('Task description cannot be empty');
      return;
    }
    TodoService.putTodo(taskId, { description: editedTaskDescription })
      .then((response) => {
        if (response.status === 200) {
          setEditingTaskId(null);
          fetchTodos();
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
    fetchTodos(); // Clear the edited task description when canceling
  };
  

  const handleDelete = (taskId) => {
    TodoService.deleteTodo(taskId)
      .then((response) => {
        if (response.status === 200) {
          fetchTodos();
        } else {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  const handleCompleted = (taskId) => {
    TodoService.putTodo(taskId, { completed: true })
      .then((response) => {
        if (response.status === 200) {
          fetchTodos();
        } else {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error('Error marking task as completed:', error);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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
        <Paper style={{ height: 640, width: '100%' }}>
          <DataGrid
            rows={todoList}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
          />
        </Paper>
      </div>
    </div>
  );
}

export default TodoDataG;
