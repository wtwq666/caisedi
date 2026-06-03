import { storeStaffEmployees } from './storeStaffSeed'

export interface EmployeeData {
  id: number
  employeeNo: string
  name: string
  gender: string
  nation: string
  birthDate: string
  idCard: string
  politicalStatus: string
  maritalStatus: string
  heightCm: string
  weightKg: string
  bloodType: string
  nativePlace: string
  householdRegisterLocation: string
  householdRegisterType: string
  residentialAddress: string
  primaryMobile: string
  secondaryMobile: string
  wechatId: string
  personalEmail: string
  highestEducation: string
  graduateSchool: string
  major: string
  graduationDate: string
  educationNature: string
  entryDate: string
  probationEndDate: string
  regularDate: string
  contractEndDate: string
  employmentNature: string
  department: string
  store: string
  jobPosition: string
  positionLevel: string
  bankAccount: string
  bankName: string
  backupBankAccount: string
  backupBankName: string
  emergencyContact1Name: string
  emergencyContact1Relation: string
  emergencyContact1Phone: string
  emergencyContact1Address: string
  emergencyContact2Name: string
  emergencyContact2Relation: string
  emergencyContact2Phone: string
  emergencyContact2Address: string
  avatarUrl: string
  status: string
}

export const currentUser: EmployeeData = {
  id: 1,
  employeeNo: 'KS20250001',
  name: '陈美玲',
  gender: '女',
  nation: '汉族',
  birthDate: '1992-03-15',
  idCard: '440420199203152321',
  politicalStatus: '群众',
  maritalStatus: '已婚',
  heightCm: '162.50',
  weightKg: '52.00',
  bloodType: 'O',
  nativePlace: '广东中山',
  householdRegisterLocation: '广东省中山市石岐区民权路12号',
  householdRegisterType: '城镇',
  residentialAddress: '广东省中山市东区中山三路38号中银大厦1205室',
  primaryMobile: '13800138001',
  secondaryMobile: '13900139001',
  wechatId: 'meiling_chen',
  personalEmail: 'meiling@qq.com',
  highestEducation: '本科',
  graduateSchool: '广东财经大学',
  major: '工商管理',
  graduationDate: '2014-06-30',
  educationNature: '全日制',
  entryDate: '2025-01-02',
  probationEndDate: '2025-04-02',
  regularDate: '2025-04-03',
  contractEndDate: '2028-04-02',
  employmentNature: '正式',
  department: '销售部',
  store: '凯施迪小榄旗舰店',
  jobPosition: '店长',
  positionLevel: '高级',
  bankAccount: '6222022015001234567',
  bankName: '中国工商银行中山分行',
  backupBankAccount: '6228480088887654321',
  backupBankName: '中国农业银行中山分行',
  emergencyContact1Name: '王建国',
  emergencyContact1Relation: '配偶',
  emergencyContact1Phone: '13600136001',
  emergencyContact1Address: '广东省中山市小榄镇升平中路88号',
  emergencyContact2Name: '',
  emergencyContact2Relation: '',
  emergencyContact2Phone: '',
  emergencyContact2Address: '',
  avatarUrl: 'https://oss.xtwq666.top/avatar/001.jpg',
  status: 'active',
}

