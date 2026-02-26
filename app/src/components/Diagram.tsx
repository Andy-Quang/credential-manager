import {
  Activity,
  Boxes,
  Cloud,
  Database,
  Server,
  ShieldCheck,
  Zap,
  ArrowRight,
  Monitor,
  Bell,
  HardDriveDownload,
  Lock,
} from "lucide-react";
import React from "react";

const StatusDot: React.FC<{
  size?: "xs" | "sm" | "md" | "lg";
  pulse?: boolean;
  glow?: boolean;
  className?: string;
}> = ({ size = "sm", pulse = false, glow = false, className = "" }) => {
  const sizeClasses = {
    xs: "w-1 h-1",
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  };

  return (
    <div
      className={`
        rounded-full bg-emerald-500 shadow-sm
        ${sizeClasses[size]}
        ${pulse ? "animate-pulse" : ""}
        ${glow ? "shadow-[0_0_8px_rgba(16,185,129,0.5)]" : ""}
        ${className}
      `}
    />
  );
};

const Diagram: React.FC = () => {
  return (
    <div className="py-12 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* INTERNET / DNS LAYER */}
        <section className="relative rounded-3xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-900/10 p-8 shadow-sm">
          <div className="absolute top-4 left-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-500">
            <Cloud className="w-3.5 h-3.5" />
            <span>Internet / DNS Layer</span>
          </div>

          <div className="flex items-center justify-center gap-12 pt-4">
            <DiagramNode icon={<Cloud className="w-6 h-6 text-blue-500" />} label="Users" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-medium text-blue-400">HTTPS</span>
              <ArrowRight className="w-4 h-4 text-blue-300" />
            </div>
            <DiagramNode
              icon={
                <div className="relative">
                  <Cloud className="w-6 h-6 text-indigo-500" />
                  <StatusDot size="md" className="absolute -top-1 -right-1 border-2 border-white dark:border-slate-900 shadow-none" />
                </div>
              }
              label="Route53"
              sublabel="innogait.com"
            />
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-medium text-blue-400">DNS - ALB</span>
              <ArrowRight className="w-4 h-4 text-blue-300" />
            </div>
            <DiagramNode icon={<ShieldCheck className="w-6 h-6 text-orange-500" />} label="ACM" sublabel="*.innogait.com" />
          </div>

          {/* VPC CONTAINER */}
          <div className="mt-12 relative rounded-[32px] border-2 border-dashed border-slate-200 dark:border-slate-800 p-8">
            <div className="absolute -top-3 left-8 px-4 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              VPC - 10.0.0.0/16 - ap-northeast-2
            </div>

            {/* PUBLIC SUBNETS */}
            <div className="rounded-2xl border border-blue-100 dark:border-blue-900/20 bg-white dark:bg-slate-900/50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Public Subnets</span>
                <span className="text-[10px] text-blue-400 ">10.0.1.0/24 (AZ-a) · 10.0.2.0/24 (AZ-c)</span>
              </div>

              <div className="flex justify-center gap-6 ">
                <div className="md:col-span-2 rounded-2xl border border-blue-100 dark:border-blue-800/40 bg-blue-50/30 dark:bg-blue-900/10 p-5 flex justify-between flex-col">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">Application Load Balancer</h3>
                      <p className="text-[10px] text-slate-400 font-mono">walkdoni-dev-alb</p>
                    </div>
                    <StatusDot size="lg" className="ml-auto" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-blue-100 dark:border-blue-900/50 text-[10px] text-blue-500 font-medium">api.innogait.com</span>
                    <span className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-blue-100 dark:border-blue-900/50 text-[10px] text-indigo-500 font-medium">admin.innogait.com</span>
                    <span className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-blue-100 dark:border-blue-900/50 text-[10px] text-emerald-500 font-medium">ai.innogait.com</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-5 flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-2">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                  <h3 className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase">NAT Gateway</h3>
                  <p className="text-[9px] text-slate-400">Outbound 인터넷</p>
                </div>
              </div>
            </div>

            {/* CONNECTORS */}
            <div className="h-20 flex justify-center items-center gap-20">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative h-full flex flex-col items-center justify-center">
                  <div className="h-full w-1 bg-linear-to-b from-blue-200 to-emerald-200 dark:from-blue-900 dark:to-emerald-900" />
                  <span className="absolute bg-[#F8FAFC] dark:bg-slate-950 px-1 text-[10px] font-mono text-slate-400">
                    :3000
                  </span>
                </div>
              ))}
            </div>

            {/* PRIVATE SUBNETS - ECS */}
            <div className="rounded-2xl border border-emerald-100 dark:border-emerald-900/20 bg-emerald-50/10 dark:bg-emerald-900/5 p-6 space-y-6">
              <div className="flex items-center gap-2">
                <Boxes className="w-4 h-4 text-emerald-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Private Subnets — ECS Fargate Cluster</span>
                <span className="text-[10px] text-emerald-400 ">10.0.10.0/24 · 10.0.11.0/24</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ECSServiceCard icon={<Server className="w-5 h-5 text-blue-500" />} title="API Server" id="walkdoni-dev-api" port="3000" time="2시간 전" />
                <ECSServiceCard icon={<Monitor className="w-5 h-5 text-indigo-500" />} title="Admin Web" id="walkdoni-dev-admin" port="3000" time="5시간 전" />
                <ECSServiceCard icon={<Activity className="w-5 h-5 text-emerald-500" />} title="AI Server" id="walkdoni-dev-ai" port="8000" time="1시간 전" />
              </div>

              {/* SERVICE DISCOVERY BAR */}
              <div className="rounded-xl border border-emerald-100 dark:border-emerald-900/30 bg-white/80 dark:bg-slate-900/80 px-4 py-2 flex items-center justify-center gap-4 shadow-sm border-dashed">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600/70 dark:text-emerald-400/70">Service Discovery</span>
                <span className="text-[10px] font-mono text-slate-400">api.walkdoni-dev.local · ai.walkdoni-dev.local</span>
              </div>

              {/* DATA LAYER */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                  <DatabaseCard icon={<Database className="w-5 h-5 text-indigo-500" />} title="RDS PostgreSQL" id="walkdoni-dev-postgres" engine="postgres 15.4" size="db.t3.micro" storage="20 GB" />
                  <DatabaseCard icon={<Zap className="w-5 h-5 text-orange-500" />} title="ElastiCache Redis" id="walkdoni-dev-redis" engine="Redis 7.0" size="1 node" storage="6379" />
                </div>
                <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                  <S3Card title="S3 Bucket" id="walkdoni-nft" type="NFT 에셋" access="Public" />
                  <S3Card title="S3 Bucket" id="walkdoni-data" type="데이터 저장" access="Pre-signed" />
                </div>
              </div>
            </div>
          </div>

          {/* MONITORING LAYER */}
          <div className="mt-8 rounded-2xl border border-orange-100 dark:border-orange-900/20 bg-orange-50/10 dark:bg-orange-950/5 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-4 h-4 text-orange-500" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">Monitoring & CI/CD</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ToolCard title="CloudWatch" sub="5 alarms" status="active" />
              <ToolCard icon={<Bell className="w-4 h-4 text-orange-400" />} title="SNS" sub="알림 발송" />
              <ToolCard icon={<HardDriveDownload className="w-4 h-4 text-blue-400" />} title="ECR" sub="3 repos" />
              <ToolCard icon={<Lock className="w-4 h-4 text-slate-400" />} title="Secrets Manager" sub="환경변수" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const DiagramNode: React.FC<{ icon: React.ReactNode; label: string; sublabel?: string }> = ({ icon, label, sublabel }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center">
      {icon}
    </div>
    <div className="text-center">
      <h4 className="text-[11px] font-bold text-slate-700 dark:text-slate-200">{label}</h4>
      {sublabel && <p className="text-[9px] text-slate-400 font-medium">{sublabel}</p>}
    </div>
  </div>
);

const ECSServiceCard: React.FC<{ icon: React.ReactNode; title: string; id: string; port: string; time: string }> = ({ icon, title, id, port, time }) => (
  <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4 shadow-sm relative overflow-hidden group">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">{title}</h4>
          <p className="text-[9px] text-slate-400 font-mono tracking-tighter">{id}</p>
        </div>
      </div>
      <StatusDot size="md" glow={true} />
    </div>
    <div className="grid grid-cols-3 gap-2 border-t border-slate-50 dark:border-slate-800 pt-3">
      <div className="space-y-0.5">
        <p className="text-[8px] text-slate-400 uppercase font-medium">Running</p>
        <p className="text-xs font-bold text-blue-500">1</p>
      </div>
      <div className="space-y-0.5 border-l border-slate-50 dark:border-slate-800 pl-2">
        <p className="text-[8px] text-slate-400 uppercase font-medium">Desired</p>
        <p className="text-xs font-bold text-indigo-500">1</p>
      </div>
      <div className="space-y-0.5 border-l border-slate-50 dark:border-slate-800 pl-2">
        <p className="text-[8px] text-slate-400 uppercase font-medium">Port</p>
        <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{port}</p>
      </div>
    </div>
    <div className="flex items-center justify-between text-[9px] font-medium pt-1">
      <span className="text-slate-400 flex items-center gap-1">
        <Activity className="w-3 h-3" /> {time}
      </span>
      <span className="text-emerald-500 font-bold uppercase tracking-widest text-[8px]">CW: OK</span>
    </div>
  </div>
);

const DatabaseCard: React.FC<{ icon: React.ReactNode; title: string; id: string; engine: string; size: string; storage: string }> = ({ icon, title, id, engine, size, storage }) => (
  <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3 shadow-sm relative overflow-hidden">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
          {icon}
        </div>
        <h4 className="text-[11px] font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">{title}</h4>
      </div>
      <StatusDot size="md" />
    </div>
    <p className="text-[9px] text-slate-300 font-mono tracking-tighter truncate">{id}</p>
    <div className="grid grid-cols-3 gap-1 pt-2">
      <div className="text-center">
        <p className="text-[7px] text-slate-400 uppercase font-bold">엔진</p>
        <p className="text-[9px] font-bold text-slate-600 dark:text-slate-300 truncate">{engine}</p>
      </div>
      <div className="text-center border-l border-slate-50 dark:border-slate-800">
        <p className="text-[7px] text-slate-400 uppercase font-bold">클래스</p>
        <p className="text-[9px] font-bold text-slate-600 dark:text-slate-300 truncate">{size}</p>
      </div>
      <div className="text-center border-l border-slate-50 dark:border-slate-800">
        <p className="text-[7px] text-slate-400 uppercase font-bold">스토리지</p>
        <p className="text-[9px] font-bold text-slate-600 dark:text-slate-300 truncate">{storage}</p>
      </div>
    </div>
  </div>
);

const S3Card: React.FC<{ title: string; id: string; type: string; access: string }> = ({ title, id, type, access }) => (
  <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3 shadow-sm relative overflow-hidden">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
          <Boxes className="w-5 h-5 text-emerald-500" />
        </div>
        <h4 className="text-[11px] font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">{title}</h4>
      </div>
      <StatusDot size="md" />
    </div>
    <p className="text-[9px] text-slate-300 font-mono tracking-tighter truncate text-right">{id}</p>
    <div className="grid grid-cols-2 gap-2 pt-2 bg-slate-50/50 dark:bg-slate-800/30 rounded-lg p-2">
      <div>
        <p className="text-[7px] text-slate-400 uppercase font-bold text-center">용도</p>
        <p className="text-[9px] font-bold text-slate-600 dark:text-slate-300 text-center">{type}</p>
      </div>
      <div className="border-l border-slate-200 dark:border-slate-700">
        <p className="text-[7px] text-slate-400 uppercase font-bold text-center">접근</p>
        <p className="text-[9px] font-bold text-slate-600 dark:text-slate-300 text-center">{access}</p>
      </div>
    </div>
  </div>
);

const ToolCard: React.FC<{ icon?: React.ReactNode; title: string; sub: string; status?: string }> = ({ icon, title, sub, status }) => (
  <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-col items-center justify-center text-center shadow-sm relative group hover:border-orange-200 transition-colors">
    {icon ? (
      <div className="mb-2">{icon}</div>
    ) : (
      <div className="flex flex-col items-center mb-2">
        <div className="relative">
          <Activity className="w-5 h-5 text-orange-400" />
          <StatusDot size="sm" pulse={true} className="absolute -bottom-0.5 -right-0.5" />
        </div>
      </div>
    )}
    <h5 className="text-[11px] font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">{title}</h5>
    <p className="text-[9px] text-slate-400 font-medium">{sub}</p>
    {status && <StatusDot size="xs" className="absolute bottom-2" />}
  </div>
);

export default Diagram;
