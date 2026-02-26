import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// --- Mock Data Generation ---

const generateTimeSeriesData = (
  points: number,
  startHour: number,
  startMinute: number,
) => {
  const data = [];
  for (let i = 0; i < points; i++) {
    const totalMinutes = startHour * 60 + startMinute + i * 2;
    const h = Math.floor(totalMinutes / 60) % 24;
    const m = totalMinutes % 60;
    const time = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;

    data.push({
      time,
      adminCpu: 15 + Math.random() * 20,
      aiCpu: 35 + Math.random() * 30,
      apiCpu: 20 + Math.random() * 15,
      adminMem: 40 + Math.random() * 10,
      aiMem: 60 + Math.random() * 25,
      apiMem: 50 + Math.random() * 15,
      rdsCpu: 10 + Math.random() * 15,
      rdsStorage: 14 + Math.random() * 2,
      albRequests: 100 + Math.floor(Math.random() * 130),
      albErrors: Math.random() > 0.7 ? Math.floor(Math.random() * 4) : 0,
      albLatency: 0.08 + Math.random() * 0.1,
    });
  }
  return data;
};

const chartData = generateTimeSeriesData(30, 11, 11);

// --- Styled Components / Parts ---

const Card = ({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white p-4 rounded-xl border border-gray-100 shadow-sm ${className}`}
  >
    <div className="mb-4">
      <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">
        {title}
      </h3>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
    <div className="h-[250px] w-full">{children}</div>
  </div>
);

const ECSCPUChart = ({ data }: { data: any[] }) => (
  <Card title="ECS CPU 사용률 (%)" subtitle="임계치: 80%">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f0f0f0"
        />
        <XAxis dataKey="time" fontSize={10} tick={{ fill: "#9ca3af" }} />
        <YAxis fontSize={10} tick={{ fill: "#9ca3af" }} domain={[0, 100]} />
        <Tooltip />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{ fontSize: "10px", paddingTop: "10px" }}
        />
        <ReferenceLine
          y={80}
          label={{
            position: "right",
            value: "80% 임계치",
            fill: "#ef4444",
            fontSize: 10,
          }}
          stroke="#ef4444"
          strokeDasharray="3 3"
        />
        <Line
          type="monotone"
          dataKey="adminCpu"
          name="walkdoni-dev-admin CPU"
          stroke="#10b981"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="aiCpu"
          name="walkdoni-dev-ai CPU"
          stroke="#8b5cf6"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="apiCpu"
          name="walkdoni-dev-api CPU"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </Card>
);

const ECSMemoryChart = ({ data }: { data: any[] }) => (
  <Card title="ECS 메모리 사용률 (%)" subtitle="임계치: 85%">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorAdmin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorApi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f0f0f0"
        />
        <XAxis dataKey="time" fontSize={10} tick={{ fill: "#9ca3af" }} />
        <YAxis fontSize={10} tick={{ fill: "#9ca3af" }} domain={[0, 100]} />
        <Tooltip />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{ fontSize: "10px", paddingTop: "10px" }}
        />
        <ReferenceLine
          y={85}
          label={{
            position: "right",
            value: "85% 임계치",
            fill: "#ef4444",
            fontSize: 10,
          }}
          stroke="#ef4444"
          strokeDasharray="3 3"
        />
        <Area
          type="monotone"
          dataKey="adminMem"
          name="walkdoni-dev-admin Memory"
          stroke="#10b981"
          fillOpacity={1}
          fill="url(#colorAdmin)"
        />
        <Area
          type="monotone"
          dataKey="aiMem"
          name="walkdoni-dev-ai Memory"
          stroke="#8b5cf6"
          fillOpacity={1}
          fill="url(#colorAi)"
        />
        <Area
          type="monotone"
          dataKey="apiMem"
          name="walkdoni-dev-api Memory"
          stroke="#3b82f6"
          fillOpacity={1}
          fill="url(#colorApi)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </Card>
);

const RDSCPUChart = ({ data }: { data: any[] }) => (
  <Card title="RDS CPU 사용률 (%)" subtitle="임계치: 80%">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f0f0f0"
        />
        <XAxis dataKey="time" fontSize={10} tick={{ fill: "#9ca3af" }} />
        <YAxis fontSize={10} tick={{ fill: "#9ca3af" }} domain={[0, 100]} />
        <Tooltip />
        <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="3 3" />
        <Line
          type="monotone"
          dataKey="rdsCpu"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </Card>
);

const RDSStorageChart = ({ data }: { data: any[] }) => (
  <Card title="RDS 여유 스토리지" subtitle="경고: 2GB 미만">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f0f0f0"
        />
        <XAxis dataKey="time" fontSize={10} tick={{ fill: "#9ca3af" }} />
        <YAxis
          fontSize={10}
          tick={{ fill: "#9ca3af" }}
          domain={[0, 16]}
          unit=" GB"
        />
        <Tooltip />
        <ReferenceLine y={2} stroke="#ef4444" strokeDasharray="3 3" />
        <Area
          type="step"
          dataKey="rdsStorage"
          stroke="#10b981"
          fill="#10b981"
          fillOpacity={0.1}
        />
      </AreaChart>
    </ResponsiveContainer>
  </Card>
);

const ALBRequestsChart = ({ data }: { data: any[] }) => (
  <Card title="ALB 요청 수">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f0f0f0"
        />
        <XAxis dataKey="time" fontSize={10} tick={{ fill: "#9ca3af" }} />
        <YAxis fontSize={10} tick={{ fill: "#9ca3af" }} />
        <Tooltip />
        <Bar dataKey="albRequests" fill="#3b82f6" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </Card>
);

const ALBErrorsChart = ({ data }: { data: any[] }) => (
  <Card title="ALB 5xx 에러">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f0f0f0"
        />
        <XAxis dataKey="time" fontSize={10} tick={{ fill: "#9ca3af" }} />
        <YAxis fontSize={10} tick={{ fill: "#9ca3af" }} domain={[0, 5]} />
        <Tooltip />
        <Bar dataKey="albErrors" fill="#ef4444" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </Card>
);

const ALBResponseTimeChart = ({ data }: { data: any[] }) => (
  <Card title="ALB 응답 시간 (s)">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f0f0f0"
        />
        <XAxis dataKey="time" fontSize={10} tick={{ fill: "#9ca3af" }} />
        <YAxis fontSize={10} tick={{ fill: "#9ca3af" }} domain={[0, 0.2]} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="albLatency"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </Card>
);

const Charts = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 gap-6 max-w-7xl mx-auto">
        <ECSCPUChart data={chartData} />
        <ECSMemoryChart data={chartData} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RDSCPUChart data={chartData} />
          <RDSStorageChart data={chartData} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ALBRequestsChart data={chartData} />
          <ALBErrorsChart data={chartData} />
          <ALBResponseTimeChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