export const allEmployees: EmployeeData[] = [
  currentUser,
  {
    id: 2, employeeNo: 'KS20250002', name: '李思颖', gender: '女', nation: '汉族',
    birthDate: '1998-07-22', idCard: '440420199807222562', politicalStatus: '共青团员',
    maritalStatus: '未婚', heightCm: '158.00', weightKg: '48.50', bloodType: 'A',
    nativePlace: '广东佛山', householdRegisterLocation: '广东省佛山市顺德区大良街道清晖路8号',
    householdRegisterType: '城镇', residentialAddress: '广东省中山市石岐区莲塘路22号富元利和豪庭3栋1802',
    primaryMobile: '13800138002', secondaryMobile: '', wechatId: 'siying_li98',
    personalEmail: 'siying98@163.com', highestEducation: '大专', graduateSchool: '中山职业技术学院',
    major: '服装与服饰设计', graduationDate: '2019-06-20', educationNature: '全日制',
    entryDate: '2025-02-10', probationEndDate: '2025-05-10', regularDate: '',
    contractEndDate: '2028-02-09', employmentNature: '正式', department: '销售部',
    store: '凯施迪小榄旗舰店', jobPosition: '导购', positionLevel: '初级',
    bankAccount: '6222022015001234568', bankName: '中国工商银行中山分行',
    backupBankAccount: '', backupBankName: '', emergencyContact1Name: '李大海',
    emergencyContact1Relation: '父亲', emergencyContact1Phone: '13600136002',
    emergencyContact1Address: '广东省佛山市顺德区大良街道清晖路8号',
    emergencyContact2Name: '', emergencyContact2Relation: '', emergencyContact2Phone: '',
    emergencyContact2Address: '', avatarUrl: 'https://oss.xtwq666.top/avatar/002.jpg', status: 'probation',
  },
  {
    id: 3, employeeNo: 'KS20250003', name: '张伟强', gender: '男', nation: '汉族',
    birthDate: '1995-11-08', idCard: '440420199511081515', politicalStatus: '群众',
    maritalStatus: '已婚', heightCm: '175.00', weightKg: '70.00', bloodType: 'B',
    nativePlace: '广东中山', householdRegisterLocation: '广东省中山市石岐区民生路8号',
    householdRegisterType: '城镇', residentialAddress: '广东省中山市西区富华道15号柏景苑2栋805',
    primaryMobile: '13800138003', secondaryMobile: '13900139003', wechatId: 'weiqiang_zhang',
    personalEmail: 'weiqiang@qq.com', highestEducation: '本科', graduateSchool: '五邑大学',
    major: '市场营销', graduationDate: '2018-06-15', educationNature: '全日制',
    entryDate: '2025-01-15', probationEndDate: '2025-04-15', regularDate: '2025-04-16',
    contractEndDate: '2028-04-15', employmentNature: '正式', department: '销售部',
    store: '凯施迪石岐店', jobPosition: '导购', positionLevel: '中级',
    bankAccount: '6222022015001234569', bankName: '中国工商银行中山分行',
    backupBankAccount: '', backupBankName: '', emergencyContact1Name: '张翠兰',
    emergencyContact1Relation: '母亲', emergencyContact1Phone: '13600136003',
    emergencyContact1Address: '广东省中山市石岐区民生路8号',
    emergencyContact2Name: '', emergencyContact2Relation: '', emergencyContact2Phone: '',
    emergencyContact2Address: '', avatarUrl: 'https://oss.xtwq666.top/avatar/003.jpg', status: 'active',
  },
  {
    id: 4, employeeNo: 'KS20250004', name: '王雅琴', gender: '女', nation: '汉族',
    birthDate: '1988-12-03', idCard: '440420198812032885', politicalStatus: '中共党员',
    maritalStatus: '已婚', heightCm: '165.00', weightKg: '55.00', bloodType: 'AB',
    nativePlace: '广东中山', householdRegisterLocation: '广东省中山市东区东苑南路15号雍景园3栋1201',
    householdRegisterType: '城镇', residentialAddress: '广东省中山市东区东苑南路15号雍景园3栋1201',
    primaryMobile: '13800138004', secondaryMobile: '13900139004', wechatId: 'yaqin_wang',
    personalEmail: 'yaqin.wang@qq.com', highestEducation: '本科', graduateSchool: '华南农业大学',
    major: '工商管理', graduationDate: '2011-06-20', educationNature: '全日制',
    entryDate: '2024-06-01', probationEndDate: '2024-09-01', regularDate: '2024-09-02',
    contractEndDate: '2027-09-01', employmentNature: '正式', department: '运营管理部',
    store: '东区片区', jobPosition: '区域主管', positionLevel: '资深',
    bankAccount: '6222022015001234570', bankName: '中国工商银行中山分行',
    backupBankAccount: '6228480088887654322', backupBankName: '中国农业银行中山分行',
    emergencyContact1Name: '刘建国', emergencyContact1Relation: '配偶', emergencyContact1Phone: '13600136004',
    emergencyContact1Address: '广东省中山市东区东苑南路15号雍景园3栋1201',
    emergencyContact2Name: '', emergencyContact2Relation: '', emergencyContact2Phone: '',
    emergencyContact2Address: '', avatarUrl: 'https://oss.xtwq666.top/avatar/004.jpg', status: 'active',
  },
  {
    id: 5, employeeNo: 'KS20250005', name: '刘婷婷', gender: '女', nation: '汉族',
    birthDate: '2000-05-10', idCard: '440420200005102428', politicalStatus: '共青团员',
    maritalStatus: '未婚', heightCm: '160.00', weightKg: '50.00', bloodType: 'O',
    nativePlace: '广东中山', householdRegisterLocation: '广东省中山市南朗镇崖口村东堡11号',
    householdRegisterType: '城镇', residentialAddress: '广东省中山市南朗镇龙起路2号海湾城1期3栋1304',
    primaryMobile: '13800138005', secondaryMobile: '', wechatId: 'tingting_liu',
    personalEmail: 'tingting00@qq.com', highestEducation: '大专', graduateSchool: '中山职业技术学院',
    major: '商务英语', graduationDate: '2022-06-15', educationNature: '全日制',
    entryDate: '2025-03-01', probationEndDate: '2025-06-01', regularDate: '',
    contractEndDate: '2028-03-01', employmentNature: '正式', department: '销售部',
    store: '凯施迪南朗店', jobPosition: '导购', positionLevel: '初级',
    bankAccount: '6222022015001234571', bankName: '中国工商银行中山分行',
    backupBankAccount: '', backupBankName: '', emergencyContact1Name: '刘大海',
    emergencyContact1Relation: '父亲', emergencyContact1Phone: '13600136005',
    emergencyContact1Address: '广东省中山市南朗镇崖口村东堡11号',
    emergencyContact2Name: '', emergencyContact2Relation: '', emergencyContact2Phone: '',
    emergencyContact2Address: '', avatarUrl: 'https://oss.xtwq666.top/avatar/005.jpg', status: 'probation',
  },
  {
    id: 6, employeeNo: 'KS20250006', name: '黄志明', gender: '男', nation: '汉族',
    birthDate: '1985-09-20', idCard: '440420198509201830', politicalStatus: '中共党员',
    maritalStatus: '已婚', heightCm: '178.00', weightKg: '72.00', bloodType: 'A',
    nativePlace: '广东中山', householdRegisterLocation: '广东省中山市西区沙朗广丰苑3栋402',
    householdRegisterType: '城镇', residentialAddress: '广东省中山市西区沙朗广丰苑3栋402',
    primaryMobile: '13800138006', secondaryMobile: '13900139006', wechatId: 'zhiming_huang',
    personalEmail: 'zhiming.huang@qq.com', highestEducation: '本科', graduateSchool: '广东工业大学',
    major: '工商管理', graduationDate: '2008-06-30', educationNature: '全日制',
    entryDate: '2024-08-01', probationEndDate: '2024-11-01', regularDate: '2024-11-02',
    contractEndDate: '2027-11-01', employmentNature: '正式', department: '销售部',
    store: '凯施迪西区店', jobPosition: '店长', positionLevel: '高级',
    bankAccount: '6222022015001234572', bankName: '中国工商银行中山分行',
    backupBankAccount: '6228480088887654323', backupBankName: '中国农业银行中山分行',
    emergencyContact1Name: '林淑芬', emergencyContact1Relation: '配偶', emergencyContact1Phone: '13600136006',
    emergencyContact1Address: '广东省中山市西区沙朗广丰苑3栋402',
    emergencyContact2Name: '', emergencyContact2Relation: '', emergencyContact2Phone: '',
    emergencyContact2Address: '', avatarUrl: 'https://oss.xtwq666.top/avatar/006.jpg', status: 'active',
  },
  {
    id: 7, employeeNo: 'KS20250007', name: '周雨萱', gender: '女', nation: '汉族',
    birthDate: '1996-02-14', idCard: '440420199602142726', politicalStatus: '群众',
    maritalStatus: '未婚', heightCm: '168.00', weightKg: '53.00', bloodType: 'B',
    nativePlace: '广东广州', householdRegisterLocation: '广东省广州市天河区天河北路20号中信广场',
    householdRegisterType: '城镇', residentialAddress: '广东省中山市石岐区凤鸣路55号岐江壹号1栋2106',
    primaryMobile: '13800138007', secondaryMobile: '13900139007', wechatId: 'yuxuan_zhou',
    personalEmail: 'yuxuan.zhou@qq.com', highestEducation: '本科', graduateSchool: '广州美术学院',
    major: '视觉传达设计', graduationDate: '2018-06-20', educationNature: '全日制',
    entryDate: '2024-03-01', probationEndDate: '2024-06-01', regularDate: '2024-06-02',
    contractEndDate: '2027-06-01', employmentNature: '正式', department: '商品部',
    store: '总部', jobPosition: '陈列师', positionLevel: '中级',
    bankAccount: '6222022015001234573', bankName: '中国工商银行中山分行',
    backupBankAccount: '', backupBankName: '', emergencyContact1Name: '周国栋',
    emergencyContact1Relation: '父亲', emergencyContact1Phone: '13600136007',
    emergencyContact1Address: '广东省广州市天河区天河北路20号中信广场',
    emergencyContact2Name: '', emergencyContact2Relation: '', emergencyContact2Phone: '',
    emergencyContact2Address: '', avatarUrl: 'https://oss.xtwq666.top/avatar/007.jpg', status: 'active',
  },
  {
    id: 8, employeeNo: 'KS20250008', name: '吴淑芬', gender: '女', nation: '汉族',
    birthDate: '1993-08-08', idCard: '440420199308082965', politicalStatus: '群众',
    maritalStatus: '已婚', heightCm: '161.00', weightKg: '51.00', bloodType: 'O',
    nativePlace: '广东中山', householdRegisterLocation: '广东省中山市黄圃镇鳌山村海蚀遗址公园旁',
    householdRegisterType: '城镇', residentialAddress: '广东省中山市黄圃镇兴圃大道5号大信新都汇2栋1603',
    primaryMobile: '13800138008', secondaryMobile: '13900139008', wechatId: 'shufen_wu',
    personalEmail: 'shufen.wu@qq.com', highestEducation: '本科', graduateSchool: '广东技术师范大学',
    major: '市场营销', graduationDate: '2015-06-20', educationNature: '全日制',
    entryDate: '2024-01-05', probationEndDate: '2024-04-05', regularDate: '2024-04-06',
    contractEndDate: '2027-04-05', employmentNature: '正式', department: '销售部',
    store: '凯施迪黄圃店', jobPosition: '导购', positionLevel: '中级',
    bankAccount: '6222022015001234574', bankName: '中国工商银行中山分行',
    backupBankAccount: '6228480088887654324', backupBankName: '中国农业银行中山分行',
    emergencyContact1Name: '吴志强', emergencyContact1Relation: '配偶', emergencyContact1Phone: '13600136008',
    emergencyContact1Address: '广东省中山市黄圃镇鳌山村海蚀遗址公园旁',
    emergencyContact2Name: '', emergencyContact2Relation: '', emergencyContact2Phone: '',
    emergencyContact2Address: '', avatarUrl: 'https://oss.xtwq666.top/avatar/008.jpg', status: 'active',
  },
  {
    id: 9, employeeNo: 'KS20250009', name: '郑浩然', gender: '男', nation: '汉族',
    birthDate: '1999-04-18', idCard: '440420199904181812', politicalStatus: '共青团员',
    maritalStatus: '未婚', heightCm: '172.00', weightKg: '65.00', bloodType: 'A',
    nativePlace: '广东中山', householdRegisterLocation: '广东省中山市三乡镇雍陌村平兴街9号',
    householdRegisterType: '城镇', residentialAddress: '广东省中山市三乡镇振华路10号三乡中心大厦1807',
    primaryMobile: '13800138009', secondaryMobile: '', wechatId: 'haoran_zheng',
    personalEmail: 'haoran99@qq.com', highestEducation: '本科', graduateSchool: '电子科技大学中山学院',
    major: '国际经济与贸易', graduationDate: '2021-06-20', educationNature: '全日制',
    entryDate: '2025-01-20', probationEndDate: '2025-04-20', regularDate: '',
    contractEndDate: '2028-04-20', employmentNature: '正式', department: '销售部',
    store: '凯施迪三乡店', jobPosition: '储备干部', positionLevel: '初级',
    bankAccount: '6222022015001234575', bankName: '中国工商银行中山分行',
    backupBankAccount: '', backupBankName: '', emergencyContact1Name: '郑国栋',
    emergencyContact1Relation: '父亲', emergencyContact1Phone: '13600136009',
    emergencyContact1Address: '广东省中山市三乡镇雍陌村平兴街9号',
    emergencyContact2Name: '', emergencyContact2Relation: '', emergencyContact2Phone: '',
    emergencyContact2Address: '', avatarUrl: 'https://oss.xtwq666.top/avatar/009.jpg', status: 'probation',
  },
  {
    id: 10, employeeNo: 'KS20250010', name: '何嘉欣', gender: '女', nation: '汉族',
    birthDate: '1997-11-25', idCard: '440420199711252444', politicalStatus: '群众',
    maritalStatus: '未婚', heightCm: '163.00', weightKg: '49.00', bloodType: 'B',
    nativePlace: '广东中山', householdRegisterLocation: '广东省中山市小榄镇绩东二社区怡丰中路1号',
    householdRegisterType: '城镇', residentialAddress: '广东省中山市小榄镇绩东二社区怡丰中路1号',
    primaryMobile: '13800138010', secondaryMobile: '13900139010', wechatId: 'jiaxin_he',
    personalEmail: 'jiaxin.he@qq.com', highestEducation: '大专', graduateSchool: '中山职业技术学院',
    major: '会计电算化', graduationDate: '2018-06-15', educationNature: '全日制',
    entryDate: '2024-05-06', probationEndDate: '2024-08-06', regularDate: '2024-08-07',
    contractEndDate: '2027-08-06', employmentNature: '正式', department: '财务部',
    store: '凯施迪小榄旗舰店', jobPosition: '收银', positionLevel: '中级',
    bankAccount: '6222022015001234576', bankName: '中国工商银行中山分行',
    backupBankAccount: '', backupBankName: '', emergencyContact1Name: '何国栋',
    emergencyContact1Relation: '父亲', emergencyContact1Phone: '13600136010',
    emergencyContact1Address: '广东省中山市小榄镇绩东二社区怡丰中路1号',
    emergencyContact2Name: '', emergencyContact2Relation: '', emergencyContact2Phone: '',
    emergencyContact2Address: '', avatarUrl: 'https://oss.xtwq666.top/avatar/010.jpg', status: 'active',
  },
  ...storeStaffEmployees,
]
