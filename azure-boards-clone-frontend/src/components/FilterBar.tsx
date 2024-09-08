import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Chip } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface FilterBarProps {
  onFilterChange: (status: string[], priority: string[]) => void;
  statusFilter: string[];
  priorityFilter: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, statusFilter, priorityFilter }) => {
  const handleStatusChange = (event: SelectChangeEvent<string[]>) => {
    onFilterChange(event.target.value as string[], priorityFilter);
  };

  const handlePriorityChange = (event: SelectChangeEvent<string[]>) => {
    onFilterChange(statusFilter, event.target.value as string[]);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      mb={2}
      border={1}
      borderColor="divider"
      borderRadius={1}
      bgcolor="background.paper"
      className="filter-bar"
    >
      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel>Status</InputLabel>
        <Select
          multiple
          value={statusFilter}
          onChange={handleStatusChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} sx={{ margin: 0.5 }} />
              ))}
            </Box>
          )}
          label="Status"
        >
          <MenuItem value="active">
            <Checkbox checked={statusFilter.indexOf('active') > -1} />
            <ListItemText primary="Active" />
          </MenuItem>
          <MenuItem value="in-progress">
            <Checkbox checked={statusFilter.indexOf('in-progress') > -1} />
            <ListItemText primary="In Progress" />
          </MenuItem>
          <MenuItem value="hold">
            <Checkbox checked={statusFilter.indexOf('hold') > -1} />
            <ListItemText primary="Hold" />
          </MenuItem>
          <MenuItem value="completed">
            <Checkbox checked={statusFilter.indexOf('completed') > -1} />
            <ListItemText primary="Completed" />
          </MenuItem>
          <MenuItem value="new">
            <Checkbox checked={statusFilter.indexOf('new') > -1} />
            <ListItemText primary="New" />
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel>Priority</InputLabel>
        <Select
          multiple
          value={priorityFilter}
          onChange={handlePriorityChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} sx={{ margin: 0.5 }} />
              ))}
            </Box>
          )}
          label="Priority"
        >
          <MenuItem value="high">
            <Checkbox checked={priorityFilter.indexOf('high') > -1} />
            <ListItemText primary="High" />
          </MenuItem>
          <MenuItem value="medium">
            <Checkbox checked={priorityFilter.indexOf('medium') > -1} />
            <ListItemText primary="Medium" />
          </MenuItem>
          <MenuItem value="low">
            <Checkbox checked={priorityFilter.indexOf('low') > -1} />
            <ListItemText primary="Low" />
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterBar;
