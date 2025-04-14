import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const TaskCompletionChart = ({ totalTasks, completedTasks }) => {
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    if (totalTasks > 0) {
      const incompleteTasks = totalTasks - completedTasks;
      setChartData([
        { name: 'Completed Tasks', value: completedTasks },
        { name: 'Incomplete Tasks', value: incompleteTasks }
      ]);
    } else {
      setChartData([
        { name: 'No Tasks', value: 1 }
      ]);
    }
  }, [totalTasks, completedTasks]);

  const COLORS = ['#4F46E5', '#E5E7EB'];
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
      <h3 className="font-semibold text-gray-700 mb-2 text-center">Task Completion</h3>
      
      <div className="text-center mb-4">
        <span className="text-3xl font-bold text-blue-600">{completionPercentage}%</span>
        <p className="text-sm text-gray-500">Completion Rate</p>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-2 text-center">
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="font-semibold text-blue-600">{completedTasks}</p>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-sm text-gray-600">Total</p>
          <p className="font-semibold text-blue-600">{totalTasks}</p>
        </div>
      </div>
    </div>
  );
};

// Add PropTypes validation
TaskCompletionChart.propTypes = {
  totalTasks: PropTypes.number.isRequired,
  completedTasks: PropTypes.number.isRequired
};

// Add default props
TaskCompletionChart.defaultProps = {
  totalTasks: 0,
  completedTasks: 0
};

export default TaskCompletionChart;