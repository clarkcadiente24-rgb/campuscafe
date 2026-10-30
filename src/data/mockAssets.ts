export type AssetStatus = "Available" | "Checked Out" | "Maintenance";

export type AssetCategory =
  | "Computing"
  | "Audio/Visual"
  | "Lab Equipment"
  | "Networking"
  | "Furniture";

export type AssetCondition = "Excellent" | "Good" | "Fair";

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  location: string;
  status: AssetStatus;
  serial: string;
  condition: AssetCondition;
  assignedTo: string | null;
}

export const categories: AssetCategory[] = [
  "Computing",
  "Audio/Visual",
  "Lab Equipment",
  "Networking",
  "Furniture",
];

export const mockAssets: Asset[] = [
  {
    id: "AST-001",
    name: "Dell OptiPlex Desktop",
    category: "Computing",
    location: "Engineering Lab A",
    status: "Available",
    serial: "DL-OPX-4821",
    condition: "Excellent",
    assignedTo: null,
  },
  {
    id: "AST-002",
    name: "MacBook Pro 14\"",
    category: "Computing",
    location: "Library Media Center",
    status: "Checked Out",
    serial: "AP-MBP-7734",
    condition: "Excellent",
    assignedTo: "A. Mensah",
  },
  {
    id: "AST-003",
    name: "Epson PowerLite Projector",
    category: "Audio/Visual",
    location: "Lecture Hall 2",
    status: "Available",
    serial: "EP-PL-2290",
    condition: "Good",
    assignedTo: null,
  },
  {
    id: "AST-004",
    name: "Canon EOS R50 Camera",
    category: "Audio/Visual",
    location: "Media Studio",
    status: "Checked Out",
    serial: "CN-R50-5510",
    condition: "Good",
    assignedTo: "K. Owusu",
  },
  {
    id: "AST-005",
    name: "Digital Microscope",
    category: "Lab Equipment",
    location: "Biology Lab 3",
    status: "Maintenance",
    serial: "BIO-DM-1034",
    condition: "Fair",
    assignedTo: null,
  },
  {
    id: "AST-006",
    name: "Cisco Catalyst Switch",
    category: "Networking",
    location: "IT Server Room",
    status: "Available",
    serial: "CS-CAT-9087",
    condition: "Excellent",
    assignedTo: null,
  },
  {
    id: "AST-007",
    name: "HP LaserJet Printer",
    category: "Computing",
    location: "Admin Block B",
    status: "Available",
    serial: "HP-LJ-3312",
    condition: "Good",
    assignedTo: null,
  },
  {
    id: "AST-008",
    name: "Shure Wireless Microphone Set",
    category: "Audio/Visual",
    location: "Auditorium",
    status: "Checked Out",
    serial: "SH-WM-6678",
    condition: "Excellent",
    assignedTo: "Events Office",
  },
  {
    id: "AST-009",
    name: "Anesthesia Training Machine",
    category: "Lab Equipment",
    location: "Nursing Skills Lab",
    status: "Available",
    serial: "NS-ATM-4456",
    condition: "Good",
    assignedTo: null,
  },
  {
    id: "AST-010",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    location: "Faculty Offices",
    status: "Available",
    serial: "FN-EOC-1201",
    condition: "Good",
    assignedTo: null,
  },
  {
    id: "AST-011",
    name: "Lenovo ThinkPad Laptop",
    category: "Computing",
    location: "Computer Lab 1",
    status: "Checked Out",
    serial: "LN-TP-8842",
    condition: "Excellent",
    assignedTo: "J. Addo",
  },
  {
    id: "AST-012",
    name: "Interactive Whiteboard",
    category: "Audio/Visual",
    location: "Lecture Hall 1",
    status: "Maintenance",
    serial: "AV-IWB-9091",
    condition: "Fair",
    assignedTo: null,
  },
  {
    id: "AST-013",
    name: "Wi-Fi Access Point",
    category: "Networking",
    location: "Student Center",
    status: "Available",
    serial: "NW-AP-6670",
    condition: "Excellent",
    assignedTo: null,
  },
  {
    id: "AST-014",
    name: "Conference Table",
    category: "Furniture",
    location: "Boardroom",
    status: "Available",
    serial: "FN-CT-3320",
    condition: "Good",
    assignedTo: null,
  },
];
