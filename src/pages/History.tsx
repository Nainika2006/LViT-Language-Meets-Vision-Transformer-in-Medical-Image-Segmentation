import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";

const mockHistory = [
  {
    id: 1,
    date: "2025-11-07",
    patientId: "PT-2451",
    imageType: "Chest X-Ray",
    findings: "Right upper lobe opacity",
    confidence: 87,
    status: "completed"
  },
  {
    id: 2,
    date: "2025-11-06",
    patientId: "PT-2398",
    imageType: "CT Scan",
    findings: "No abnormalities detected",
    confidence: 95,
    status: "completed"
  },
  {
    id: 3,
    date: "2025-11-05",
    patientId: "PT-2367",
    imageType: "Chest X-Ray",
    findings: "Left lower lobe consolidation",
    confidence: 82,
    status: "completed"
  }
];

export default function History() {
  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analysis History</h1>
          <p className="text-muted-foreground">
            View and manage your previous diagnostic analyses
          </p>
        </div>

        <div className="space-y-4">
          {mockHistory.map((item) => (
            <Card key={item.id} className="p-6 border-primary/10 bg-card/50 backdrop-blur hover:border-primary/20 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{item.patientId}</h3>
                    <Badge variant="outline" className="border-primary/30">
                      {item.imageType}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.findings}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Confidence:</span>
                    <div className="flex-1 max-w-[200px] h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${item.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium">{item.confidence}%</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-primary/20">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="border-primary/20">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
