export function generateMockData(count: number): EmployeeAttendance[] {
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance']
  const positions = ['Manager', 'Senior', 'Junior', 'Intern']
  const statuses: ('Present' | 'Absent' | 'Late' | 'Early Leave')[] = [
    'Present',
    'Absent',
    'Late',
    'Early Leave',
  ]
  const employeeStatuses: ('Good Standing' | 'Warning' | 'Probation')[] = [
    'Good Standing',
    'Warning',
    'Probation',
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: `EMP${(i + 1).toString().padStart(3, '0')}`,
    name: `Employee ${i + 1}`,
    department: departments[Math.floor(Math.random() * departments.length)],
    position: positions[Math.floor(Math.random() * positions.length)],
    status: {
      id: `STATUS${(i + 1).toString().padStart(3, '0')}`,
      employeeId: `EMP${(i + 1).toString().padStart(3, '0')}`,
      status:
        employeeStatuses[Math.floor(Math.random() * employeeStatuses.length)],
      lastUpdated: new Date(2023, 4, Math.floor(Math.random() * 30) + 1)
        .toISOString()
        .split('T')[0],
    },
    attendance: Array.from({ length: 30 }, (_, j) => ({
      id: `ATT${(i * 30 + j + 1).toString().padStart(5, '0')}`,
      employeeId: `EMP${(i + 1).toString().padStart(3, '0')}`,
      date: new Date(2023, 4, j + 1).toISOString().split('T')[0],
      checkIn: `${Math.floor(Math.random() * 3) + 8}:${Math.floor(
        Math.random() * 60
      )
        .toString()
        .padStart(2, '0')}`,
      checkOut: `${Math.floor(Math.random() * 3) + 16}:${Math.floor(
        Math.random() * 60
      )
        .toString()
        .padStart(2, '0')}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    })),
  }))
}
