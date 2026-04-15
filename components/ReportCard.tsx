'use client';

interface ReportData {
  technicalScore: number;
  stressManagement: number;
  communicationScore: number;
  behavioralNote: string;
  recommendation: string;
}

export default function ReportCard({ report }: { report: ReportData }) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-xl p-6 mb-6">
        <h3 className="text-2xl font-bold mb-6 text-center">📊 تقرير أدائك</h3>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center bg-gray-700/50 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-2">المهارة التقنية</div>
            <div className={`text-4xl font-bold ${getScoreColor(report.technicalScore)}`}>
              {report.technicalScore}%
            </div>
          </div>
          <div className="text-center bg-gray-700/50 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-2">التحكم بالضغط</div>
            <div className={`text-4xl font-bold ${getScoreColor(report.stressManagement)}`}>
              {report.stressManagement}%
            </div>
          </div>
          <div className="text-center bg-gray-700/50 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-2">التواصل والإقناع</div>
            <div className={`text-4xl font-bold ${getScoreColor(report.communicationScore)}`}>
              {report.communicationScore}%
            </div>
          </div>
        </div>

        <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4 mb-4">
          <h4 className="font-bold text-red-400 mb-2">🎯 ملاحظة سلوكية</h4>
          <p className="text-gray-300">{report.behavioralNote}</p>
        </div>

        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
          <h4 className="font-bold text-primary mb-2">💡 توصية للتطوير</h4>
          <p className="text-gray-300">{report.recommendation}</p>
        </div>
      </div>
    </div>
  );
}