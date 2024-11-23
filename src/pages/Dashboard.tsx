'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Users,
  UserPlus,
  UserMinus,
  DollarSign,
  TrendingUp,
  Briefcase,
} from 'lucide-react'

const employeeGrowth = [
  { month: 'Jan', count: 50 },
  { month: 'Feb', count: 55 },
  { month: 'Mar', count: 60 },
  { month: 'Apr', count: 62 },
  { month: 'May', count: 65 },
  { month: 'Jun', count: 68 },
]

const departmentDistribution = [
  { department: 'IT', count: 20 },
  { department: 'HR', count: 10 },
  { department: 'Sales', count: 15 },
  { department: 'Marketing', count: 12 },
  { department: 'Finance', count: 8 },
]

const topPerformers = [
  { name: 'John Doe', department: 'Sales', performance: 95 },
  { name: 'Jane Smith', department: 'Marketing', performance: 92 },
  { name: 'Mike Johnson', department: 'IT', performance: 90 },
]

export default function Dashboard() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Employee Management Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Hires</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turnover Rate</CardTitle>
            <UserMinus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8%</div>
            <p className="text-xs text-muted-foreground">
              -0.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Salary</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$75,000</div>
            <p className="text-xs text-muted-foreground">+2% from last year</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Employee Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: 'Employee Count',
                  color: 'hsl(var(--chart-1))',
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={employeeGrowth}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3 !overflow-hidden">
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: 'Employee Count',
                  color: 'hsl(var(--chart-2))',
                },
              }}
              className="h-[300px] px-0"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentDistribution} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="department" type="category" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>
              Employees with the highest performance ratings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${performer.name}`}
                      alt="Avatar"
                    />
                    <AvatarFallback>
                      {performer.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {performer.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {performer.department}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    {performer.performance}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common management tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button className="w-full">
              <UserPlus className="mr-2 h-4 w-4" /> Add New Employee
            </Button>
            <Button className="w-full" variant="outline">
              <Briefcase className="mr-2 h-4 w-4" /> Manage Departments
            </Button>
            <Button className="w-full" variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" /> View Full Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Overall Company Performance</CardTitle>
          <CardDescription>Based on key performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span className="text-sm font-medium">Productivity</span>
              </div>
              <span className="text-sm font-medium">85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">
                  Employee Satisfaction
                </span>
              </div>
              <span className="text-sm font-medium">78%</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="text-sm font-medium">Goal Completion</span>
              </div>
              <span className="text-sm font-medium">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
