import { PageHeader } from '@/components/page-header';
import { Sprout, Trees, TestTube2, Bug } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CropSuggestionCard } from '@/components/features/crop-suggestion-card';
import { FertilizerPlannerCard } from '@/components/features/fertilizer-planner-card';
import { PlantDiseaseDetectorCard } from '@/components/features/plant-disease-detector-card';

export default function MyFarmPage() {
  return (
    <div>
      <PageHeader
        title="My Farm"
        description="Manage your farm's activities and get AI-powered insights."
        icon={Sprout}
      />
      <Tabs defaultValue="suggestions" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
          <TabsTrigger value="suggestions" className="gap-2">
            <Trees className="h-4 w-4" />
            Crop Suggestions
          </TabsTrigger>
          <TabsTrigger value="fertilizer" className="gap-2">
            <TestTube2 className="h-4 w-4" />
            Fertilizer Plan
          </TabsTrigger>
          <TabsTrigger value="disease" className="gap-2">
            <Bug className="h-4 w-4" />
            Disease Detection
          </TabsTrigger>
        </TabsList>
        <TabsContent value="suggestions" className="mt-4">
          <CropSuggestionCard />
        </TabsContent>
        <TabsContent value="fertilizer" className="mt-4">
          <FertilizerPlannerCard />
        </TabsContent>
        <TabsContent value="disease" className="mt-4">
          <PlantDiseaseDetectorCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
