import React from 'react';

const FilterBar: React.FC = () => {
  return (
    <div className="filter-bar">
      <label>
        Status:
        <select>
          <option value="active">Active</option>
          <option value="in-progress">In Progress</option>
          <option value="hold">Hold</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <label>
        Assigned to me
        <input type="checkbox" />
      </label>
      <label>
        Priority:
        <select>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </label>
      {/* Add more filter options as needed */}
    </div>
  );
};

export default FilterBar;
