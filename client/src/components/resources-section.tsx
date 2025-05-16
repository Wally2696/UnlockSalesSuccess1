import { FileText, Grid, Presentation, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createGoogleEmbedUrl, formatDate } from "@/lib/utils";

interface Resource {
  title: string;
  description: string;
  icon: "document" | "spreadsheet" | "presentation";
  docId: string;
  docType: "document" | "spreadsheet" | "presentation";
  lastUpdated: Date;
}

const resources: Resource[] = [
  {
    title: "Sales Success Workshop Guide",
    description: "Comprehensive guide covering workshop topics, schedule, and essential materials for RazorpayX Sales Executives.",
    icon: "document",
    docId: "1ZdpLR-AYcz9JJMPLXXxXwqtop9lYz43ARcVP9qKHW2o", // Real document ID
    docType: "document",
    lastUpdated: new Date(), // Current date
  },
];

export default function ResourcesSection() {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "document":
        return <FileText className="h-6 w-6 text-primary mr-3" />;
      case "spreadsheet":
        return <Grid className="h-6 w-6 text-primary mr-3" />;
      case "presentation":
        return <Presentation className="h-6 w-6 text-primary mr-3" />;
      default:
        return <FileText className="h-6 w-6 text-primary mr-3" />;
    }
  };

  return (
    <section id="resources" className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Learning Resources
          </h2>
          <Separator className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Access workshop materials, templates, and references.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {resources.map((resource, index) => (
            <Card key={index} className="bg-white overflow-hidden shadow-md transition-all duration-300 card-hover">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {getIcon(resource.icon)}
                  <h3 className="text-xl font-semibold">{resource.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  {resource.description}
                </p>
                <div className="bg-light p-4 rounded-lg mb-4">
                  {/* Google Docs Embedding */}
                  <div className="aspect-w-16 aspect-h-9 h-48 bg-gray-100 rounded flex items-center justify-center">
                    <iframe
                      src={createGoogleEmbedUrl(resource.docId, resource.docType)}
                      className="w-full h-full"
                      title={resource.title}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Last updated: {formatDate(resource.lastUpdated)}
                  </span>
                  <Button
                    variant="link"
                    className="text-primary hover:text-secondary transition-colors font-medium flex items-center"
                  >
                    <span>Download</span>
                    <Download className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
