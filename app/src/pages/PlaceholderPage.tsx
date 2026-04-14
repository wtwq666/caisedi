import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      
      <Card className="border-dashed border-2">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Construction className="w-16 h-16 text-gray-300 mb-4" />
          <CardTitle className="text-xl text-gray-500 mb-2">功能开发中</CardTitle>
          <p className="text-gray-400 text-center max-w-md">
            {title}模块正在开发中，敬请期待...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
