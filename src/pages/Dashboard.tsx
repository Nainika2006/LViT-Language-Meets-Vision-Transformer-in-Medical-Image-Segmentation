import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Image as ImageIcon, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Dashboard() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [reportText, setReportText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      toast.success("Image uploaded successfully");
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage || !reportText) {
      toast.error("Please upload an image and enter patient report");
      return;
    }

    setIsAnalyzing(true);
    
    // TODO: Implement AI analysis
    setTimeout(() => {
      setResults({
        maskedImage: imagePreview, // This would be the AI-processed image
        analysis: "AI Analysis: Opacity detected in the right upper lobe of the lung, measuring approximately 2.5cm. The lesion shows irregular borders and heterogeneous density, suggestive of possible pneumonia or early-stage malignancy. Recommendation: Follow-up CT scan in 3 months and clinical correlation advised.",
        confidence: 87,
        findings: [
          "Right upper lobe opacity",
          "Irregular borders detected",
          "Size: approximately 2.5cm",
          "Heterogeneous density pattern"
        ]
      });
      setIsAnalyzing(false);
      toast.success("Analysis complete!");
    }, 3000);
  };

  const handleDownloadReport = () => {
    toast.success("Report downloaded successfully");
    // TODO: Implement PDF generation
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analysis Dashboard</h1>
          <p className="text-muted-foreground">
            Upload medical images and patient reports for AI-powered analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card className="p-6 border-primary/10 bg-card/50 backdrop-blur">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                Upload Medical Image
              </h2>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/40 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-12 w-12 text-primary/60" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload X-ray or CT scan
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Supports JPG, PNG (max 10MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-primary/10 bg-card/50 backdrop-blur">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Patient Report
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report">Clinical Notes</Label>
                  <Textarea
                    id="report"
                    placeholder="Enter patient symptoms, medical history, and clinical observations..."
                    className="min-h-[200px] border-primary/20"
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                  />
                </div>
                
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !selectedImage || !reportText}
                  className="w-full shadow-glow"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Results"
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results ? (
              <>
                <Card className="p-6 border-primary/10 bg-card/50 backdrop-blur">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Analysis Results</h2>
                    <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {results.confidence}% Confidence
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden border border-primary/20">
                      <img
                        src={results.maskedImage}
                        alt="Analysis result"
                        className="w-full"
                      />
                    </div>
                    
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                      <h3 className="font-semibold mb-2 text-destructive">Key Findings:</h3>
                      <ul className="space-y-1">
                        {results.findings.map((finding: string, idx: number) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <span className="text-destructive mt-1">•</span>
                            {finding}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-primary/10 bg-card/50 backdrop-blur">
                  <h3 className="font-semibold mb-3">Detailed Analysis</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {results.analysis}
                  </p>
                  
                  <Button
                    onClick={handleDownloadReport}
                    className="w-full mt-6 shadow-glow"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF Report
                  </Button>
                </Card>
              </>
            ) : (
              <Card className="p-12 border-primary/10 bg-card/50 backdrop-blur text-center">
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                  <ImageIcon className="h-16 w-16 opacity-20" />
                  <p>Upload an image and patient report to see analysis results</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
