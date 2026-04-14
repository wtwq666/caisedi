import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFabricStore, useAuthStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Search,
  Plus,
  FileText,
  Edit,
  Trash2,
  ChevronRight
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const ITEMS_PER_PAGE = 10;

export default function FabricListPage() {
  const navigate = useNavigate();
  const { fabrics, deleteFabric } = useFabricStore();
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 过滤面料
  const filteredFabrics = fabrics.filter(
    (fabric) =>
      fabric.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fabric.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fabric.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 分页
  const totalPages = Math.ceil(filteredFabrics.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedFabrics = filteredFabrics.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleDelete = (id: string) => {
    deleteFabric(id);
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">面料知识培训</h2>
          <p className="text-gray-500 mt-1">共 {fabrics.length} 种面料</p>
        </div>
        {isAdmin && (
          <Button
            onClick={() => navigate('/fabric-training/new')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            新增面料
          </Button>
        )}
      </div>

      {/* 搜索栏 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="搜索面料名称、描述或分类..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="pl-10 h-11"
        />
      </div>

      {/* 面料卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedFabrics.map((fabric) => (
          <Card
            key={fabric.id}
            className="group cursor-pointer hover:shadow-lg transition-shadow border-gray-200"
            onClick={() => navigate(`/fabric-training/${fabric.id}`)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                {isAdmin && (
                  <div
                    className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        navigate(`/fabric-training/${fabric.id}/edit`)
                      }
                    >
                      <Edit className="w-4 h-4 text-gray-500" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>确认删除</AlertDialogTitle>
                          <AlertDialogDescription>
                            您确定要删除"{fabric.name}"吗？此操作无法撤销。
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>取消</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(fabric.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            删除
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardTitle className="text-base font-semibold text-gray-900 line-clamp-1 mb-1">
                {fabric.name}
              </CardTitle>
              <p className="text-xs text-gray-500 mb-2">序号 {fabric.order}</p>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {fabric.subtitle}
              </p>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  {fabric.category}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 空状态 */}
      {paginatedFabrics.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">没有找到匹配的面料</p>
        </div>
      )}

      {/* 分页 */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className={
                  currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className={
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* 分页信息 */}
      <div className="text-center text-sm text-gray-500">
        第 {currentPage} / {totalPages || 1} 页，共 {filteredFabrics.length} 条
      </div>
    </div>
  );
}
