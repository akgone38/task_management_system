import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTaskDetails, updateTaskDetails, addComment, editComment } from '../api/taskApi';
import { getUserDetails,getAllUsers } from '../api/userApi';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Box,
    Divider,
    List,
    ListItem,
    ListItemText,
    IconButton,
    MenuItem,
    Select
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const TaskDetails: React.FC = () => {
    const { taskNumber } = useParams<{ taskNumber: string }>();
    const [task, setTask] = useState<any>(null);
    const [createdByEmail, setCreatedByEmail] = useState<string | null>(null);
    const [assignedToEmail, setAssignedToEmail] = useState<string | null>(null);
    const [newComment, setNewComment] = useState('');
    const [editingField, setEditingField] = useState<string | null>(null);
    const [editedValues, setEditedValues] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<any[]>([]);
    
    const statusOptions= ['Active', 'In Progress', 'Completed', 'Hold', 'New'];
    useEffect(() => {
        if (taskNumber) {
            fetchTaskDetails();
        }
        fetchUsers();
    }, [taskNumber]);

    const fetchTaskDetails = async () => {
        try {
            setLoading(true);
            if (taskNumber) {
                const taskData = await getTaskDetails(taskNumber);
                setTask(taskData);
                setEditedValues({
                    title: taskData?.title,
                    description: taskData?.description,
                    priority: taskData?.priority,
                    status: taskData?.status,
                    assignedTo: taskData?.assignedTo?._id, // Store assignedTo ID for editing
                });
                if (taskData?.createdBy) {
                    const userData = await getUserDetails(taskData.createdBy);
                    setCreatedByEmail(userData.email);
                }
                if (taskData?.assignedTo) {
                    const userData = await getUserDetails(taskData.assignedTo._id);
                    setAssignedToEmail(userData.email);
                }
            }
        } catch (err) {
            setError("Failed to fetch task details.");
            console.error("Error fetching task:", err);
        } finally {
            setLoading(false);
        }
    };
    const fetchUsers = async () => {
        try {
            const userData = await getAllUsers();
            setUsers(userData);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const handleEditField = (field: string) => {
        setEditingField(field);
    };

    const handleSaveField = async (field: string) => {
        try {
            if (taskNumber) {
                await updateTaskDetails(taskNumber, { [field]: editedValues[field] });
                setTask({ ...task, [field]: editedValues[field] });
                setEditingField(null);
                if (field === 'assignedTo') {
                    const updatedUser = users.find(user => user._id === editedValues.assignedTo);
                    setAssignedToEmail(updatedUser?.email || '');
                }
            }
        } catch (err) {
            console.error(`Error updating ${field}:`, err);
        }
    };

    const handleAddComment = async () => {
        try {
            if (taskNumber) {
                await addComment(taskNumber, { text: newComment });
                setNewComment('');
                fetchTaskDetails();
            }
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };

    const handleEditComment = async (commentId: string) => {
        try {
            if (taskNumber) {
                await editComment(taskNumber, commentId, { text: editedValues.comment });
                setEditingField(null);
                fetchTaskDetails();
            }
        } catch (err) {
            console.error("Error editing comment:", err);
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box display="flex" flexDirection="column" alignItems="center" p={2} sx={{ width: '80%', maxWidth: 800, mx: 'auto' }}>
            <Card variant="outlined" sx={{ width: '100%', mb: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {editingField === 'title' ? (
                            <>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={editedValues.title}
                                    onChange={(e) => setEditedValues({ ...editedValues, title: e.target.value })}
                                />
                                <IconButton onClick={() => handleSaveField('title')}>
                                    <SaveIcon />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                {task?.title}
                                <IconButton onClick={() => handleEditField('title')}>
                                    <EditIcon />
                                </IconButton>
                            </>
                        )}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Description:</strong> {editingField === 'description' ? (
                            <>
                                <TextField
                                    fullWidth
                                    multiline
                                    variant="outlined"
                                    value={editedValues.description}
                                    onChange={(e) => setEditedValues({ ...editedValues, description: e.target.value })}
                                />
                                <IconButton onClick={() => handleSaveField('description')}>
                                    <SaveIcon />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                {task?.description}
                                <IconButton onClick={() => handleEditField('description')}>
                                    <EditIcon />
                                </IconButton>
                            </>
                        )}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Priority:</strong> {editingField === 'priority' ? (
                            <>
                                <TextField
                                    select
                                    fullWidth
                                    variant="outlined"
                                    value={editedValues.priority}
                                    onChange={(e) => setEditedValues({ ...editedValues, priority: e.target.value })}
                                >
                                    <MenuItem value="Low">Low</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="High">High</MenuItem>
                                </TextField>
                                <IconButton onClick={() => handleSaveField('priority')}>
                                    <SaveIcon />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                {task?.priority}
                                <IconButton onClick={() => handleEditField('priority')}>
                                    <EditIcon />
                                </IconButton>
                            </>
                        )}
                    </Typography>
                    {/* <Typography variant="body1">
                        <strong>Status:</strong> {editingField === 'status' ? (
                            <>
                                <TextField
                                    select
                                    fullWidth
                                    variant="outlined"
                                    value={editedValues.status}
                                    onChange={(e) => setEditedValues({ ...editedValues, status: e.target.value })}
                                >
                                    <MenuItem value="Open">Open</MenuItem>
                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                    <MenuItem value="Completed">Completed</MenuItem>
                                </TextField>
                                <IconButton onClick={() => handleSaveField('status')}>
                                    <SaveIcon />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                {task?.status}
                                <IconButton onClick={() => handleEditField('status')}>
                                    <EditIcon />
                                </IconButton>
                            </>
                        )}
                    </Typography> */}
                    <Typography variant="body1">
                        <strong>Status:</strong> {editingField === 'status' ? (
                            <>
                                <TextField
                                    select
                                    fullWidth
                                    variant="outlined"
                                    value={editedValues.status}
                                    onChange={(e) => setEditedValues({ ...editedValues, status: e.target.value })}
                                >
                                    {statusOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <IconButton onClick={() => handleSaveField('status')}>
                                    <SaveIcon />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                {task?.status}
                                <IconButton onClick={() => handleEditField('status')}>
                                    <EditIcon />
                                </IconButton>
                            </>
                        )}
                    </Typography>

                    <Typography variant="body1"><strong>Created By:</strong> {createdByEmail || "Loading..."}</Typography>
                    <Typography variant="body1">
                        <strong>Assigned To:</strong> {editingField === 'assignedTo' ? (
                            <>
                                <Select
                                    fullWidth
                                    value={editedValues.assignedTo || ''}
                                    onChange={(e) => setEditedValues({ ...editedValues, assignedTo: e.target.value })}
                                    variant="outlined"
                                >
                                    {users.map(user => (
                                        <MenuItem key={user._id} value={user._id}>{user.email}</MenuItem>
                                    ))}
                                </Select>
                                <IconButton onClick={() => handleSaveField('assignedTo')}>
                                    <SaveIcon />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                {assignedToEmail}
                                <IconButton onClick={() => handleEditField('assignedTo')}>
                                    <EditIcon />
                                </IconButton>
                            </>
                        )}
                    </Typography>
                </CardContent>
            </Card>

            <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                    <Typography variant="h6">Comments</Typography>
                    <Divider sx={{ my: 2 }} />
                    <List>
                        {task?.comments?.map((comment: any) => (
                            <ListItem key={comment._id} alignItems="flex-start">
                                <ListItemText
                                    primary={
                                        editingField === comment._id ? (
                                            <>
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    value={editedValues.comment || comment.text} // Use the current comment's text if no edit
                                                    onChange={(e) =>
                                                        setEditedValues({ ...editedValues, comment: e.target.value })
                                                    }
                                                    variant="outlined"
                                                    size="small"
                                                />
                                                <IconButton onClick={() => handleEditComment(comment._id)}>
                                                    <SaveIcon />
                                                </IconButton>
                                            </>
                                        ) : (
                                            comment.text
                                        )
                                    }
                                    secondary={new Date(comment.date).toLocaleString()}
                                />
                                <IconButton onClick={() => handleEditField(comment._id)}>
                                    <EditIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>

                    <TextField
                        fullWidth
                        multiline
                        variant="outlined"
                        placeholder="Add a comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleAddComment} sx={{ mt: 1 }}>
                        Add Comment
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default TaskDetails;
