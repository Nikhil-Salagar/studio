import { PageHeader } from '@/components/page-header';
import { Sprout, Trees, TestTube2, Bug, ShieldCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CropSuggestionCard } from '@/components/features/crop-suggestion-card';
import { FertilizerPlannerCard } from '@/components/features/fertilizer-planner-card';
import { PlantDiseaseDetectorCard } from '@/components/features/plant-disease-detector-card';
import { CropCarePlannerCard } from '@/components/features/crop-care-planner-card';

export default function MyFarmPage() {
  return (
    <div>
      <PageHeader
        title="My Farm"
        description="Manage your farm's activities and get AI-powered insights."
        icon={Sprout}
      />
      <Tabs defaultValue="suggestions" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
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
          <TabsTrigger value="crop-care" className="gap-2">
            <ShieldCheck className="h-4 w-4" />
            Crop Care
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
        <TabsContent value="crop-care" className="mt-4">
          <CropCarePlannerCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
